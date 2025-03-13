import { Injectable } from '@nestjs/common';
import Web3 from 'web3';
import contractAbi from './abis/CertificateContract.json';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '~users/entities/user.entity';
import { DataSource, DeepPartial, DeleteResult, In, Repository, SaveOptions } from 'typeorm';
import { UserService } from '~users/services/user.service';
import { CertificateEntity } from '~certificates/entities/certificate.entity';
import { CertificateTypeEntity } from '~certificates/entities/certificate-type.entity';
import { SuccessResponse } from '~core/http/responses/success.response';
import { CreateCertificateDto } from './https/dto/create-certificate.dto';
import { UserCertificateEntity } from '~users/entities/user-certificate.entity';
import { CertificateResponse } from './https/responses/certificate.response';
import { UserRoleEnum } from '~users/enums/user-role.enum';

@Injectable()
export class CertificateService {
  private web3: Web3;
  private contract: any;
  private contractAddress = '0xb5D2A707367d45596e372Ec3371F7BE12c3faEbD';

  constructor(
    private readonly userService: UserService,
    private readonly dataSource: DataSource,
    @InjectRepository(CertificateEntity)
    private readonly certificateRepo: Repository<CertificateEntity>,
    @InjectRepository(CertificateTypeEntity)
    private readonly certificateTypeRepo: Repository<CertificateTypeEntity>,
    @InjectRepository(UserCertificateEntity)
    private readonly userCertificateRepo: Repository<UserCertificateEntity>,
    @InjectRepository(UserEntity) 
    private readonly userRepo: Repository<UserEntity>,
  ) {
    this.web3 = new Web3('https://sepolia.infura.io/v3/812754277e27452c8f2c54cb66358e28'); // Thay bằng RPC phù hợp
    this.contract = new this.web3.eth.Contract(contractAbi, this.contractAddress);
  }

  // async issueCertificate(userId: string, name: string, recipient: string) {
  //   const user = await this.userService.findOne({ where: { id: userId } });

  //   if (!user) {
  //     throw new Error('User not found');
  //   }

  //   await this.certificateRepo.save({
      
  //     recipient,
  //   });

  //   const account = user.walletAddress;
  //   const privateKey = user.walletPrivateKey.startsWith('0x') 
  //   ? user.walletPrivateKey 
  //   : '0x' + user.walletPrivateKey;

  //   if (!account || !privateKey) {
  //     throw new Error('User account or private key is missing');
  //   }

  //   this.web3.eth.accounts.wallet.add(privateKey);

  //   const tx = this.contract.methods.issueCertificate(name, recipient);

  //   const gas = await tx.estimateGas({ from: account });
  //   const gasPrice = await this.web3.eth.getGasPrice();

  //   const txData = {
  //     from: account,
  //     to: this.contractAddress,
  //     data: tx.encodeABI(),
  //     gas,
  //     gasPrice,
  //   };

  //   const signedTx = await this.web3.eth.accounts.signTransaction(txData, privateKey);
  //   const receipt = await this.web3.eth.sendSignedTransaction(signedTx.rawTransaction);

  //   console.log(receipt.logs);

  //   let certId: string | null = null;
  //   if (receipt.logs && receipt.logs.length > 0) {
  //     const eventLog = receipt.logs.find(log => log?.address?.toLowerCase() === this.contractAddress.toLowerCase());
  //     if (eventLog && eventLog.data) {
  //       const hexData = this.web3.utils.bytesToHex(eventLog.data);
  //       certId = this.web3.eth.abi.decodeParameter('string', hexData) as string;
  //     }
  //   }

  //   return {
  //     certId,
  //     transactionHash: receipt.transactionHash,
  //     gasUsed: receipt.gasUsed.toString(),
  //     cumulativeGasUsed: receipt.cumulativeGasUsed.toString(),
  //   };
  // }

  async verifyCertificate(certId: string) {
    const result = await this.contract.methods.verifyCertificate(certId).call();

    // 🔥 Convert all BigInt values to string
    const parsedResult = JSON.parse(
      JSON.stringify(result, (_, value) =>
        typeof value === 'bigint' ? value.toString() : value
      )
    );

    return parsedResult;
  }

  async createTeacherCertificate(teacherCertificateDto: any) {
    const { userId, certificateId } = teacherCertificateDto;
    const result = await this.userCertificateRepo.save({
      userId,
      certificateId,
    });
    return result;
  }

  async getTeacherCertificate() {
    const result = await this.userCertificateRepo.find();
  
    const result2 = await Promise.all(
      result.map(async (item) => {
        const user = await this.userService.findOne({ where: { id: item.userId } });
  
        const certificate = await this.certificateRepo.findOne({ where: { id: item.certificateId } });
  
        return {
          user,
          certificate,
        };
      })
    );
  
    return result2;
  }
  

  async createCertificate(teacherId: string, dto: CreateCertificateDto): Promise<CertificateEntity> {
    const { userId, ...certificateData } = dto;
    
    const certificateType = await this.certificateTypeRepo.findOne({ where: { id: certificateData.certificateTypeId } });
    if (!certificateType) {
        throw new Error('Certificate type not found');
    }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
        // Lưu certificate trước
        const certificate = await queryRunner.manager.save(CertificateEntity, certificateData);

        // Lưu vào bảng trung gian UserCetificate
        await queryRunner.manager.save(UserCertificateEntity, {
          userId,
          certificateId: certificate.id,
        });

        await queryRunner.commitTransaction();
        return certificate;
    } catch (error) {
        await queryRunner.rollbackTransaction();
        throw error;
    } finally {
        await queryRunner.release();
    }
  }

  async getCertificateByTeacherId(teacherId: string): Promise<any[]> {
    // Tìm danh sách chứng chỉ liên quan đến giáo viên
    const userCertificates = await this.userCertificateRepo.find({
        where: { userId: teacherId },
    });

    if (!userCertificates.length) {
        return [];
    }

    // Lấy danh sách certificateId
    const certificateIds = userCertificates.map((uc) => uc.certificateId);

    // Tìm tất cả UserCertificateEntity có cùng certificateId
    const studentCertificates = await this.userCertificateRepo.find({
        where: { certificateId: In(certificateIds) }, // TypeORM In()
    });

    // Lấy thông tin học viên
    const students = await Promise.all(
        studentCertificates.map(async (sc) => {
            const studentInfo = await this.userRepo.findOne({
                where: { id: sc.userId, role: UserRoleEnum.STUDENT },
            });
            return studentInfo ? { ...sc, studentInfo } : null;
        })
    );

    // Lọc bỏ null
    return students.filter(Boolean);
}

async getCertificateByStudentId(studentId: string): Promise<any> {
  const certificateStudent = await this.userCertificateRepo.find({
    where: { userId: studentId },
  });

  const certificateIds = certificateStudent.map((c) => c.certificateId);

  // Dùng Promise.all để chờ tất cả các promise hoàn thành
  const certificates = await Promise.all(
    certificateIds.map(async (certificateId: string) => {
      const certificate = await this.certificateRepo.findOneBy({ id: certificateId });

      if (!certificate) return null;

      const certificateType = await this.certificateTypeRepo.findOneBy({
        id: certificate.certificateTypeId,
      });

      return {
        ...certificate,
        certificateType,
      };
    })
  );

  // Lọc ra những phần tử null (trường hợp không tìm thấy certificate)
  return certificates.filter((c) => c !== null);
}

async getStudentByType(certificateTypeId: string): Promise<any> {
  const certificates = await this.certificateRepo.find({
    where: { certificateTypeId: certificateTypeId },
  });


  const certificateIds = certificates.map((uc) => uc.id);

  const studentIds = await this.userCertificateRepo.find({
    where: { certificateId: In(certificateIds) },
  });

  const studentInfo = await this.userRepo.find({
    where: { id: In(studentIds.map((s) => s.userId)), role: UserRoleEnum.STUDENT },
  });

  return studentInfo;
}




  async getAllCertificateType() {
    return this.certificateTypeRepo.find();
  }

  createCertificateType(entity: DeepPartial<CertificateTypeEntity>, options?: SaveOptions): Promise<CertificateTypeEntity> {
      return this.certificateTypeRepo.save(entity, options);
  }

  async deleteCertificateType(id: string): Promise<SuccessResponse> {
      await this.certificateTypeRepo.delete(id);

      return { message: 'Blog deleted successfully' }
  }
}

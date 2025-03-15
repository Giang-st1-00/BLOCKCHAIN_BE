import { Injectable } from '@nestjs/common';
import Web3 from 'web3';
import contractAbi from './abis/CertificateContract.json';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '~users/entities/user.entity';
import { DataSource, DeepPartial, DeleteResult, In, Not, Repository, SaveOptions } from 'typeorm';
import { UserService } from '~users/services/user.service';
import { CertificateEntity } from '~certificates/entities/certificate.entity';
import { CertificateTypeEntity } from '~certificates/entities/certificate-type.entity';
import { SuccessResponse } from '~core/http/responses/success.response';
import { CreateCertificateDto } from './https/dto/create-certificate.dto';
import { UserCertificateEntity } from '~users/entities/user-certificate.entity';
import { CertificateResponse } from './https/responses/certificate.response';
import { UserRoleEnum } from '~users/enums/user-role.enum';
import { UserCertificateTypeEntity } from '~users/entities/user-certificate-type.entity';
import { CertificateStatusEnum } from '~certificates/enums/certificateStatus.enum';

@Injectable()
export class CertificateService {
  private web3: Web3;
  private contract: any;
  private contractAddress = '0x51f315B54fc76B62c4DeA5ea8B4d1A2a143fB387';

  constructor(
    private readonly userService: UserService,
    private readonly dataSource: DataSource,
    @InjectRepository(CertificateEntity)
    private readonly certificateRepo: Repository<CertificateEntity>,
    @InjectRepository(CertificateTypeEntity)
    private readonly certificateTypeRepo: Repository<CertificateTypeEntity>,
    @InjectRepository(UserCertificateEntity)
    private readonly userCertificateRepo: Repository<UserCertificateEntity>,
    @InjectRepository(UserCertificateTypeEntity)
    private readonly userCertificateTypeRepo: Repository<UserCertificateTypeEntity>,
    @InjectRepository(UserEntity) 
    private readonly userRepo: Repository<UserEntity>,
  ) {
    this.web3 = new Web3('https://sepolia.infura.io/v3/812754277e27452c8f2c54cb66358e28'); // Thay bằng RPC phù hợp
    this.contract = new this.web3.eth.Contract(contractAbi, this.contractAddress);
  }

  async issueCertificate(certificateId: string, userId: string, name: string, code: string, subject: string) {
    const user = await this.userService.findOne({ where: { id: userId } });
    
    if (!user) {
        throw new Error('User not found');
    }

    const account = user.walletAddress;
    const privateKey = user.walletPrivateKey.startsWith('0x')
        ? user.walletPrivateKey
        : '0x' + user.walletPrivateKey;

    if (!account || !privateKey) {
        throw new Error('User account or private key is missing');
    }

    this.web3.eth.accounts.wallet.add(privateKey);
    const tx = this.contract.methods.issueCertificate(name, code, subject, this.web3.utils.toChecksumAddress(this.contractAddress));

    const gas = await tx.estimateGas({ from: account });
    const gasPrice = await this.web3.eth.getGasPrice();

    const txData = {
        from: account,
        to: this.contractAddress,
        data: tx.encodeABI(),
        gas,
        gasPrice,
    };

    const signedTx = await this.web3.eth.accounts.signTransaction(txData, privateKey);
    const receipt: any = await this.web3.eth.sendSignedTransaction(signedTx.rawTransaction);

    console.log(receipt.logs);

    let certId: string | null = null;
    if (receipt.logs && receipt.logs.length > 0) {
        const eventLog = receipt.logs.find((log: any) => log?.address?.toLowerCase() === this.contractAddress.toLowerCase());
        if (eventLog && eventLog.data) {
            const hexData = this.web3.utils.bytesToHex(eventLog.data);
            certId = this.web3.eth.abi.decodeParameter('string', hexData) as string;
        }
    }

    await this.certificateRepo.update(certificateId, { status: CertificateStatusEnum.APPROVED, certId: receipt.logs[0].topics[1] });

    return {
        certId, 
        transactionHash: receipt.transactionHash,
        gasUsed: receipt.gasUsed.toString(),
        cumulativeGasUsed: receipt.cumulativeGasUsed.toString(),
    };
}



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

  async getCertificateById(id: string): Promise<any> {
    return this.certificateRepo.findOne({ where: { id } }); // Đúng cú pháp cho TypeORM mới
}

async getAllCertificate(): Promise<any> {
  return this.certificateRepo.find(); // Đúng cú pháp cho TypeORM mới
}


  async createTeacherCertificate(teacherCertificateDto: any) {
    const { userId, certificateTypeId } = teacherCertificateDto;
    
    const result = await this.userCertificateTypeRepo.save({
      userId,
      certificateTypeId,
    });

    return result;
  }

  async getTeacherCertificateType() {
    const result = await this.userCertificateTypeRepo.find();
  
    const result2 = await Promise.all(
      result.map(async (item) => {
        const user = await this.userService.findOne({ where: { id: item.userId } });
  
        const certificate = await this.certificateTypeRepo.findOne({ where: { id: item.certificateTypeId } });
  
        return {
          user,
          certificate,
        };
      })
    );
  
    return result2;
  }

  async getTeacherCertificateTypeDetail(certificateTypeId: string) {
    const result: any = await this.userCertificateTypeRepo.findOne({
      where: { certificateTypeId },
    });
  
    const user = await this.userService.findOne({ where: { id: result.userId, role: UserRoleEnum.TEACHER } });

    const certificate = await this.certificateTypeRepo.findOne({ where: { id: result.certificateTypeId } });
  
    return {user, certificate};
  }

  async createCertificate(teacherId: string, dto: CreateCertificateDto): Promise<any> {
    const { users, certificateTypeId, status } = dto;

    if (!Array.isArray(users) || users.length === 0) {
        throw new Error("Users array is empty or invalid.");
    }

    for (const user of users) {

        if (!user.id || !user.score) {
            throw new Error(`thieu id hoac score`);
        }

        const certificate = await this.certificateRepo.save({
            certificateTypeId,
            status,
            score: user.score
        });

        await this.userCertificateRepo.save({
            userId: user.id,
            certificateId: certificate.id,
        });

        await this.userCertificateRepo.save({
            userId: teacherId,
            certificateId: certificate.id,
        });
    }

    return { message: "Certificate created successfully" };
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
    const teacherCertificates = await this.userCertificateRepo.find({
        where: { certificateId: In(certificateIds) }, // TypeORM In()
    });

    // Lấy thông tin học viên
    const students = await Promise.all(
      teacherCertificates.map(async (sc) => {
            const teacherInfo = await this.userRepo.findOne({
                where: { id: sc.userId, role: UserRoleEnum.TEACHER },
            });
            
            const certificate = await this.certificateRepo.findOne({  where: { id: sc.certificateId } });
            const studentTemp:any = await this.userCertificateRepo.findOne({ where: { certificateId: sc.certificateId, userId: Not(sc.userId) } });
            const student  = await this.userRepo.findOne({ where: { id: studentTemp.userId } });
            
            if (!certificate) return null;
            const certificateType = await this.certificateTypeRepo.findOne({ where: { id: certificate.certificateTypeId } });
            
            return teacherInfo ? { certificate, teacherInfo, certificateType, student } : null;
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

  const certificateIds = certificates.map((c) => c.id);

  const userCertificates = await this.userCertificateRepo.find({
    where: { certificateId: In(certificateIds) },
  });

  const students = await this.userRepo.find({
    where: { id: In(userCertificates.map((uc) => uc.userId)), role: UserRoleEnum.STUDENT },
  });

  return students.map((student) => {
    const userCertificate = userCertificates.find((uc) => uc.userId === student.id);
    const certificate = certificates.find((c) => c.id === userCertificate?.certificateId);
    
    return { ...student, certificate };
  });
}






  async getAllCertificateType() {
    return this.certificateTypeRepo.find();
  }

  createCertificateType(entity: DeepPartial<CertificateTypeEntity>, options?: SaveOptions): Promise<CertificateTypeEntity> {
      console.log(123123);
      
      return this.certificateTypeRepo.save(entity, options);
  }

  async deleteCertificateType(id: string): Promise<SuccessResponse> {
      await this.certificateTypeRepo.delete(id);

      return { message: 'Blog deleted successfully' }
  }
}

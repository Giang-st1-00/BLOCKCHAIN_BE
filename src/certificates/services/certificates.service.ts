import { Injectable } from '@nestjs/common';
import Web3 from 'web3';
import contractAbi from './abis/CertificateContract.json';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '~users/entities/user.entity';
import { Repository } from 'typeorm';
import { UserService } from '~users/services/user.service';
import { CertificateEntity } from '~certificates/entities/certificate.entity';

@Injectable()
export class CertificateService {
  private web3: Web3;
  private contract: any;
  private contractAddress = '0xb5D2A707367d45596e372Ec3371F7BE12c3faEbD';

  constructor(
    private readonly userService: UserService,
    @InjectRepository(CertificateEntity)
    private readonly certificateRepo: Repository<CertificateEntity>,
  ) {
    this.web3 = new Web3('https://sepolia.infura.io/v3/812754277e27452c8f2c54cb66358e28'); // Thay bằng RPC phù hợp
    this.contract = new this.web3.eth.Contract(contractAbi, this.contractAddress);
  }

  async issueCertificate(userId: string, name: string, score: number, recipient: string) {
    const user = await this.userService.findOne({ where: { id: userId } });

    if (!user) {
      throw new Error('User not found');
    }

    await this.certificateRepo.save({
      name,
      score,
      recipient,
    });

    const account = user.walletAddress;
    const privateKey = user.walletPrivateKey.startsWith('0x') 
    ? user.walletPrivateKey 
    : '0x' + user.walletPrivateKey;

    if (!account || !privateKey) {
      throw new Error('User account or private key is missing');
    }

    this.web3.eth.accounts.wallet.add(privateKey);

    const tx = this.contract.methods.issueCertificate(name, score, recipient);

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
    const receipt = await this.web3.eth.sendSignedTransaction(signedTx.rawTransaction);

    console.log(receipt.logs);

    let certId: string | null = null;
    if (receipt.logs && receipt.logs.length > 0) {
      const eventLog = receipt.logs.find(log => log?.address?.toLowerCase() === this.contractAddress.toLowerCase());
      if (eventLog && eventLog.data) {
        const hexData = this.web3.utils.bytesToHex(eventLog.data);
        certId = this.web3.eth.abi.decodeParameter('string', hexData) as string;
      }
    }

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
}

import { Injectable } from '@nestjs/common';
import Web3 from 'web3';
import contractAbi from './abis/CertificateContract.json';

@Injectable()
export class CertificateService {
  private web3: Web3;
  private contract: any;
  private account: string;
  private contractAddress = '0x5416e367FbA90B0f3E05b4e20Abef8F344B240c2';

  constructor() {
    this.web3 = new Web3('https://sepolia.infura.io/v3/812754277e27452c8f2c54cb66358e28'); // Thay bằng RPC phù hợp
    this.account = '0xD6557A2688Ab2cbA976ef4358F3001B0509E2D93';
    const privateKey = '0xcca4935388fae921b972f829342d65f7680862577431663ca404189dc5923cd7';

    this.contract = new this.web3.eth.Contract(contractAbi, this.contractAddress);

    // Unlock tài khoản nếu cần
    this.web3.eth.accounts.wallet.add(privateKey);
  }

  async issueCertificate(name: string, score: number, recipient: string) {
    const tx = this.contract.methods.issueCertificate(name, score, recipient);
    
    const gas = await tx.estimateGas({ from: this.account });
    const gasPrice = await this.web3.eth.getGasPrice();
    
    const txData = {
      from: this.account,
      to: this.contractAddress,
      data: tx.encodeABI(),
      gas,
      gasPrice,
    };

    const signedTx = await this.web3.eth.accounts.signTransaction(txData, '0xcca4935388fae921b972f829342d65f7680862577431663ca404189dc5923cd7');
    const receipt = await this.web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    
    return receipt.transactionHash;
  }

  async verifyCertificate(certId: string) {
    return await this.contract.methods.verifyCertificate(certId).call();
  }
}

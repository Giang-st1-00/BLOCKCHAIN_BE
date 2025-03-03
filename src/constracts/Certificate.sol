// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CertificateContract {
    struct Certificate {
        string name;
        uint score;
        address issuer;
        address recipient;
        uint timestamp;
    }

    mapping(bytes32 => Certificate) public certificates;

    event CertificateIssued(bytes32 indexed certId, address indexed recipient, string name, uint score, uint timestamp);

    function issueCertificate(string memory _name, uint _score, address _recipient) public returns (bytes32) {
        bytes32 certId = keccak256(abi.encodePacked(_name, _score, _recipient, block.timestamp));
        
        certificates[certId] = Certificate({
            name: _name,
            score: _score,
            issuer: msg.sender,
            recipient: _recipient,
            timestamp: block.timestamp
        });

        emit CertificateIssued(certId, _recipient, _name, _score, block.timestamp);
        return certId;
    }

    function verifyCertificate(bytes32 _certId) public view returns (string memory, uint, address, address, uint) {
        Certificate memory cert = certificates[_certId];
        return (cert.name, cert.score, cert.issuer, cert.recipient, cert.timestamp);
    }
}

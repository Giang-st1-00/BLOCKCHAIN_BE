import { Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, Unique } from 'typeorm';
import { CertificateStatusEnum } from '~certificates/enums/certificateStatus.enum';
import { BaseEntity } from "~core/entities/base.entity";
import { UserCertificateEntity } from '~users/entities/user-certificate.entity';
import { UserEntity } from '~users/entities/user.entity';
import { CertificateTypeEntity } from './certificate-type.entity';


@Entity('Certificate')
export class CertificateEntity extends BaseEntity {
    @Column({
        type: 'enum',
        enum: CertificateStatusEnum,
        enumName: 'CertificateStatusEnum',
        default: CertificateStatusEnum.PENDING
    })
    status: CertificateStatusEnum;

    @Index('certificateTypeId')
    @Column({ type: 'uuid' })
    certificateTypeId: string;

    @OneToMany(() => UserCertificateEntity, (userCertificate) => userCertificate.certificate)
    userCertificates: UserCertificateEntity[];

    @ManyToMany(() => UserEntity, (user) => user.certificates)
    @JoinTable({
        name: 'UserCetificate',
        synchronize: false
    })
    users: UserEntity[];

    @ManyToOne(() => CertificateTypeEntity, (certificateType) => certificateType.certificates, {
        onDelete: 'CASCADE'
    })
    @JoinColumn({
        name: 'certificateTypeId',
        foreignKeyConstraintName: 'certificateTypeIdCertificateFk'
    })
    certificateType: CertificateTypeEntity;
}
import { Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, Unique } from 'typeorm';
import { CertificateStatusEnum } from '~certificates/enums/certificateStatus.enum';
import { BaseEntity } from "~core/entities/base.entity";
import { UserCertificateEntity } from '~users/entities/user-certificate.entity';
import { UserEntity } from '~users/entities/user.entity';
import { CertificateEntity } from './certificate.entity';

@Entity('CertificateType')
export class CertificateTypeEntity extends BaseEntity {
    @Column({
        type: 'varchar',
    })
    name: string;

    @OneToMany(() => CertificateEntity, (certificate) => certificate.certificateType)
    certificates: CertificateEntity[];
}
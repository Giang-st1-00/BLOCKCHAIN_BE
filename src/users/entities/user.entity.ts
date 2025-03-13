import { Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, Unique } from 'typeorm';
import { BaseEntity } from "~core/entities/base.entity";
import { UserRoleEnum } from '~users/enums/user-role.enum';
import { UserCertificateEntity } from './user-certificate.entity';
import { CertificateEntity } from '~certificates/entities/certificate.entity';
import { UserCertificateTypeEntity } from './user-certificate-type.entity';
import { CertificateTypeEntity } from '~certificates/entities/certificate-type.entity';


@Entity('User')
export class UserEntity extends BaseEntity {
    @Unique('codeUserUnique', ['code'])
    @Column({
        type: 'varchar',
    })
    code: string;

    @Column({
        type: 'varchar',
    })
    name: string;

    @Column({
        type: 'varchar',
    })
    password: string;

    @Column({
        type: 'varchar',
    })
    dateOfBirth: string;

    @Column({
        type: 'enum',
        enum: UserRoleEnum,
        enumName: 'UserRoleEnum',
        default: UserRoleEnum.TEACHER
    })
    role: UserRoleEnum;

    @Column({
        type: 'varchar',
        nullable: true, 
    })
    walletAddress: string;

    @Column({
        type: 'varchar',
        nullable: true, 
    })
    walletPrivateKey: string;

    @OneToMany(() => UserCertificateEntity, (userCertificate) => userCertificate.user)
    userCertificates: UserCertificateEntity[];

    @ManyToMany(() => CertificateEntity, (certificate) => certificate.users)
    @JoinTable({
        name: 'UserCetificate',
        synchronize: false
    })
    certificates: CertificateEntity[];

    @OneToMany(() => UserCertificateTypeEntity, (userCertificateType) => userCertificateType.user)
    userCertificatesType: UserCertificateTypeEntity[];

    @ManyToMany(() => CertificateTypeEntity, (certificateType) => certificateType.users)
    @JoinTable({
        name: 'UserCetificateType',
        synchronize: false
    })
    certificatesType: CertificateEntity[];
}
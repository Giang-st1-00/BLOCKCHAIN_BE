import { Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, Unique } from 'typeorm';
import { BaseEntity } from "~core/entities/base.entity";
import { UserRoleEnum } from '~users/enums/user-role.enum';
import { UserCertificateEntity } from './user-certificate.entity';
import { CertificateEntity } from '~certificates/entities/certificate.entity';


@Entity('User')
export class UserEntity extends BaseEntity {
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
    walletId: string;

    @OneToMany(() => UserCertificateEntity, (userCertificate) => userCertificate.user)
    userCertificates: UserCertificateEntity[];

    @ManyToMany(() => CertificateEntity, (certificate) => certificate.users)
    @JoinTable({
        name: 'UserCertificate',
        synchronize: false
    })
    certificates: CertificateEntity[];
}
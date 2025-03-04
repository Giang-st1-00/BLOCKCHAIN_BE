import { Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, Unique } from 'typeorm';
import { BaseEntity } from "~core/entities/base.entity";
import { UserCertificateEntity } from '~users/entities/user-certificate.entity';
import { UserEntity } from '~users/entities/user.entity';


@Entity('Certificate')
export class CertificateEntity extends BaseEntity {
    @Column({
        type: 'varchar',
    })
    name: string;

    @Column({
        type: 'varchar',
    })
    score: number;

    @OneToMany(() => UserCertificateEntity, (userCertificate) => userCertificate.certificate)
    userCertificates: UserCertificateEntity[];

    @ManyToMany(() => UserEntity, (user) => user.certificates)
    @JoinTable({
        name: 'UserCertificate',
        synchronize: false
    })
    users: UserEntity[];
}
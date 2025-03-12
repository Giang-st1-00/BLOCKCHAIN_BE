import { BaseEntity } from '~core/entities/base.entity';
import { Column, Index, JoinColumn, ManyToOne, Entity } from 'typeorm';
import { UserEntity } from './user.entity';
import { CertificateEntity } from '~certificates/entities/certificate.entity';
import { CertificateStatusEnum } from '~certificates/enums/certificateStatus.enum';

@Entity('UserCetificate')
export class UserCertificateEntity extends BaseEntity {
    @Index('userIdCertificateIndex')
    @Column({ type: 'uuid' })
    userId: string;

    @Index('certificateIdUserIndex')
    @Column({ type: 'uuid' })
    certificateId: string;

    @ManyToOne(() => UserEntity, (user) => user.userCertificates)
    @JoinColumn({
        name: 'userId',
        foreignKeyConstraintName: 'userIdUserCertificateFk'
    })
    user: UserEntity;

    @ManyToOne(() => CertificateEntity, (certificate) => certificate.userCertificates)
    @JoinColumn({
        name: 'certificateId',
        foreignKeyConstraintName: 'certificateIdUserCetificateFk'
    })
    certificate: CertificateEntity;
}

import { BaseEntity } from '~core/entities/base.entity';
import { Column, Index, JoinColumn, ManyToOne, Entity } from 'typeorm';
import { UserEntity } from './user.entity';
import { CertificateEntity } from '~certificates/entities/certificate.entity';
import { CertificateStatusEnum } from '~certificates/enums/certificateStatus.enum';
import { CertificateTypeEntity } from '~certificates/entities/certificate-type.entity';

@Entity('UserCetificateType')
export class UserCertificateTypeEntity extends BaseEntity {
    @Index('userIdCertificateTypeIndex')
    @Column({ type: 'uuid' })
    userId: string;

    @Index('certificateTypeIdUserIndex')
    @Column({ type: 'uuid' })
    certificateTypeId: string;

    @ManyToOne(() => UserEntity, (user) => user.userCertificatesType)
    @JoinColumn({
        name: 'userId',
        foreignKeyConstraintName: 'userIdUserCertificateTypeFk'
    })
    user: UserEntity;

    @ManyToOne(() => CertificateTypeEntity, (certificateType) => certificateType.userCertificatesType)
    @JoinColumn({
        name: 'certificateTypesId',
        foreignKeyConstraintName: 'certificateTypeIdUserCetificateTypeFk'
    })
    certificateType: CertificateTypeEntity;
}

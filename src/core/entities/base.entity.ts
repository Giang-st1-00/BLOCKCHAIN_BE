import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { TimestampTransformer } from '~core/transformer/timestamp.transformer';

export abstract class BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn({
        type: 'timestamp',
        transformer: new TimestampTransformer()
    })
    createdAt: number;

    @UpdateDateColumn({
        type: 'timestamp',
        transformer: new TimestampTransformer()
    })
    updatedAt: number;
}

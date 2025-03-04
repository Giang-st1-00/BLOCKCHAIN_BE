import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUserTable1741070771848 implements MigrationInterface {
    name = 'UpdateUserTable1741070771848'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "User"
            ALTER COLUMN "walletId" DROP NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "User"
            ALTER COLUMN "walletId"
            SET NOT NULL
        `);
    }

}

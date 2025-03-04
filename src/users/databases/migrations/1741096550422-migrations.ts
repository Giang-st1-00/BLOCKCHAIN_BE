import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1741096550422 implements MigrationInterface {
    name = 'Migrations1741096550422'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "User" DROP COLUMN "walletId"
        `);
        await queryRunner.query(`
            ALTER TABLE "User"
            ADD "walletAddress" character varying
        `);
        await queryRunner.query(`
            ALTER TABLE "User"
            ADD "walletPrivateKey" character varying
        `);
        await queryRunner.query(`
            ALTER TABLE "User"
            ADD CONSTRAINT "UQ_3457c8d55e625b4887ee68f66c2" UNIQUE ("code")
        `);
        await queryRunner.query(`
            ALTER TABLE "User" DROP COLUMN "dateOfBirth"
        `);
        await queryRunner.query(`
            ALTER TABLE "User"
            ADD "dateOfBirth" character varying NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "User" DROP COLUMN "dateOfBirth"
        `);
        await queryRunner.query(`
            ALTER TABLE "User"
            ADD "dateOfBirth" TIMESTAMP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "User" DROP CONSTRAINT "UQ_3457c8d55e625b4887ee68f66c2"
        `);
        await queryRunner.query(`
            ALTER TABLE "User" DROP COLUMN "walletPrivateKey"
        `);
        await queryRunner.query(`
            ALTER TABLE "User" DROP COLUMN "walletAddress"
        `);
        await queryRunner.query(`
            ALTER TABLE "User"
            ADD "walletId" character varying NOT NULL
        `);
    }

}

import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1742015260782 implements MigrationInterface {
    name = 'Migrations1742015260782'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "Certificate"
            ADD "score" bigint NOT NULL DEFAULT '0'
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "Certificate" DROP COLUMN "score"
        `);
    }

}

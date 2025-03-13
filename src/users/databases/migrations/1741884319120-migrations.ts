import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1741884319120 implements MigrationInterface {
    name = 'Migrations1741884319120'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "Certificate"
            ADD "certId" character varying
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "Certificate" DROP COLUMN "certId"
        `);
    }

}

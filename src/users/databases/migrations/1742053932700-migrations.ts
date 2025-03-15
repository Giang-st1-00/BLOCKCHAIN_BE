import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1742053932700 implements MigrationInterface {
    name = 'Migrations1742053932700'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "Certificate" DROP COLUMN "image"
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "Certificate"
            ADD "image" character varying NOT NULL
        `);
    }

}

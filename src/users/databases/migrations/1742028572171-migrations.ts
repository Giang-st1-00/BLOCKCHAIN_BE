import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1742028572171 implements MigrationInterface {
    name = 'Migrations1742028572171'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "Certificate"
            ADD "image" character varying NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "Certificate" DROP COLUMN "image"
        `);
    }

}

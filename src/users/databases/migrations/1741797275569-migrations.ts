import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1741797275569 implements MigrationInterface {
    name = 'Migrations1741797275569'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "Certificate" DROP COLUMN "score"
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "Certificate"
            ADD "score" character varying NOT NULL
        `);
    }

}

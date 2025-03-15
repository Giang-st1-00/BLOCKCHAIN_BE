import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1742058468007 implements MigrationInterface {
    name = 'Migrations1742058468007'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "User"
            ADD "image" character varying
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "User" DROP COLUMN "image"
        `);
    }

}

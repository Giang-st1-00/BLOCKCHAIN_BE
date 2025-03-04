import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUserTable1741072043322 implements MigrationInterface {
    name = 'UpdateUserTable1741072043322'

    public async up(queryRunner: QueryRunner): Promise<void> {
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
    }

}

import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1742057467683 implements MigrationInterface {
    name = 'Migrations1742057467683'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TYPE "public"."UserRoleEnum"
            RENAME TO "UserRoleEnum_old"
        `);
        await queryRunner.query(`
            CREATE TYPE "public"."UserRoleEnum" AS ENUM('TEACHER', 'STUDENT', 'MASTER', 'COMPANY')
        `);
        await queryRunner.query(`
            ALTER TABLE "User"
            ALTER COLUMN "role" DROP DEFAULT
        `);
        await queryRunner.query(`
            ALTER TABLE "User"
            ALTER COLUMN "role" TYPE "public"."UserRoleEnum" USING "role"::"text"::"public"."UserRoleEnum"
        `);
        await queryRunner.query(`
            ALTER TABLE "User"
            ALTER COLUMN "role"
            SET DEFAULT 'TEACHER'
        `);
        await queryRunner.query(`
            DROP TYPE "public"."UserRoleEnum_old"
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TYPE "public"."UserRoleEnum_old" AS ENUM('TEACHER', 'STUDENT', 'MASTER')
        `);
        await queryRunner.query(`
            ALTER TABLE "User"
            ALTER COLUMN "role" DROP DEFAULT
        `);
        await queryRunner.query(`
            ALTER TABLE "User"
            ALTER COLUMN "role" TYPE "public"."UserRoleEnum_old" USING "role"::"text"::"public"."UserRoleEnum_old"
        `);
        await queryRunner.query(`
            ALTER TABLE "User"
            ALTER COLUMN "role"
            SET DEFAULT 'TEACHER'
        `);
        await queryRunner.query(`
            DROP TYPE "public"."UserRoleEnum"
        `);
        await queryRunner.query(`
            ALTER TYPE "public"."UserRoleEnum_old"
            RENAME TO "UserRoleEnum"
        `);
    }

}

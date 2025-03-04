import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserAndCertificateTable1741068608647 implements MigrationInterface {
    name = 'CreateUserAndCertificateTable1741068608647'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TYPE "public"."UserRoleEnum" AS ENUM('TEACHER', 'STUDENT', 'MASTER')
        `);
        await queryRunner.query(`
            CREATE TABLE "User" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "code" character varying NOT NULL,
                "name" character varying NOT NULL,
                "password" character varying NOT NULL,
                "dateOfBirth" TIMESTAMP NOT NULL,
                "role" "public"."UserRoleEnum" NOT NULL DEFAULT 'TEACHER',
                "walletId" character varying NOT NULL,
                CONSTRAINT "PK_9862f679340fb2388436a5ab3e4" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "Certificate" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "name" character varying NOT NULL,
                "score" character varying NOT NULL,
                CONSTRAINT "PK_8c14df817ac1c729821b1bc7e55" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "Certificate"
        `);
        await queryRunner.query(`
            DROP TABLE "User"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."UserRoleEnum"
        `);
    }

}

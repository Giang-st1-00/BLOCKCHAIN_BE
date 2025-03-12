import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1741788119980 implements MigrationInterface {
    name = 'Migrations1741788119980'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "CertificateType" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "name" character varying NOT NULL,
                CONSTRAINT "PK_e4703f07e4965132b20c551556d" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "Certificate" DROP COLUMN "name"
        `);
        await queryRunner.query(`
            CREATE TYPE "public"."CertificateStatusEnum" AS ENUM('PENDING', 'APPROVED')
        `);
        await queryRunner.query(`
            ALTER TABLE "Certificate"
            ADD "status" "public"."CertificateStatusEnum" NOT NULL DEFAULT 'PENDING'
        `);
        await queryRunner.query(`
            ALTER TABLE "Certificate"
            ADD "certificateTypeId" uuid NOT NULL
        `);
        await queryRunner.query(`
            CREATE INDEX "certificateTypeId" ON "Certificate" ("certificateTypeId")
        `);
        await queryRunner.query(`
            ALTER TABLE "Certificate"
            ADD CONSTRAINT "certificateTypeIdCertificateFk" FOREIGN KEY ("certificateTypeId") REFERENCES "CertificateType"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "Certificate" DROP CONSTRAINT "certificateTypeIdCertificateFk"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."certificateTypeId"
        `);
        await queryRunner.query(`
            ALTER TABLE "Certificate" DROP COLUMN "certificateTypeId"
        `);
        await queryRunner.query(`
            ALTER TABLE "Certificate" DROP COLUMN "status"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."CertificateStatusEnum"
        `);
        await queryRunner.query(`
            ALTER TABLE "Certificate"
            ADD "name" character varying NOT NULL
        `);
        await queryRunner.query(`
            DROP TABLE "CertificateType"
        `);
    }

}

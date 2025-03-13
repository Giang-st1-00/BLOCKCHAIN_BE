import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1741857631297 implements MigrationInterface {
    name = 'Migrations1741857631297'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "UserCetificateType" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "userId" uuid NOT NULL,
                "certificateTypeId" uuid NOT NULL,
                "certificateTypesId" uuid,
                CONSTRAINT "PK_97874223b698fc98a789a32e511" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "userIdCertificateTypeIndex" ON "UserCetificateType" ("userId")
        `);
        await queryRunner.query(`
            CREATE INDEX "certificateTypeIdUserIndex" ON "UserCetificateType" ("certificateTypeId")
        `);
        await queryRunner.query(`
            ALTER TABLE "UserCetificateType"
            ADD CONSTRAINT "userIdUserCertificateTypeFk" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "UserCetificateType"
            ADD CONSTRAINT "certificateTypeIdUserCetificateTypeFk" FOREIGN KEY ("certificateTypesId") REFERENCES "CertificateType"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "UserCetificateType" DROP CONSTRAINT "certificateTypeIdUserCetificateTypeFk"
        `);
        await queryRunner.query(`
            ALTER TABLE "UserCetificateType" DROP CONSTRAINT "userIdUserCertificateTypeFk"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."certificateTypeIdUserIndex"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."userIdCertificateTypeIndex"
        `);
        await queryRunner.query(`
            DROP TABLE "UserCetificateType"
        `);
    }

}

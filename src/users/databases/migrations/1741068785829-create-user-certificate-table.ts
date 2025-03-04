import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserCertificateTable1741068785829 implements MigrationInterface {
    name = 'CreateUserCertificateTable1741068785829'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "UserCetificate" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "userId" uuid NOT NULL,
                "certificateId" uuid NOT NULL,
                CONSTRAINT "PK_f892a318bc71b1a87c751185fd8" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "userIdCertificateIndex" ON "UserCetificate" ("userId")
        `);
        await queryRunner.query(`
            CREATE INDEX "certificateIdUserIndex" ON "UserCetificate" ("certificateId")
        `);
        await queryRunner.query(`
            ALTER TABLE "UserCetificate"
            ADD CONSTRAINT "userIdUserCertificateFk" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "UserCetificate"
            ADD CONSTRAINT "certificateIdUserCetificateFk" FOREIGN KEY ("certificateId") REFERENCES "Certificate"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "UserCetificate" DROP CONSTRAINT "certificateIdUserCetificateFk"
        `);
        await queryRunner.query(`
            ALTER TABLE "UserCetificate" DROP CONSTRAINT "userIdUserCertificateFk"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."certificateIdUserIndex"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."userIdCertificateIndex"
        `);
        await queryRunner.query(`
            DROP TABLE "UserCetificate"
        `);
    }

}

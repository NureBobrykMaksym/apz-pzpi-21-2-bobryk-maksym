import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateLocationTable1713095875340 implements MigrationInterface {
    name = 'CreateLocationTable1713095875340'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "location" ("id" integer NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_876d7bdba03c72251ec4c2dc827" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "location"`);
    }

}

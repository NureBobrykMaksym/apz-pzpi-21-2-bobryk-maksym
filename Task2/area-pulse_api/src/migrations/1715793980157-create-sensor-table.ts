import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSensorTable1715793980157 implements MigrationInterface {
  name = 'CreateSensorTable1715793980157';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "sensors" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "sectorId" integer, CONSTRAINT "PK_b8bd5fcfd700e39e96bcd9ba6b7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "sensors" ADD CONSTRAINT "FK_cdc713c049e15a19e9b9b51c08e" FOREIGN KEY ("sectorId") REFERENCES "sectors"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "sensors" DROP CONSTRAINT "FK_cdc713c049e15a19e9b9b51c08e"`,
    );
    await queryRunner.query(`DROP TABLE "sensors"`);
  }
}

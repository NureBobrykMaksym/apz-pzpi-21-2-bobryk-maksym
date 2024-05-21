import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSectorTableChangeRelations1715282352177
  implements MigrationInterface
{
  name = 'AddSectorTableChangeRelations1715282352177';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "attendances" DROP CONSTRAINT "FK_2430a10c2155819953ba698726c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "attendances" RENAME COLUMN "locationId" TO "sectorId"`,
    );
    await queryRunner.query(
      `CREATE TABLE "sectors" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "locationId" integer, CONSTRAINT "PK_923fdda0dc12f59add7b3a1782f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "attendances" ADD CONSTRAINT "FK_7a2d63f1e6f964805375f950634" FOREIGN KEY ("sectorId") REFERENCES "sectors"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "sectors" ADD CONSTRAINT "FK_5ba3ba0e147ff1c789c1e139dd8" FOREIGN KEY ("locationId") REFERENCES "locations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "sectors" DROP CONSTRAINT "FK_5ba3ba0e147ff1c789c1e139dd8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "attendances" DROP CONSTRAINT "FK_7a2d63f1e6f964805375f950634"`,
    );
    await queryRunner.query(`DROP TABLE "sectors"`);
    await queryRunner.query(
      `ALTER TABLE "attendances" RENAME COLUMN "sectorId" TO "locationId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "attendances" ADD CONSTRAINT "FK_2430a10c2155819953ba698726c" FOREIGN KEY ("locationId") REFERENCES "locations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }
}

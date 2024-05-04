import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddOneToManyRelationLocationAttendances1714818412767
  implements MigrationInterface
{
  name = 'AddOneToManyRelationLocationAttendances1714818412767';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "attendances" ADD "locationId" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "attendances" ADD CONSTRAINT "FK_2430a10c2155819953ba698726c" FOREIGN KEY ("locationId") REFERENCES "locations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "attendances" DROP CONSTRAINT "FK_2430a10c2155819953ba698726c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "attendances" DROP COLUMN "locationId"`,
    );
  }
}

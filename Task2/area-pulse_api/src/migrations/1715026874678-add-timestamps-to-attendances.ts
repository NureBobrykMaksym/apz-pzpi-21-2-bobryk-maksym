import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTimestampsToAttendances1715026874678
  implements MigrationInterface
{
  name = 'AddTimestampsToAttendances1715026874678';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "attendances" ADD "createdDate" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "attendances" ADD "updatedDate" TIMESTAMP NOT NULL DEFAULT now()`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "attendances" DROP COLUMN "updatedDate"`,
    );
    await queryRunner.query(
      `ALTER TABLE "attendances" DROP COLUMN "createdDate"`,
    );
  }
}

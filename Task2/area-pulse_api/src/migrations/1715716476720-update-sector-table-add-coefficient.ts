import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateSectorTableAddCoefficient1715716476720
  implements MigrationInterface
{
  name = 'UpdateSectorTableAddCoefficient1715716476720';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "sectors" ADD "attendanceCoefficient" integer`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "sectors" DROP COLUMN "attendanceCoefficient"`,
    );
  }
}

import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddOneToManyRelationLocationUser1714821697356
  implements MigrationInterface
{
  name = 'AddOneToManyRelationLocationUser1714821697356';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "locations" ADD "userId" integer`);
    await queryRunner.query(
      `ALTER TABLE "locations" ADD CONSTRAINT "FK_78eda52dc27b7ad20350c4a752d" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "locations" DROP CONSTRAINT "FK_78eda52dc27b7ad20350c4a752d"`,
    );
    await queryRunner.query(`ALTER TABLE "locations" DROP COLUMN "userId"`);
  }
}

import { MigrationInterface, QueryRunner } from 'typeorm';

export class FillItemsWithMoreColumns1656773332243
  implements MigrationInterface
{
  name = 'FillItemsWithMoreColumns1656773332243';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "items" ADD "created" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "items" ADD "updated" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "items" ADD "isCompleted" boolean NOT NULL DEFAULT false`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "items" DROP COLUMN "isCompleted"`);
    await queryRunner.query(`ALTER TABLE "items" DROP COLUMN "updated"`);
    await queryRunner.query(`ALTER TABLE "items" DROP COLUMN "created"`);
  }
}

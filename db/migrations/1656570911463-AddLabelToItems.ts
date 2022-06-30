import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddLabelToItems1656570911463 implements MigrationInterface {
  name = 'AddLabelToItems1656570911463';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "items" ADD "label" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "items" DROP COLUMN "label"`);
  }
}

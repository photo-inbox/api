import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateItems1656570489076 implements MigrationInterface {
  name = 'CreateItems1656570489076';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "items"
       (
           "id"    uuid              NOT NULL DEFAULT uuid_generate_v4(),
           "image" character varying NOT NULL,
           CONSTRAINT "UQ_0684aea7df1416739937320cab6" UNIQUE ("image"),
           CONSTRAINT "PK_ba5885359424c15ca6b9e79bcf6" PRIMARY KEY ("id")
       )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "items"`);
  }
}

import { MigrationInterface, QueryRunner } from 'typeorm';

export class DropI18n1657024891807 implements MigrationInterface {
  name = 'DropI18n1657024891807';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "i18n"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "i18n"
       (
           "id"       uuid              NOT NULL DEFAULT uuid_generate_v4(),
           "lang"     character varying NOT NULL,
           "document" json              NOT NULL,
           "created"  TIMESTAMP         NOT NULL DEFAULT now(),
           "updated"  TIMESTAMP         NOT NULL DEFAULT now(),
           CONSTRAINT "UQ_f640cf12b0a2cf8bbe427fab433" UNIQUE ("lang"),
           CONSTRAINT "PK_d2946196f209fb46ac695722927" PRIMARY KEY ("id")
       )`,
    );
  }
}

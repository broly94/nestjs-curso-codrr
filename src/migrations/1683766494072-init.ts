import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1683766494072 implements MigrationInterface {
    name = 'Init1683766494072'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "test" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "test"`);
    }

}

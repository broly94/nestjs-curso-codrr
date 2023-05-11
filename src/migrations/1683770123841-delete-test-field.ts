import { MigrationInterface, QueryRunner } from "typeorm";

export class DeleteTestField1683770123841 implements MigrationInterface {
    name = 'DeleteTestField1683770123841'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "test"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "test" character varying NOT NULL`);
    }

}

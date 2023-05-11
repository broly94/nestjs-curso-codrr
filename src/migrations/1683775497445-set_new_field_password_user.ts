import { MigrationInterface, QueryRunner } from "typeorm";

export class SetNewFieldPasswordUser1683775497445 implements MigrationInterface {
    name = 'SetNewFieldPasswordUser1683775497445'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "password" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
    }

}

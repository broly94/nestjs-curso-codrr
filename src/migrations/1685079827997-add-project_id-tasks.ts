import { MigrationInterface, QueryRunner } from "typeorm";

export class AddProjectIdTasks1685079827997 implements MigrationInterface {
    name = 'AddProjectIdTasks1685079827997'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" RENAME COLUMN "task_description" TO "task_descriptions"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" RENAME COLUMN "task_descriptions" TO "task_description"`);
    }

}

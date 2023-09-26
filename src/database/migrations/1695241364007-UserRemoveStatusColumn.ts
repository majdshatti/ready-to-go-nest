import { MigrationInterface, QueryRunner } from "typeorm";

export class UserRemoveStatusColumn1695241364007 implements MigrationInterface {
    name = 'UserRemoveStatusColumn1695241364007'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`status\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`status\` varchar(255) NOT NULL`);
    }

}

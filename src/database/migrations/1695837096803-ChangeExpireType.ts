import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeExpireType1695837096803 implements MigrationInterface {
    name = 'ChangeExpireType1695837096803'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`password_reset\` DROP COLUMN \`reset_password_expire\``);
        await queryRunner.query(`ALTER TABLE \`password_reset\` ADD \`reset_password_expire\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`password_reset\` DROP COLUMN \`reset_password_expire\``);
        await queryRunner.query(`ALTER TABLE \`password_reset\` ADD \`reset_password_expire\` int NOT NULL`);
    }

}

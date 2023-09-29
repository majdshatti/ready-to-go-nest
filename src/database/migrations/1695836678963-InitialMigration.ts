import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1695836678963 implements MigrationInterface {
    name = 'InitialMigration1695836678963'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`log\` (\`id\` int NOT NULL AUTO_INCREMENT, \`_id\` varchar(255) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`status_code\` int NOT NULL, \`message\` varchar(255) NOT NULL, \`path\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_90372699eee540de67c698853f\` (\`_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`password_reset\` (\`id\` int NOT NULL AUTO_INCREMENT, \`_id\` varchar(255) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`reset_password_token\` varchar(255) NOT NULL, \`reset_password_expire\` int NOT NULL, \`status\` varchar(255) NOT NULL, \`user_id\` int NOT NULL, UNIQUE INDEX \`IDX_d10835f9fbcb0ba018db5d2b02\` (\`_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`_id\` varchar(255) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`username\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`type\` varchar(255) NOT NULL, \`login_strategy\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_457bfa3e35350a716846b03102\` (\`_id\`), UNIQUE INDEX \`IDX_f4ca2c1e7c96ae6e8a7cca9df8\` (\`username\`, \`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`password_reset\` ADD CONSTRAINT \`FK_ad88301fdc79593dd222268a8b6\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`password_reset\` DROP FOREIGN KEY \`FK_ad88301fdc79593dd222268a8b6\``);
        await queryRunner.query(`DROP INDEX \`IDX_f4ca2c1e7c96ae6e8a7cca9df8\` ON \`user\``);
        await queryRunner.query(`DROP INDEX \`IDX_457bfa3e35350a716846b03102\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP INDEX \`IDX_d10835f9fbcb0ba018db5d2b02\` ON \`password_reset\``);
        await queryRunner.query(`DROP TABLE \`password_reset\``);
        await queryRunner.query(`DROP INDEX \`IDX_90372699eee540de67c698853f\` ON \`log\``);
        await queryRunner.query(`DROP TABLE \`log\``);
    }

}

import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRBACTables1695764514139 implements MigrationInterface {
    name = 'AddRBACTables1695764514139'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`policy\` (\`id\` int NOT NULL AUTO_INCREMENT, \`_id\` varchar(255) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`name\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_64caf5c7c168ffbeabf8075904\` (\`_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`resource\` (\`id\` int NOT NULL AUTO_INCREMENT, \`_id\` varchar(255) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`name\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_ec92dd01ea2600bcbfdd47dca5\` (\`_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`permission_policy\` (\`policy_id\` int NOT NULL, \`permission_id\` int NOT NULL, INDEX \`IDX_a0b845f5f554daf4d66370ecdc\` (\`policy_id\`), INDEX \`IDX_fded62a84b372590cc32f1c2dd\` (\`permission_id\`), PRIMARY KEY (\`policy_id\`, \`permission_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`permission\` DROP COLUMN \`resource\``);
        await queryRunner.query(`ALTER TABLE \`permission_policy\` ADD CONSTRAINT \`FK_a0b845f5f554daf4d66370ecdcb\` FOREIGN KEY (\`policy_id\`) REFERENCES \`policy\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`permission_policy\` ADD CONSTRAINT \`FK_fded62a84b372590cc32f1c2dd3\` FOREIGN KEY (\`permission_id\`) REFERENCES \`permission\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`permission_policy\` DROP FOREIGN KEY \`FK_fded62a84b372590cc32f1c2dd3\``);
        await queryRunner.query(`ALTER TABLE \`permission_policy\` DROP FOREIGN KEY \`FK_a0b845f5f554daf4d66370ecdcb\``);
        await queryRunner.query(`ALTER TABLE \`permission\` ADD \`resource\` varchar(255) NOT NULL`);
        await queryRunner.query(`DROP INDEX \`IDX_fded62a84b372590cc32f1c2dd\` ON \`permission_policy\``);
        await queryRunner.query(`DROP INDEX \`IDX_a0b845f5f554daf4d66370ecdc\` ON \`permission_policy\``);
        await queryRunner.query(`DROP TABLE \`permission_policy\``);
        await queryRunner.query(`DROP INDEX \`IDX_ec92dd01ea2600bcbfdd47dca5\` ON \`resource\``);
        await queryRunner.query(`DROP TABLE \`resource\``);
        await queryRunner.query(`DROP INDEX \`IDX_64caf5c7c168ffbeabf8075904\` ON \`policy\``);
        await queryRunner.query(`DROP TABLE \`policy\``);
    }

}

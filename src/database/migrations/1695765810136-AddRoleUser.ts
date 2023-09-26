import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRoleUser1695765810136 implements MigrationInterface {
    name = 'AddRoleUser1695765810136'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`policy_role\` DROP FOREIGN KEY \`FK_555e82d3135153dd7909fcaaba2\``);
        await queryRunner.query(`ALTER TABLE \`policy_role\` DROP FOREIGN KEY \`FK_92fa51936e77ab232c12f87b338\``);
        await queryRunner.query(`ALTER TABLE \`permission_policy\` DROP FOREIGN KEY \`FK_a0b845f5f554daf4d66370ecdcb\``);
        await queryRunner.query(`ALTER TABLE \`permission_policy\` DROP FOREIGN KEY \`FK_fded62a84b372590cc32f1c2dd3\``);
        await queryRunner.query(`CREATE TABLE \`role_user\` (\`user_id\` int NOT NULL, \`role_id\` int NOT NULL, INDEX \`IDX_5261e26da61ccaf8aeda8bca8e\` (\`user_id\`), INDEX \`IDX_78ee37f2db349d230d502b1c7e\` (\`role_id\`), PRIMARY KEY (\`user_id\`, \`role_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`role_user\` ADD CONSTRAINT \`FK_5261e26da61ccaf8aeda8bca8ea\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`role_user\` ADD CONSTRAINT \`FK_78ee37f2db349d230d502b1c7ea\` FOREIGN KEY (\`role_id\`) REFERENCES \`role\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`policy_role\` ADD CONSTRAINT \`FK_555e82d3135153dd7909fcaaba2\` FOREIGN KEY (\`role_id\`) REFERENCES \`role\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`policy_role\` ADD CONSTRAINT \`FK_92fa51936e77ab232c12f87b338\` FOREIGN KEY (\`policy_id\`) REFERENCES \`policy\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`permission_policy\` ADD CONSTRAINT \`FK_a0b845f5f554daf4d66370ecdcb\` FOREIGN KEY (\`policy_id\`) REFERENCES \`policy\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`permission_policy\` ADD CONSTRAINT \`FK_fded62a84b372590cc32f1c2dd3\` FOREIGN KEY (\`permission_id\`) REFERENCES \`permission\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`permission_policy\` DROP FOREIGN KEY \`FK_fded62a84b372590cc32f1c2dd3\``);
        await queryRunner.query(`ALTER TABLE \`permission_policy\` DROP FOREIGN KEY \`FK_a0b845f5f554daf4d66370ecdcb\``);
        await queryRunner.query(`ALTER TABLE \`policy_role\` DROP FOREIGN KEY \`FK_92fa51936e77ab232c12f87b338\``);
        await queryRunner.query(`ALTER TABLE \`policy_role\` DROP FOREIGN KEY \`FK_555e82d3135153dd7909fcaaba2\``);
        await queryRunner.query(`ALTER TABLE \`role_user\` DROP FOREIGN KEY \`FK_78ee37f2db349d230d502b1c7ea\``);
        await queryRunner.query(`ALTER TABLE \`role_user\` DROP FOREIGN KEY \`FK_5261e26da61ccaf8aeda8bca8ea\``);
        await queryRunner.query(`DROP INDEX \`IDX_78ee37f2db349d230d502b1c7e\` ON \`role_user\``);
        await queryRunner.query(`DROP INDEX \`IDX_5261e26da61ccaf8aeda8bca8e\` ON \`role_user\``);
        await queryRunner.query(`DROP TABLE \`role_user\``);
        await queryRunner.query(`ALTER TABLE \`permission_policy\` ADD CONSTRAINT \`FK_fded62a84b372590cc32f1c2dd3\` FOREIGN KEY (\`permission_id\`) REFERENCES \`permission\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`permission_policy\` ADD CONSTRAINT \`FK_a0b845f5f554daf4d66370ecdcb\` FOREIGN KEY (\`policy_id\`) REFERENCES \`policy\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`policy_role\` ADD CONSTRAINT \`FK_92fa51936e77ab232c12f87b338\` FOREIGN KEY (\`policy_id\`) REFERENCES \`policy\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`policy_role\` ADD CONSTRAINT \`FK_555e82d3135153dd7909fcaaba2\` FOREIGN KEY (\`role_id\`) REFERENCES \`role\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}

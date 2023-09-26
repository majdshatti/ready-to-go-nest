import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPolicyRole1695765469826 implements MigrationInterface {
    name = 'AddPolicyRole1695765469826'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`permission_policy\` DROP FOREIGN KEY \`FK_a0b845f5f554daf4d66370ecdcb\``);
        await queryRunner.query(`ALTER TABLE \`permission_policy\` DROP FOREIGN KEY \`FK_fded62a84b372590cc32f1c2dd3\``);
        await queryRunner.query(`CREATE TABLE \`policy_role\` (\`role_id\` int NOT NULL, \`policy_id\` int NOT NULL, INDEX \`IDX_555e82d3135153dd7909fcaaba\` (\`role_id\`), INDEX \`IDX_92fa51936e77ab232c12f87b33\` (\`policy_id\`), PRIMARY KEY (\`role_id\`, \`policy_id\`)) ENGINE=InnoDB`);
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
        await queryRunner.query(`DROP INDEX \`IDX_92fa51936e77ab232c12f87b33\` ON \`policy_role\``);
        await queryRunner.query(`DROP INDEX \`IDX_555e82d3135153dd7909fcaaba\` ON \`policy_role\``);
        await queryRunner.query(`DROP TABLE \`policy_role\``);
        await queryRunner.query(`ALTER TABLE \`permission_policy\` ADD CONSTRAINT \`FK_fded62a84b372590cc32f1c2dd3\` FOREIGN KEY (\`permission_id\`) REFERENCES \`permission\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`permission_policy\` ADD CONSTRAINT \`FK_a0b845f5f554daf4d66370ecdcb\` FOREIGN KEY (\`policy_id\`) REFERENCES \`policy\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}

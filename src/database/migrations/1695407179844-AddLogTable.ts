import { MigrationInterface, QueryRunner } from "typeorm";

export class AddLogTable1695407179844 implements MigrationInterface {
    name = 'AddLogTable1695407179844'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`log\` (\`id\` int NOT NULL AUTO_INCREMENT, \`_id\` varchar(255) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`status_code\` int NOT NULL, \`message\` varchar(255) NOT NULL, \`path\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_90372699eee540de67c698853f\` (\`_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_90372699eee540de67c698853f\` ON \`log\``);
        await queryRunner.query(`DROP TABLE \`log\``);
    }

}

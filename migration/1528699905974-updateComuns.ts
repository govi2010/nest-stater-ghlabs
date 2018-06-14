import {MigrationInterface, QueryRunner} from "typeorm";

export class updateComuns1528699905974 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `content_type` ADD `created_date` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `content_type` ADD `updated_date` datetime NULL");
        await queryRunner.query("ALTER TABLE `permission` ADD `created_date` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `permission` ADD `updated_date` datetime NULL");
        await queryRunner.query("ALTER TABLE `group` ADD `created_date` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `group` ADD `updated_date` datetime NULL");
        await queryRunner.query("ALTER TABLE `user` ADD `created_date` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `user` ADD `updated_date` datetime NULL");
        await queryRunner.query("ALTER TABLE `user` CHANGE `date_of_birth` `date_of_birth` datetime NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `user` CHANGE `date_of_birth` `date_of_birth` datetime(0) NULL");
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `updated_date`");
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `created_date`");
        await queryRunner.query("ALTER TABLE `group` DROP COLUMN `updated_date`");
        await queryRunner.query("ALTER TABLE `group` DROP COLUMN `created_date`");
        await queryRunner.query("ALTER TABLE `permission` DROP COLUMN `updated_date`");
        await queryRunner.query("ALTER TABLE `permission` DROP COLUMN `created_date`");
        await queryRunner.query("ALTER TABLE `content_type` DROP COLUMN `updated_date`");
        await queryRunner.query("ALTER TABLE `content_type` DROP COLUMN `created_date`");
    }

}

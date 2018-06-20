import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserPermissoons implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('CREATE TABLE `user_permissions` (`user_id` int NOT NULL, `permission_id` int NOT NULL, ' +
      'PRIMARY KEY (`user_id`, `permission_id`)) ENGINE=InnoDB');
    await queryRunner.query('ALTER TABLE `content_type` CHANGE `updated_date` `updated_date` datetime NULL');
    await queryRunner.query('ALTER TABLE `permission` CHANGE `updated_date` `updated_date` datetime NULL');
    await queryRunner.query('ALTER TABLE `group` CHANGE `updated_date` `updated_date` datetime NULL');
    await queryRunner.query('ALTER TABLE `user` CHANGE `updated_date` `updated_date` datetime NULL');
    await queryRunner.query('ALTER TABLE `user` CHANGE `date_of_birth` `date_of_birth` datetime NULL');
    await queryRunner.query('ALTER TABLE `user_permissions` ADD CONSTRAINT `FK_3495bd31f1862d02931e8e8d2e8` ' +
      'FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE');
    await queryRunner.query('ALTER TABLE `user_permissions` ADD CONSTRAINT `FK_8145f5fadacd311693c15e41f10` ' +
      'FOREIGN KEY (`permission_id`) REFERENCES `permission`(`id`) ON DELETE CASCADE');
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('ALTER TABLE `user_permissions` DROP FOREIGN KEY `FK_8145f5fadacd311693c15e41f10`');
    await queryRunner.query('ALTER TABLE `user_permissions` DROP FOREIGN KEY `FK_3495bd31f1862d02931e8e8d2e8`');
    await queryRunner.query('ALTER TABLE `user` CHANGE `date_of_birth` `date_of_birth` datetime(0) NULL');
    await queryRunner.query('ALTER TABLE `user` CHANGE `updated_date` `updated_date` datetime(0) NULL');
    await queryRunner.query('ALTER TABLE `group` CHANGE `updated_date` `updated_date` datetime(0) NULL');
    await queryRunner.query('ALTER TABLE `permission` CHANGE `updated_date` `updated_date` datetime(0) NULL');
    await queryRunner.query('ALTER TABLE `content_type` CHANGE `updated_date` `updated_date` datetime(0) NULL');
    await queryRunner.query('DROP TABLE `user_permissions`');
  }

}

import {MigrationInterface, QueryRunner} from "typeorm";

export class Init1530088345164 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `content_type` (`id` int NOT NULL AUTO_INCREMENT, `created_date` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_date` datetime NULL, `name` varchar(100) NOT NULL, `title` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `permission` (`id` int NOT NULL AUTO_INCREMENT, `created_date` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_date` datetime NULL, `name` varchar(100) NOT NULL, `title` varchar(255) NOT NULL, `content_type_id` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `group` (`id` int NOT NULL AUTO_INCREMENT, `created_date` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_date` datetime NULL, `name` varchar(100) NOT NULL, `title` varchar(255) NOT NULL, UNIQUE INDEX `IDX_8a45300fd825918f3b40195fbd` (`name`), UNIQUE INDEX `IDX_326ae60c2267f5780f1ecc09fa` (`title`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `user` (`id` int NOT NULL AUTO_INCREMENT, `created_date` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_date` datetime NULL, `password` varchar(128) NOT NULL, `last_login` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `is_superuser` tinyint NOT NULL DEFAULT 0, `username` varchar(150) NOT NULL, `first_name` varchar(30) NOT NULL, `last_name` varchar(30) NOT NULL, `email` varchar(254) NOT NULL, `is_staff` tinyint NOT NULL DEFAULT 0, `is_active` tinyint NOT NULL DEFAULT 0, `date_joined` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `date_of_birth` datetime NULL, UNIQUE INDEX `IDX_78a916df40e02a9deb1c4b75ed` (`username`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `group_permissions` (`permission_id` int NOT NULL, `group_id` int NOT NULL, PRIMARY KEY (`permission_id`, `group_id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `user_groups` (`group_id` int NOT NULL, `user_id` int NOT NULL, PRIMARY KEY (`group_id`, `user_id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `user_permissions` (`user_id` int NOT NULL, `permission_id` int NOT NULL, PRIMARY KEY (`user_id`, `permission_id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `permission` ADD CONSTRAINT `FK_cc841779d8a08db653e6480a07a` FOREIGN KEY (`content_type_id`) REFERENCES `content_type`(`id`)");
        await queryRunner.query("ALTER TABLE `group_permissions` ADD CONSTRAINT `FK_7514fdc446a1fdcf5b2d39cda60` FOREIGN KEY (`permission_id`) REFERENCES `permission`(`id`) ON DELETE CASCADE");
        await queryRunner.query("ALTER TABLE `group_permissions` ADD CONSTRAINT `FK_3924be6485a5b5d0d2fe1a94c08` FOREIGN KEY (`group_id`) REFERENCES `group`(`id`) ON DELETE CASCADE");
        await queryRunner.query("ALTER TABLE `user_groups` ADD CONSTRAINT `FK_4c5f2c23c34f3921fbad2cd3940` FOREIGN KEY (`group_id`) REFERENCES `group`(`id`) ON DELETE CASCADE");
        await queryRunner.query("ALTER TABLE `user_groups` ADD CONSTRAINT `FK_95bf94c61795df25a5154350102` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE");
        await queryRunner.query("ALTER TABLE `user_permissions` ADD CONSTRAINT `FK_3495bd31f1862d02931e8e8d2e8` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE");
        await queryRunner.query("ALTER TABLE `user_permissions` ADD CONSTRAINT `FK_8145f5fadacd311693c15e41f10` FOREIGN KEY (`permission_id`) REFERENCES `permission`(`id`) ON DELETE CASCADE");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `user_permissions` DROP FOREIGN KEY `FK_8145f5fadacd311693c15e41f10`");
        await queryRunner.query("ALTER TABLE `user_permissions` DROP FOREIGN KEY `FK_3495bd31f1862d02931e8e8d2e8`");
        await queryRunner.query("ALTER TABLE `user_groups` DROP FOREIGN KEY `FK_95bf94c61795df25a5154350102`");
        await queryRunner.query("ALTER TABLE `user_groups` DROP FOREIGN KEY `FK_4c5f2c23c34f3921fbad2cd3940`");
        await queryRunner.query("ALTER TABLE `group_permissions` DROP FOREIGN KEY `FK_3924be6485a5b5d0d2fe1a94c08`");
        await queryRunner.query("ALTER TABLE `group_permissions` DROP FOREIGN KEY `FK_7514fdc446a1fdcf5b2d39cda60`");
        await queryRunner.query("ALTER TABLE `permission` DROP FOREIGN KEY `FK_cc841779d8a08db653e6480a07a`");
        await queryRunner.query("DROP TABLE `user_permissions`");
        await queryRunner.query("DROP TABLE `user_groups`");
        await queryRunner.query("DROP TABLE `group_permissions`");
        await queryRunner.query("DROP INDEX `IDX_78a916df40e02a9deb1c4b75ed` ON `user`");
        await queryRunner.query("DROP TABLE `user`");
        await queryRunner.query("DROP INDEX `IDX_326ae60c2267f5780f1ecc09fa` ON `group`");
        await queryRunner.query("DROP INDEX `IDX_8a45300fd825918f3b40195fbd` ON `group`");
        await queryRunner.query("DROP TABLE `group`");
        await queryRunner.query("DROP TABLE `permission`");
        await queryRunner.query("DROP TABLE `content_type`");
    }

}

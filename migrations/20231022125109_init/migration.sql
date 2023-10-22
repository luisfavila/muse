-- CreateTable
CREATE TABLE `FileCache` (
    `hash` VARCHAR(255) NOT NULL,
    `bytes` INTEGER NOT NULL,
    `accessedAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`hash`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `KeyValueCache` (
    `key` VARCHAR(255) NOT NULL,
    `value` TEXT NOT NULL,
    `expiresAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`key`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Setting` (
    `guildId` VARCHAR(255) NOT NULL,
    `playlistLimit` INTEGER NOT NULL DEFAULT 50,
    `secondsToWaitAfterQueueEmpties` INTEGER NOT NULL DEFAULT 30,
    `leaveIfNoListeners` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`guildId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FavoriteQuery` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `guildId` VARCHAR(255) NOT NULL,
    `authorId` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `query` TEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `FavoriteQuery_guildId_name_key`(`guildId`, `name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

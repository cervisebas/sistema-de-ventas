CREATE TABLE `categories` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text(50) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `clients` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text(50) NOT NULL,
	`email` text(50),
	`phone` text(15)
);
--> statement-breakpoint
CREATE TABLE `discounts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`id_product` integer NOT NULL,
	`startDate` integer NOT NULL,
	`endDate` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `products` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text(50) NOT NULL,
	`price` real NOT NULL,
	`description` text,
	`id_category` integer NOT NULL,
	`expire` integer
);
--> statement-breakpoint
CREATE TABLE `sale-items` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`date` integer NOT NULL,
	`price` real NOT NULL,
	`discount` real NOT NULL,
	`id_client` integer NOT NULL
);

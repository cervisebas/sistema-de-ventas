CREATE TABLE `categories` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text(50) NOT NULL,
	`delete` integer DEFAULT false
);
--> statement-breakpoint
CREATE TABLE `clients` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text(50) NOT NULL,
	`email` text(50),
	`phone` text(15),
	`delete` integer DEFAULT false
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
	`expire` integer,
	`delete` integer DEFAULT false
);
--> statement-breakpoint
CREATE TABLE `sale-items` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`id_product` integer NOT NULL,
	`id_sale` integer NOT NULL,
	`price` real NOT NULL,
	`quantity` real NOT NULL
);
--> statement-breakpoint
CREATE TABLE `sales` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`date` integer NOT NULL,
	`price` real NOT NULL,
	`discount` real NOT NULL,
	`id_client` integer
);

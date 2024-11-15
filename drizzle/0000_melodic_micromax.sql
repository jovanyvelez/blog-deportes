CREATE TABLE IF NOT EXISTS `articulos` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`noticia` text NOT NULL,
	`titular` text,
	`fecha` integer NOT NULL,
	`id_usuario` integer NOT NULL,
	`id_tema` integer NOT NULL,
	FOREIGN KEY (`id_usuario`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`id_tema`) REFERENCES `temas`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `deportes` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`nombre_deporte` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `inscripciones` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`id_torneo` integer NOT NULL,
	`id_usuario` integer NOT NULL,
	`fecha_inscripcion` integer DEFAULT 1730579831718000,
	FOREIGN KEY (`id_torneo`) REFERENCES `torneos`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`id_usuario`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `temas` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`tema` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `torneos` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`nombre_torneo` text NOT NULL,
	`fecha_inicio` integer NOT NULL,
	`fecha_fin` integer NOT NULL,
	`id_deporte` integer NOT NULL,
	FOREIGN KEY (`id_deporte`) REFERENCES `deportes`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`nombre` text NOT NULL,
	`apellido` text NOT NULL,
	`email` text NOT NULL,
	`telefono` text NOT NULL,
	`tipo_doc` text NOT NULL,
	`numero_doc` text NOT NULL,
	`nacimiento` integer NOT NULL,
	`rol` text NOT NULL,
	`creado` integer DEFAULT 1730579831712000,
	`password_hash` text,
	`token_auth` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_numeroDoc_unique` ON `users` (`numero_doc`);--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `usuariostemas` (
	`user_id` integer NOT NULL,
	`tema_id` integer NOT NULL,
	PRIMARY KEY(`user_id`, `tema_id`),
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`tema_id`) REFERENCES `temas`(`id`) ON UPDATE no action ON DELETE no action
);

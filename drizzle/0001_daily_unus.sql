DROP INDEX IF EXISTS "users_email_unique";--> statement-breakpoint
DROP INDEX IF EXISTS "users_numeroDoc_unique";--> statement-breakpoint
ALTER TABLE `inscripciones` ALTER COLUMN "fecha_inscripcion" TO "fecha_inscripcion" integer DEFAULT 1730586710370000;--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_numeroDoc_unique` ON `users` (`numero_doc`);--> statement-breakpoint
ALTER TABLE `users` ALTER COLUMN "creado" TO "creado" integer DEFAULT 1730586710367000;--> statement-breakpoint
ALTER TABLE `articulos` ADD `fecha_edicion` integer;
import { int, text, sqliteTable, primaryKey } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';


export const users = sqliteTable('users', {
	id: int().primaryKey({ autoIncrement: true }),
	nombre: text().notNull(),
	apellido: text().notNull(),
	email: text().notNull().unique(),
	telefono: text().notNull(),
	tipoDoc: text().notNull(),
	numeroDoc: text().notNull().unique(),
	nacimiento: int().notNull(),
	rol: text({enum:["admin","user"]}).notNull(),
	creado: int().default(Date.now() * 1000),
	passwordHash: text(),
	tokenAuth: text()
});

export type User = typeof users.$inferSelect
export type Users = typeof users.$inferSelect[]
export type UserInsert = typeof users.$inferInsert

export const relationUsers = relations(users, ({ many }) => ({
	usuariosATemas: many(usuariostemas),
	inscripciones: many(inscripciones)
}));

export const temas = sqliteTable('temas', {
	id: int().primaryKey({ autoIncrement: true }),
	tema: text().notNull()
});

export const temasRelacion = relations(temas, ({ many }) => ({
	articulos: many(articulos),
	usuariosATemas: many(usuariostemas)
}));

export const usuariostemas = sqliteTable(
	'usuariostemas',
	{
		userId: int()
			.notNull()
			.references(() => users.id),
		temaId: int()
			.notNull()
			.references(() => temas.id)
	},
	(t) => ({
		pk: primaryKey({ columns: [t.userId, t.temaId] })
	})
);

export const usuariosATemasRelacion = relations(usuariostemas, ({ one }) => ({
	usuario: one(users, {
		fields: [usuariostemas.userId],
		references: [users.id]
	}),
	tema: one(temas, {
		fields: [usuariostemas.temaId],
		references: [temas.id]
	})
}));


export const articulos = sqliteTable('articulos', {
	id: int().primaryKey({ autoIncrement: true }),
	noticia: text().notNull(),
	titular: text(),
	fecha: int().notNull(),
	fechaEdicion: int(),
	idUsuario: int()
		.notNull()
		.references(() => users.id),
	idTema: int()
		.notNull()
		.references(() => temas.id)
});

export const articulosRelacion = relations(articulos, ({ one }) => ({
  usuario: one(users, {
    fields: [articulos.idUsuario],
    references: [users.id]
  }),
  tema: one(temas, {
    fields: [articulos.idTema],
    references: [temas.id]

  })
}));

export const deportes = sqliteTable('deportes', {
	id: int().primaryKey({ autoIncrement: true }),
	nombreDeporte: text().notNull()
});

export const relationDeportes = relations(deportes, ({ many }) => ({
	torneos: many(torneos),
}));

export const torneos = sqliteTable('torneos', {
	id: int().primaryKey({ autoIncrement: true }),
	nombreTorneo: text().notNull(),
	fechaInicio: int().notNull(),
	fechaFin: int().notNull(),
	idDeporte: int()
		.notNull()
		.references(() => deportes.id)
});

export const relationTorneos = relations(torneos, ({ one, many }) => ({
	deporte: one(deportes, {
		fields: [torneos.idDeporte],
		references: [deportes.id]
	}),

	inscripciones: many(inscripciones)
}));

export const inscripciones = sqliteTable('inscripciones', {
	id: int().primaryKey({ autoIncrement: true }),
	idTorneo: int()
		.notNull()
		.references(() => torneos.id),
	idUsuario: int()
		.notNull()
		.references(() => users.id),
	fechaInscripcion: int().default(Date.now() * 1000)
});

export const relationInscripciones = relations(inscripciones, ({ one }) => ({
	torneos: one(torneos, {
		fields: [inscripciones.idTorneo],
		references: [torneos.id]
	}),
	usuarios: one(users, {
		fields: [inscripciones.idUsuario],
		references: [users.id]
	})
}));

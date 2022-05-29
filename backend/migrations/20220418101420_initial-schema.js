export const up = async (knex) => {

  await knex.schema.createTable("roles", (table) => {
    table.increments("id")
    table.text("name").notNullable().unique()
  })

  await knex.schema.createTable("users", (table) => {
    table.increments("id")
    table.text("nickName").notNullable().unique()
    table.text("email").notNullable().unique()
    table.text("passwordHash").notNullable()
    table.text("passwordSalt").notNullable()
    table.integer("roleId").notNullable()
    table.foreign("roleId").references("id").inTable("roles").onDelete("SET NULL")
  })

  await knex.schema.createTable("posts", (table) => {
    table.increments("id")
    table.text("title").notNullable()
    table.text("content").notNullable()
    table.timestamp("publicationDate").defaultTo(knex.fn.now())
    table.boolean("isPublished").notNullable()
    table.integer("userId").notNullable()
    table.foreign("userId").references("id").inTable("users").onDelete("SET NULL")
  })

  await knex.schema.createTable("comments", (table) => {
    table.increments("id")
    table.text("content").notNullable()
    table.timestamp("date").defaultTo(knex.fn.now())
    table.integer("userId").notNullable()
    table.foreign("userId").references("id").inTable("users").onDelete("SET NULL")
    table.integer("postId").notNullable()
    table.foreign("postId").references("id").inTable("posts").onDelete("SET NULL")
  })
}

export const down = async (knex) => {
  await knex.schema.dropTable("users")
}
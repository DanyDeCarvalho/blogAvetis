export const up = async (knex) => {

  await knex('roles').insert([{name: "author"}, {name: "reader"}, {name: "admin"}])
}

export const down = async (knex) => {
  await knex('roles').where().del()
}

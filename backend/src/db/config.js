import "dotenv/config"
import * as yup from "yup"
import chalk from "chalk"

const portValidator = yup.number().integer().min(80).max(65535)

const schema = yup.object().shape({
  port: portValidator.required(),
  db: yup.object()
    .shape({
      client: yup.string().oneOf(["pg", "mysql", "mysql2"]).required(),
      connection: yup
        .object()
        .shape({
          database: yup.string().required(),
          user: yup.string().required(),
          password: yup.string(),
          host: yup.string(),
          port: portValidator,
        })
        .required(),
    })
    .required(),
})

const rawconfig = {
  port: process.env.PORT,
  db: {
    client: process.env.DB_CLIENT,
    connection: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    },
  },
}

try {
  schema.validateSync(rawconfig)
} catch (err) {
  console.error(err)
  throw new Error(`${chalk.red("ValidationError")}: ${err.message}`)
}


const config = schema.cast(rawconfig)


export default config
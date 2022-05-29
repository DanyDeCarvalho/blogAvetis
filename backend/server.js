import express from "express"
import cors from "cors"
import pino from "pino"
import config from "./src/db/config.js"
import { Model } from "objection"
import sessionRoutes from "./src/routes/session.js"
import postRoutes from "./src/routes/postRoutes.js"
import commentRoutes from "./src/routes/commentRoutes.js"
import knex from "knex"

const logger = pino({
  transport: {
    target: "pino-pretty",
    options: { colorize: true },
  },
})
const app = express()
const db = knex(config.db)
app.use(express.json())
sessionRoutes({ app })
postRoutes({ app })
commentRoutes({ app })

Model.knex(db)

app.use(
  cors({
    origin: process.env.WEB_APP_ORIGIN,
}))

app.listen(config.port, () => console.log(`listenning on :${config.port}`));
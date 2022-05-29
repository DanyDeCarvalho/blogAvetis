import UserModel from "../db/models/User.js"
import hashPassorwd from "../hashPassword.js"
import jsonwebtoken from "jsonwebtoken"
import auth from "../midleware/auth.js"

const sessionRoutes = ({ app }) => {
  app.post("/sign-up", async (req, res) => {
    const {
      body: { nickName, email, password, roleId},
    } = req

    const user = await UserModel.query().findOne({ email })

    if (user) {
      res.send({ status: "utilisateur entegistre" })
      return
    }

    const [hash, salt] = hashPassorwd(password)

    await UserModel.query().insert({
      nickName,
      email,
      passwordHash: hash,
      passwordSalt: salt,
      roleId : 2,
    })
    res.send({ status: "ok" })
  })

  app.post("/sign-in", async (req, res) => {
    console.log(req.body)
    const {
      body: { email, password },
    } = req
    const user = await UserModel.query().findOne({ email })

    if (!user) {
      res.status(401).send("mail ou password pas bon")
      return
    }
    const [passwordHash] = hashPassorwd(password, user.passwordSalt)

    if (passwordHash != user.passwordHash) {
      res.status(401).send("mdp pas bon")
      return
    }

    const jwt = jsonwebtoken.sign(
      { payload: { email: user.email, id: user.id } },
      process.env.JWT_SECRET,
      { expiresIn: "2 days" }
    )

    res.send({ token: jwt })
  })

  app.get("/users/:userId", auth, async (req, res) => {
    const {
      params: { userId },
    } = req

    const { passwordHash, passwordSalt, ...user } =
      await UserModel.query().findById(userId)
    if (!user) {
      res.send({ status: "aucun user avec cet id" })
      return
    }

    res.send(user)
  })
}

export default sessionRoutes

import jsonwebtoken from "jsonwebtoken"
import UserModel from "../db/models/User.js"

const auth = async (req, res, next) => {
  const {
    headers: { token },
  } = req

  const {
    payload: { email },
  } = jsonwebtoken.verify(token, process.env.JWT_SECRET)

  const user = await UserModel.query().findOne(email)

  if (!user) {
    return res.status(401).send("pas bon")
    
  }
  return res.send("nickel !")
  next()
}
export default auth

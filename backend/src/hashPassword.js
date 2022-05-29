import { pbkdf2, pbkdf2Sync, randomBytes } from "crypto"

const hashPassorwd = (password, salt = randomBytes(23).toString("hex")) => [
  pbkdf2Sync(password, salt, 1000, 126, "sha512").toString("hex"),
  salt,
]

export default hashPassorwd

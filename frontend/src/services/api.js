const { default: axios } = require("axios")

let jwt = null

const getJWT = () => {
  jwt = jwt ?? localStorage.getItem("jwt")

  return jwt
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  transformRequest: [
    (data, headers) => {
      headers.authentication = getJWT()

      return JSON.stringify(data)
   },
  ],
})

export default api
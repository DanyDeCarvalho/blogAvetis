import { Field, Formik } from "formik"
import { useCallback, useContext } from "react"
import AppContext from "../src/components/AppContext"

const IndexPage = () => {
const {signIn} = useContext(AppContext)

  const handleFormSubit = useCallback(
    async({ email, password }) => { 
      return signIn(email, password)
  },
  [signIn]
)
  
  return (
    <div>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={handleFormSubit}
      >
        {({ handleFormSubmit, isSubmitting, isValid }) => (
          <form onSubmit={handleFormSubmit}>
            <Field type="email" name="email" placeholder="E-mail" />
            <Field type="password" name="password" placeholder="Password" />
            <button disabled={!isSubmitting && !isValid}>Sign in</button>
          </form>
        )
        }
      </Formik>
    </div>
  ) 
}
export default IndexPage

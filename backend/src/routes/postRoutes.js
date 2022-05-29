import PostModel from "../db/models/Post.js"
import auth from "../midleware/auth.js"

const postRoutes = ({ app }) => {

  app.get("/posts/:postId", async (req, res) => {
    const {
      params: { postId },
    } = req

    const { title, content, state, ...posts } =
      await PostModel.query().findById(postId)
    console.log(req);
    if (!posts) {
      res.send({ status: "Post non trouve" })
      return
    }
    res.send(posts)
  })

  app.get("/users/:userId/posts", async (req, res) => {
    const {
      params: { userId },
    } = req

    const { title, content, state, ...posts } =
      await PostModel.query().where({ userId: userId })
    if (!posts) {
      res.send({ status: "L'utilisateur n'a pas de posts" })
      return
    }
    res.send(posts)
  })

  app.delete("/posts/delete/:postId", async (req, res) => {
    const {
      params: { postId },
    } = req

    const post =
      await PostModel.query().findById(postId)
    
    if (!post) {
      res.send({ status: "Post non trouvé" })
      return
    }
    await PostModel.query().delete().where({ id: postId })
    
    res.send({status: "post deleted"})
  })

  app.put("/posts/updateTitle/:postId", async (req, res) => {
    const {
      params: { postId },
      body: {title, content},
    } = req

    const post =
      await PostModel.query().findById(postId)
    
    if (!post) {
      res.send({ status: "Post non trouvé" })
      return
    }
    await PostModel.query().where({ id: postId }).update({ title, content }),

    res.send({status: "post title updated"})
  })
}

export default postRoutes

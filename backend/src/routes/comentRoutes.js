import CommentModel from "../db/models/Comment.js"
import auth from "../midleware/auth.js"

const commentRoutes = ({ app }) => {

  app.get("/comments/:commentId", async (req, res) => {
    const {
      params: { commentId },
    } = req

    const { content, date, ...comments } =
      await CommentModel.query().findById(commentId)
    console.log(req);
    if (!comments) {
      res.send({ status: "commentaire non trouve" })
      return
    }
    res.send(comments)
  })

  app.get("/users/:userId/comments", async (req, res) => {
    const {
      params: { userId },
    } = req

    const { content, date, ...comments } =
      await CommentModel.query().where({ userId: userId })
    if (!comments) {
      res.send({ status: "L'utilisateur n'a pas de commentaires" })
      return
    }
    res.send(comments)
  })

  app.delete("/comments/delete/:commentId", async (req, res) => {
    const {
      params: { commentId },
    } = req

    const comment =
      await CommentModel.query().findById(commentId)
    
    if (!comment) {
      res.send({ status: "commentaire non trouvé" })
      return
    }
    await CommentModel.query().delete().where({ id: commentId })
    
    res.send({status: "commentaire deleted"})
  })

  app.put("/comments/updateComment/:commentId", async (req, res) => {
    const {
      params: { commentId },
      body: { content },
    } = req

    const comment =
      await CommentModel.query().findById(commentId)
    
    if (!comment) {
      res.send({ status: "commentaire non trouvé" })
      return
    }
    await CommentModel.query().where({ id: commentId }).update({ content }),

    res.send({status: "comment updated"})
  })

}

export default commentRoutes

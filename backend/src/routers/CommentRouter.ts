
import express, { Response, Request } from 'express';
import { createQueryBuilder, getConnectionManager, Like } from 'typeorm';
import Comment from '../database/entities/Comment'
import Options from '../database/dbconnector';
import { createConnection } from 'typeorm';

const router = express.Router();
const connectionManager = getConnectionManager();

router.get('/', async (req: Request, res: Response) => {
  if (!connectionManager.has('default')) {
    const connection = await createConnection(Options);
  } const userId = req.query.userId;
  const storyId = req.query.storyId;
  if (userId) {
    const searchedComment = await Comment.find({ where: { userId: userId } })
    res.send(searchedComment)
  }
  else if (storyId) {
    const searchedComment = await Comment.find({ where: { storyId: storyId } })
    res.send(searchedComment)
  }
  else {
    const searchedComment = await Comment.find()
    res.send(searchedComment)
  }
  // await connection.close();
})

router.post('/create', async (req: Request, res: Response) => {
  if (!connectionManager.has('default')) {
    const connection = await createConnection(Options);
  } const body = req.body;
  // const userId = body.userId;
  // const storyId = body.storyId;
  const comment = body as Comment;
  const newComment = Comment.create(comment)
  await newComment.save();
  res.send('Commented')
  // await connection.close();
});

export {
  router as CommentRouter
};

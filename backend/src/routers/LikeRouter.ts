
import express, { Response, Request } from 'express';
import { createQueryBuilder, getConnectionManager, Like } from 'typeorm';
import LikeEntity from '../database/entities/LikeEntity'
import Story from '../database/entities/Story'
import Options from '../database/dbconnector';
import { createConnection } from 'typeorm';

const router = express.Router();
const connectionManager = getConnectionManager();

router.post('/click', async (req: Request, res: Response) => {
  if (!connectionManager.has('default')) {
    const connection = await createConnection(Options);
  }
  const body = req.body;
  const likedStoryId = body.likedStoryId;
  const userId = body.userId;
  const searchLike = await LikeEntity.findOne({ where: { userId: userId, likedStoryId: likedStoryId } })
  const storyLikes = await Story.find({ where: { id: likedStoryId }, select: ['likes'] });
  let newLikes: number;
  if (searchLike) {
    //좋아요가 존재. 좋아요를 취소해야함
    await createQueryBuilder(LikeEntity)
      .delete()
      .where({ userId: userId, likedStoryId: likedStoryId })
      .execute();
    newLikes = storyLikes[0].likes - 1;
    await createQueryBuilder(Story)
      .update()
      .set({ likes: newLikes })
      .where({ id: likedStoryId })
      .execute();
    res.send('cancle like')
  }
  else {
    //좋아요가 없음. 지금 좋아요 누름.
    const like = body as LikeEntity;
    const newLike = LikeEntity.create(like)
    await newLike.save();
    newLikes = storyLikes[0].likes + 1;
    await createQueryBuilder(Story)
      .update()
      .set({ likes: newLikes })
      .where({ id: likedStoryId })
      .execute();
    res.send('new like')
  }
  // await connection.close();
});

router.get('/', async (req: Request, res: Response) => {
  if (!connectionManager.has('default')) {
    const connection = await createConnection(Options);
  }
  const userId = req.query.userId;
  const storyId = req.query.storyId;
  if (userId) {
    const searchedLike = await LikeEntity.find({ where: { userId: userId } })
    res.send(searchedLike)
  }
  else if (storyId) {
    const searchedLike = await LikeEntity.find({ where: { likedStoryId: storyId } })
    res.send(searchedLike)
  }
  else {
    const searchedLike = await LikeEntity.find()
    res.send(searchedLike)
  }
  // await connection.close();
})

router.get('/cnt', async (req: Request, res: Response) => {
  if (!connectionManager.has('default')) {
    const connection = await createConnection(Options);
  }
  const userId = req.query.userId;
  const storyId = req.query.storyId;
  if (userId) {
    const searchedLike = await LikeEntity.findAndCount({ where: { userId: userId } })
    res.send(searchedLike[1].toString())
  }
  else if (storyId) {
    const searchedLike = await LikeEntity.findAndCount({ where: { likedStoryId: storyId } })
    res.send(searchedLike[1].toString())
  }
  else {
    const searchedLike = await LikeEntity.findAndCount()
    res.send(searchedLike[1].toString())
  }
  // await connection.close();
})

router.get('/story', async (req: Request, res: Response) => {
  if (!connectionManager.has('default')) {
    const connection = await createConnection(Options);
  }
  const userId = req.query.userId;
  const searchedStory = await createQueryBuilder(Story, 'story')
    .innerJoin(LikeEntity, 'le', 'story.id = le.likedStoryId')
    .where("le.userId = :userId", { userId: userId })
    .getRawMany()
  res.send(searchedStory)
  // await connection.close();
})

export {
  router as LikeRouter
};

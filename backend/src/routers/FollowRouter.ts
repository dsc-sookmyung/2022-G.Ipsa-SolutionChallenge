
import express, { Response, Request } from 'express';
import { createQueryBuilder, getConnectionManager, Like } from 'typeorm';
import Follow from '../database/entities/Follow'
import Options from '../database/dbconnector';
import { createConnection } from 'typeorm';
import UserInfo from '../database/entities/UserInfo';

const router = express.Router();
const connectionManager = getConnectionManager();

router.get('/', async (req: Request, res: Response) => {
  if (!connectionManager.has('default')) {
    const connection = await createConnection(Options);
  } const followerId = req.query.followerId;
  const creatorId = req.query.creatorId;
  if (followerId) {
    //이 유저가 팔로잉하는 크리에이터들 리턴
    const searchedCreator = await createQueryBuilder()
      .from(Follow, 'fl')
      .leftJoin(UserInfo, 'ui', 'ui.uid = fl.creatorId')
      .where('fl.followerId = :followerId', { followerId: followerId })
      .getRawMany()
    res.send(searchedCreator)
  }
  else if (creatorId) {
    //이 유저를 팔로우하는 팔로워들 리턴
    const searchedFollow = await createQueryBuilder()
      .from(Follow, 'fl')
      .leftJoin(UserInfo, 'ui', 'ui.uid = fl.followerId')
      .where('fl.creatorId = :creatorId', { creatorId: creatorId })
      .getRawMany()
    res.send(searchedFollow)
  }
  else {
    const searchedFollow = await Follow.find()
    res.send(searchedFollow)
  }
  // await connection.close();

})

router.get('/cnt', async (req: Request, res: Response) => {
  if (!connectionManager.has('default')) {
    const connection = await createConnection(Options);
  }
  const followerId = req.query.followerId;
  const creatorId = req.query.creatorId;
  if (followerId) {
    //이 유저가 팔로잉하는 크리에이터들 리턴
    const searchedCreator = await createQueryBuilder()
      .from(Follow, 'fl')
      .leftJoin(UserInfo, 'ui', 'ui.uid = fl.creatorId')
      .where('fl.followerId = :followerId', { followerId: followerId })
      .getCount()
    res.send(searchedCreator.toString())
  }
  else if (creatorId) {
    //이 유저를 팔로우하는 팔로워들 리턴
    const searchedFollow = await createQueryBuilder()
      .from(Follow, 'fl')
      .leftJoin(UserInfo, 'ui', 'ui.uid = fl.followerId')
      .where('fl.creatorId = :creatorId', { creatorId: creatorId })
      .getCount()
    res.send(searchedFollow.toString())
  }
  else {
    const searchedFollow = await Follow.findAndCount()
    res.send(searchedFollow[1].toString())
  }
  // await connection.close();

})


router.post('/click', async (req: Request, res: Response) => {
  if (!connectionManager.has('default')) {
    const connection = await createConnection(Options);
  }
  const body = req.body;
  const followerId = body.followerId;
  const creatorId = body.creatorId;
  const searchFollow = await Follow.findOne({ where: { followerId: followerId, creatorId: creatorId } })
  if (searchFollow) {
    //팔로잉 상태. 언팔
    await createQueryBuilder()
      .from(Follow, 'fl')
      .delete()
      .where({ followerId: followerId, creatorId: creatorId })
      .execute();
    res.send('Unfollowed')
  }
  else {
    //팔로 안되어있음. 팔로잉 시작.
    const follow = body as Follow;
    const newFollow = Follow.create(follow)
    await newFollow.save();
    res.send('Following')
  }
  // await connection.close();
});

export {
  router as FollowRouter
};

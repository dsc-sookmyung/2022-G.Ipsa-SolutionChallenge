
import express, { Response, Request } from 'express';
import { createQueryBuilder, Like } from 'typeorm';
import Follow from '../database/entities/Follow'
import Options from '../database/dbconnector';
import {createConnection} from 'typeorm';

const router = express.Router();

router.get('/', async (req: Request, res:Response)=>{
  const connection = await createConnection(Options);

    const followerId = req.query.followerId;
    const creatorId = req.query.creatorId;
    if (followerId){
        const searchedFollow = await Follow.find({where: {followerId: followerId}})
        res.send(searchedFollow)
    }
    else if (creatorId){
        const searchedFollow = await Follow.find({where: {creatorId: creatorId}})
        res.send(searchedFollow)
    }
    else{
        const searchedFollow = await Follow.find()
        res.send(searchedFollow)
    }
  await connection.close();

})

router.post('/click', async (req: Request, res:Response)=>{
  const connection = await createConnection(Options);

    const body = req.body;
    const followerId = body.followerId;
    const creatorId = body.creatorId;
    const searchFollow = await Follow.findOne({where:{followerId:followerId, creatorId:creatorId}})
    if (searchFollow){
        //팔로잉 상태. 언팔
        await createQueryBuilder()
        .delete()
        .from(Follow)
        .where({followerId:followerId, creatorId:creatorId})
        .execute();
        res.send('Unfollowed')
    }
    else{
        //팔로 안되어있음. 팔로잉 시작.
        const follow = body as Follow;
        const newFollow = Follow.create(follow)
        await newFollow.save();
        res.send('Following')
    }
    await connection.close();

    
});

export {
    router as FollowRouter};

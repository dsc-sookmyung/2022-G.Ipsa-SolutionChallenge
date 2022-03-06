
import express, { Response, Request } from 'express';
import { createQueryBuilder, Like } from 'typeorm';
import Follow from '../database/entities/Follow'


const router = express.Router();

router.get('/', async (req: Request, res:Response)=>{
    const followerId = req.query.followerId;
    const followingUserId = req.query.followingUserId;
    if (followerId){
        const searchedFollow = await Follow.find({where: {followerId: followerId}})
        res.send(searchedFollow)
    }
    else if (followingUserId){
        const searchedFollow = await Follow.find({where: {followingUserId: followingUserId}})
        res.send(searchedFollow)
    }
    else{
        const searchedFollow = await Follow.find()
        res.send(searchedFollow)
    }
})

router.post('/click', async (req: Request, res:Response)=>{
    const body = req.body;
    const followerId = body.followerId;
    const followingUserId = body.followingUserId;
    const searchFollow = await Follow.find({where:{followerId:followerId, followingUserId:followingUserId}})
    if (searchFollow){
        //팔로잉 상태. 언팔
        await createQueryBuilder()
        .delete()
        .from(Follow)
        .where({followerId:followerId, followingUserId:followingUserId})
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

    
});

export {
    router as FollowRouter};

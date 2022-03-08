
import express, { Response, Request } from 'express';
import { createQueryBuilder, Like } from 'typeorm';
import LikeEntity from '../database/entities/LikeEntity'
import Story from '../database/entities/Story'


const router = express.Router();

router.post('/click', async (req: Request, res:Response)=>{
    const body = req.body;
    const likedStoryId = body.likedStoryId;
    const userId = body.userId;
    const searchLike = await LikeEntity.findOne({where:{userId:userId, likedStoryId:likedStoryId}})
    const storyLikes = await Story.find({where:{id:likedStoryId}, select:['likes']});
    let newLikes: number;
    if (searchLike){
        //좋아요가 존재. 좋아요를 취소해야함
        
        await createQueryBuilder()
        .delete()
        .from(LikeEntity)
        .where({userId: userId, likedStoryId: likedStoryId})
        .execute();

        newLikes = storyLikes[0].likes - 1;
        await createQueryBuilder()
        .update(Story)
        .set({ likes: newLikes})
        .where({id :likedStoryId})
        .execute();
        res.send('cancle like')
    }
    else{
        //좋아요가 없음. 지금 좋아요 누름.

        const like = body as LikeEntity;
        const newLike = LikeEntity.create(like)
        await newLike.save();
    
        newLikes = storyLikes[0].likes + 1;
        await createQueryBuilder()
        .update(Story)
        .set({ likes: newLikes})
        .where({id :likedStoryId})
        .execute();
        res.send('new like')
    }

    
});

router.get('/', async (req: Request, res:Response)=>{
    const userId = req.query.userId;
    if (userId){
        const searchedLike = await LikeEntity.find({where: {userId: userId}})
        res.send(searchedLike)
    }
    else{
        const searchedLike = await LikeEntity.find()
        res.send(searchedLike)
    }
})

export {
    router as LikeRouter};

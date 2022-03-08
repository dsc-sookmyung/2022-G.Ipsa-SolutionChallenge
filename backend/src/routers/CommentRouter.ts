
import express, { Response, Request } from 'express';
import { createQueryBuilder, Like } from 'typeorm';
import Comment from '../database/entities/Comment'


const router = express.Router();

router.get('/', async (req: Request, res:Response)=>{
    const userId = req.query.userId;
    const storyId = req.query.storyId;
    if (userId){
        const searchedComment = await Comment.find({where: {userId: userId}})
        res.send(searchedComment)
    }
    else if (storyId){
        const searchedComment = await Comment.find({where: {storyId: storyId}})
        res.send(searchedComment)
    }
    else{
        const searchedComment = await Comment.find()
        res.send(searchedComment)
    }
})

router.post('/create', async (req: Request, res:Response)=>{
    const body = req.body;
    // const userId = body.userId;
    // const storyId = body.storyId;
    
    const comment = body as Comment;
    const newComment = Comment.create(comment)
    await newComment.save();
    res.send('Commented')
});

export {
    router as CommentRouter};

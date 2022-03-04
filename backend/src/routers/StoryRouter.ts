
import express, { Response, Request } from 'express';
import { Like } from 'typeorm';
import Story from '../database/entities/Story'

const router = express.Router();

router.post('/create', async (req: Request, res:Response)=>{
    const story = req['body'] as Story;
    const newStory = Story.create(story)
    await newStory.save();
    res.send(newStory)

});

router.get('/', async (req: Request, res:Response)=>{
    const keyword = req.query.keyword;
    if (keyword){
        const searchedUser = await Story.find({title: Like(`%${keyword}%`)})
        res.send(searchedUser)
    }
    else{
        const searchedUser = await Story.find()
        res.send(searchedUser)
    }
})

export {
    router as StoryRouter};

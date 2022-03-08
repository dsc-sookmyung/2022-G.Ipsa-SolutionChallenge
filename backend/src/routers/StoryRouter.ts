
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

router.post('/click', async (req: Request, res:Response)=>{
    const id = req.query.id;
    const clickedStory = await Story.findOne({where:{id: id}})
    res.send(clickedStory)

});

router.get('/', async (req: Request, res:Response)=>{
    const keyword = req.query.keyword;
    if (keyword){
        const searchedStory = await Story.find({title: Like(`%${keyword}%`)})
        res.send(searchedStory)
    }
    else{
        const searchedStory = await Story.find()
        res.send(searchedStory)
    }
})

export {
    router as StoryRouter};

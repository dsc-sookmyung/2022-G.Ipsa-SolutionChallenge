
import express, { Response, Request } from 'express';
import { Like } from 'typeorm';
import Story from '../database/entities/Story'
import multer from 'multer';
import { UploadImage } from '../config/UploadImage';
import Options from '../database/dbconnector';
import {createConnection} from 'typeorm';


const router = express.Router();
// const uploadImage : new UploadImage;
const multerMid = multer({
    storage: multer.memoryStorage(),
      limits: {
        fileSize: 5 * 1024 * 1024,
      },
  });
router.use(multerMid.single('file'))

router.post('/create', multerMid.single('file'), async (req: Request, res:Response)=>{
  const connection = await createConnection(Options);
  const body = req['body']
  const audioFileUri = body.audioFileSrc;
  const thumbnailImageUri = body.thumbnailImageSrc;

  const audioUrl = await UploadImage.uploadAudio(audioFileUri)
  const imageUrl = await UploadImage.uploadImage(thumbnailImageUri)
  console.log(imageUrl);
  
  body.audioFileSrc = audioUrl;
  body.thumbnailImageSrc = imageUrl;
  
  const story = body as Story;
  const newStory = Story.create(story)
  await newStory.save();
  res.send(newStory)
  await connection.close();

});

router.get('/click', async (req: Request, res:Response)=>{
  const connection = await createConnection(Options);
  const id = req.query.id;
  const clickedStory = await Story.findOne({where:{id: id}})
  res.send(clickedStory)
  await connection.close();

});

router.get('/', async (req: Request, res:Response)=>{
  const connection = await createConnection(Options);
  const keyword = req.query.keyword;
  const creatorId = req.query.creatorId;

  if (keyword){
      const searchedStory = await Story.find({title: Like(`%${keyword}%`)})
      res.send(searchedStory)
  }
  else if (creatorId){
    const searchedStory = await Story.find({where: {creatorId: creatorId}})
    res.send(searchedStory)
  }
  else{
      const searchedStory = await Story.find()
      res.send(searchedStory)
  }
  await connection.close();
  
})

router.get('/cnt', async (req: Request, res:Response)=>{
  const connection = await createConnection(Options);
  const keyword = req.query.keyword;
  const creatorId = req.query.creatorId;

  if (keyword){
      const searchedStory = await Story.findAndCount({title: Like(`%${keyword}%`)})
      res.send(searchedStory[1].toString())
  }
  else if (creatorId){
    const searchedStory = await Story.findAndCount({where: {creatorId: creatorId}})
    res.send(searchedStory[1].toString())
  }
  else{
      const searchedStory = await Story.findAndCount()
      res.send(searchedStory[1].toString())
  }
  await connection.close();
  
})


export {
    router as StoryRouter};

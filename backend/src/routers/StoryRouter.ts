
import express, { Response, Request } from 'express';
import { getConnectionManager, Like } from 'typeorm';
import Story from '../database/entities/Story'
import multer from 'multer';
import { FileUpload } from '../config/FileUpload';
import Options from '../database/dbconnector';
import { createConnection } from 'typeorm';

const router = express.Router();
const connectionManager = getConnectionManager();
const multerMid = multer({
  storage: multer.memoryStorage(),
  // limits: {
  //   fieldSize: 10 * 1024 * 1024,
  // },
});

router.post('/create', async (req: Request, res: Response) => {
  if (!connectionManager.has('default')) {
    const connection = await createConnection(Options);
  }
  const body = req['body']
  const story = body as Story;
  const newStory = Story.create(story)
  await newStory.save();
  res.send(newStory)
  // await connection.close();
});

function getPublicUrl(filename: string) {
  return 'https://storage.googleapis.com/' + 'gipsa-upload/' + filename;
}

router.post('/imageUpload', multerMid.single('image'), (req: Request, res: Response) => {
  FileUpload.uploadThumbnail(req)
  const imageUrl = getPublicUrl(req.file?.originalname!)
  console.log(imageUrl)
  res.send({ url: imageUrl });
})

router.post('/audioUpload', multerMid.single('audio'), (req: Request, res: Response) => {
  FileUpload.uploadAudio(req)
  const audioUrl = getPublicUrl(req.file?.originalname!)
  console.log(audioUrl)
  res.send({ url: audioUrl });
})

router.get('/click', async (req: Request, res: Response) => {
  if (!connectionManager.has('default')) {
    const connection = await createConnection(Options);
  }
  const id = req.query.id;
  const clickedStory = await Story.findOne({ where: { id: id } })
  res.send(clickedStory)
  // await connection.close();
});

router.post('/click', async (req: Request, res: Response) => {
  if (!connectionManager.has('default')) {
    const connection = await createConnection(Options);
  }
  const id = req.query.id;
  const clickedStory = await Story.findOne({ where: { id: id } })
  res.send(clickedStory)
  // await connection.close();
});

router.get('/', async (req: Request, res: Response) => {
  if (!connectionManager.has('default')) {
    const connection = await createConnection(Options);
  }
  const keyword = req.query.keyword;
  const creatorId = req.query.creatorId;
  if (keyword) {
    const searchedStory = await Story.find({ title: Like(`%${keyword}%`) })
    res.send(searchedStory)
  }
  else if (creatorId) {
    const searchedStory = await Story.find({ where: { creatorId: creatorId } })
    res.send(searchedStory)
  }
  else {
    const searchedStory = await Story.find()
    res.send(searchedStory)
  }
  // await connection.close();
})

router.get('/cnt', async (req: Request, res: Response) => {
  if (!connectionManager.has('default')) {
    const connection = await createConnection(Options);
  }
  const keyword = req.query.keyword;
  const creatorId = req.query.creatorId;
  if (keyword) {
    const searchedStory = await Story.findAndCount({ title: Like(`%${keyword}%`) })
    res.send(searchedStory[1].toString())
  }
  else if (creatorId) {
    const searchedStory = await Story.findAndCount({ where: { creatorId: creatorId } })
    res.send(searchedStory[1].toString())
  }
  else {
    const searchedStory = await Story.findAndCount()
    res.send(searchedStory[1].toString())
  }
  // await connection.close();
})

export {
  router as StoryRouter
};

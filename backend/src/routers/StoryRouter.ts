
import express, { Response, Request } from 'express';
import { createQueryBuilder, getConnectionManager, Like } from 'typeorm';
import Story from '../database/entities/Story'
import multer from 'multer';
import { FileUpload } from '../config/FileUpload';
import Options from '../database/dbconnector';
import { createConnection } from 'typeorm';
import UserInfo from '../database/entities/UserInfo';
import LikeEntity from '../database/entities/LikeEntity';

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
  const imageUrl = getPublicUrl('storyImageSrc/' + req.file?.originalname!)
  console.log(imageUrl)
  res.send({ url: imageUrl });
})

router.post('/audioUpload', multerMid.single('audio'), (req: Request, res: Response) => {
  FileUpload.uploadAudio(req)
  const audioUrl = getPublicUrl('storyAudioSrc/' + req.file?.originalname!)
  console.log(audioUrl)
  res.send({ url: audioUrl });
})

router.get('/click', async (req: Request, res: Response) => {
  if (!connectionManager.has('default')) {
    const connection = await createConnection(Options);
  }
  const id = req.query.id;
  const clickedStory = await await createQueryBuilder()
    .from(Story, 'st')
    .leftJoin(UserInfo, 'ui', 'ui.id = st.creatorId')
    .where('id = :id', { id: id })
    .getRawOne()
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
    const searchedStory = await createQueryBuilder()
      .select('*')
      .addSelect(['st.id as id'])
      .from(Story, 'st')
      .leftJoin(UserInfo, 'ui', 'ui.id = st.creatorId')
      .where('st.title ilike :key', { key: `%${keyword}%` })
      .getRawMany()
    res.send(searchedStory)
  }
  else if (creatorId) {
    const searchedStory = await createQueryBuilder()
      .select('*')
      .addSelect(['st.id as id'])
      .from(Story, 'st')
      .leftJoin(UserInfo, 'ui', "ui.id = st.creatorId")
      .where("st.creatorId = :creatorId", { creatorId: creatorId })
      .getRawMany()
    res.send(searchedStory)
  }
  else {
    const searchedStory = await createQueryBuilder()
      .select('*')
      .addSelect(['st.id as id'])
      .from(Story, 'st')
      .leftJoin(UserInfo, 'ui', 'st.creatorId= ui.id')
      .getRawMany()
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

router.delete('/delete', async (req: Request, res: Response) => {
  if (!connectionManager.has('default')) {
    const connection = await createConnection(Options);
  }
  const id = req.query.id;
  await createQueryBuilder()
    .from(Story, 'st')
    .delete()
    .where('id = :id', { id: id })
    .execute();
  await createQueryBuilder()
    .from(LikeEntity, 'le')
    .delete()
    .where('likedStoryId = :id', { id: id })
    .execute();
  res.send('deleted')
  // await connection.close();
});

export {
  router as StoryRouter
};

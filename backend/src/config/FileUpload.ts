import { Storage } from './Storage'
import { Response, Request } from 'express';

const bucketName = 'gipsa-upload'
const bucket = Storage.bucket(bucketName);
let FileUpload: any = {};

FileUpload.uploadThumbnail = (req: Request, res: Response) => {
  try {
    const gcsname = req.file?.originalname;
    console.log('image_originalname:' + gcsname)
    const file = bucket.file('storyImageSrc/' + gcsname!);
    const stream = file.createWriteStream({
      metadata: {
        // contentType: req.file?.mimetype
        // contentType: 'image/jpg'
        resumable: false
      }
    });

    stream.on('error', (err) => {
      console.log(err.message);
      console.log('error')
    });

    stream.on('finish', () => {
      console.log('image upload done')
    });

    stream.end(req.file?.buffer);
  } catch (error) {
    console.log(error)
  }
}

FileUpload.uploadAudio = (req: Request, res: Response) => {
  try {
    const gcsname = req.file?.originalname;
    console.log(' audio_originalname:' + gcsname)
    const file = bucket.file('storyAudioSrc/' + gcsname!);
    const stream = file.createWriteStream({
      metadata: {
        // contentType: req.file?.mimetype
        // contentType: 'audio/mp3'
        resumable: false
      }
    });

    stream.on('error', (err) => {
      console.log(err.message);
      console.log('error')
    });

    stream.on('finish', () => {
      console.log('audio upload done')

    });

    stream.end(req.file?.buffer);
  } catch (error) {
    console.log(error)
  }
}

export { FileUpload as FileUpload };
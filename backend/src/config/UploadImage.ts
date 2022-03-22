import { NextFunction } from 'express';
import { format } from 'util';
import {Storage} from './Storage'

// export const uploadImage = (file: { originalname: any; buffer: any; }) => new Promise((resolve, reject) => {
//   const { originalname, buffer } = file

//   const blob = bucket.file(originalname.replace(/ /g, "_"))
//   const blobStream = blob.createWriteStream({
//     resumable: false
//   })
//   blobStream.on('finish', () => {
//     const publicUrl = format(
//       `https://storage.googleapis.com/${bucket.name}/${blob.name}`
//     )
//     resolve(publicUrl)
//   })
//   .on('error', () => {
//     reject(`Unable to upload image, something went wrong`)
//   })
//   .end(buffer)
// })



// // let ImgUpload = {};
// class ImgUpload{
//   private bucketName = 'gipsa-upload'
//   private bucket = Storage.bucket(this.bucketName);

//   private getPublicUrl(filename: string) {
//     return 'https://storage.googleapis.com/' + this.bucketName + '/' + filename;
//   }

//   public uploadToGcs = (req: any) => new Promise((resolve, reject) =>{
//   // Can optionally add a path to the gcsname below by concatenating it before the filename
//     const gcsname = req.file.originalname;
//     const file = this.bucket.file(gcsname);

//     const stream = file.createWriteStream({
//       metadata: {
//         contentType: req.file.mimetype
//       }
//     });

//     stream.on('error', (err) => {
//       req.file.cloudStorageError = err;
//     });

//     stream.on('finish', () => {
//       req.file.cloudStorageObject = gcsname;
//       req.file.cloudStoragePublicUrl = this.getPublicUrl(gcsname);
//     });

//     stream.end(req.file.buffer);

//      ;
//   })
// }

const bucketName = 'gipsa-upload'
const bucket = Storage.bucket(bucketName);

function getPublicUrl(foldername: string, filename: string) {
  return 'https://storage.googleapis.com/' + bucketName + foldername + filename;
}

let ImgUpload : any = {};

ImgUpload.uploadThumbnail = (req: string, res: any) => {
  // Can optionally add a path to the gcsname below by concatenating it before the filename
  // const gcsname = req.file.originalname;
  const file = bucket.file(req);

  const stream = file.createWriteStream({
    metadata: {
      // contentType: req.file.mimetype
      contentType: 'image/jpeg'

    }
  });

  stream.on('error', (err) => {
    res.send( err);
  });

  stream.on('finish', () => {
    // req.file.cloudStorageObject = gcsname;
    // req.file.cloudStoragePublicUrl = getPublicUrl(gcsname);
    res.send(getPublicUrl('/storySrc/', req));
  });

  stream.end();
}

ImgUpload.uploadAudio = (req: string, res: any) => {
  // Can optionally add a path to the gcsname below by concatenating it before the filename
  // const gcsname = req.file.originalname;
  const file = bucket.file(req);

  const stream = file.createWriteStream({
    metadata: {
      // contentType: req.file.mimetype
      contentType: 'audio/mpeg'

    }
  });

  stream.on('error', (err) => {
    res.send( err);
  });

  stream.on('finish', () => {
    // req.file.cloudStorageObject = gcsname;
    // req.file.cloudStoragePublicUrl = getPublicUrl(gcsname);
    res.send(getPublicUrl('/storySrc/', req));
  });

  stream.end();
}

export { ImgUpload as UploadImage};
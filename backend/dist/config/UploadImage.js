"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadImage = void 0;
const Storage_1 = require("./Storage");
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
const bucketName = 'gipsa-upload';
const bucket = Storage_1.Storage.bucket(bucketName);
function getPublicUrl(filename) {
    return 'https://storage.googleapis.com/' + bucketName + '/' + filename;
}
let ImgUpload = {};
exports.UploadImage = ImgUpload;
ImgUpload.uploadThumbnail = (req, res) => {
    // Can optionally add a path to the gcsname below by concatenating it before the filename
    // const gcsname = req.file.originalname;
    // var split = req.split('/');
    // const filename = 'storySrc/' + split[split.length - 1];
    const filename = req;
    console.log(filename);
    const file = bucket.file(filename);
    const stream = file.createWriteStream({
        metadata: {
            // contentType: req.file.mimetype
            contentType: 'image/jpeg'
        }
    });
    stream.on('error', (err) => {
        console.log(err.message);
        console.log('error');
        // return err.message
    });
    stream.on('finish', () => {
        // req.file.cloudStorageObject = gcsname;
        // req.file.cloudStoragePublicUrl = getPublicUrl(gcsname);
        console.log('finish');
    });
    stream.end();
    return getPublicUrl(filename);
};
ImgUpload.uploadAudio = (req, res) => {
    // Can optionally add a path to the gcsname below by concatenating it before the filename
    // const gcsname = req.file.originalname;
    // var split = req.split('/');
    // const filename = 'storySrc/' + split[split.length - 1];
    const filename = req;
    console.log(filename);
    const file = bucket.file(filename);
    const stream = file.createWriteStream({
        metadata: {
            // contentType: req.file.mimetype
            contentType: 'audio/mpeg'
        }
    });
    stream.on('error', (err) => {
        console.log(err.message);
        console.log('error');
    });
    stream.on('finish', () => {
        // req.file.cloudStorageObject = gcsname;
        // req.file.cloudStoragePublicUrl = getPublicUrl(gcsname);
        console.log('finish');
    });
    stream.end();
    return getPublicUrl(filename);
};

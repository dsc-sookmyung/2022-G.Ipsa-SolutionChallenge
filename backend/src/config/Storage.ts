import {Storage} from '@google-cloud/storage';
import path from 'path';

const gcs = new Storage({
  projectId: 'gipsa-solutionchallenge2022',
  keyFilename: path.join(__dirname, '../../build/gipsa-solutionchallenge2022-a8f20048ed9f.json')
});

export {gcs as Storage};
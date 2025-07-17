const https = require('https');
const fs = require('fs');
const path = require('path');

const modelsDir = path.join(__dirname, '..', 'public', 'models');

// Create models directory if it doesn't exist
if (!fs.existsSync(modelsDir)) {
  fs.mkdirSync(modelsDir, { recursive: true });
}

const models = [
  'tiny_face_detector_model-weights_manifest.json',
  'tiny_face_detector_model-shard1',
  'face_landmark_68_model-weights_manifest.json',
  'face_landmark_68_model-shard1',
  'face_expression_model-weights_manifest.json',
  'face_expression_model-shard1'
];

const baseUrl = 'https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights/';

async function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, response => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', err => {
      fs.unlink(dest);
      reject(err);
    });
  });
}

async function downloadModels() {
  console.log('Downloading face-api.js models...');
  
  for (const model of models) {
    const url = baseUrl + model;
    const dest = path.join(modelsDir, model);
    
    console.log(`Downloading ${model}...`);
    await downloadFile(url, dest);
    console.log(`Downloaded ${model}`);
  }
  
  console.log('All models downloaded successfully!');
}

downloadModels().catch(console.error);

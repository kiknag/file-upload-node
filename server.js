const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');
const app = express();

app.use(fileUpload());
app.set('view engine', 'pug');
app.use(express.static('public'));

app.post('/upload', (req, res) => {
  if(!req.files) {
    return res.status(400).send('No files were uploaded.')
  }

  //console.log(req.files);
  let sampleFile = req.files.sampleFile;
  let fileName = req.files.sampleFile.name.split(' ').join('_');
  console.log(fileName);
  sampleFile.mv(path.join(__dirname, '/uploads', fileName), err => {
    if(err) {
      return res.status(500).send(err);
    }

    res.send('File uploaded!📦');
  })
});

app.use((err, req, res, next) => {
  console.log('Woops error!');
  console.log(err);
  if(err) {
    res.status(500).send(err);
  }
});

app.listen(3000, () => console.log('Server is running on port 3000'));

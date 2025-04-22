const express = require('express');
const app = express();
const multer = require('multer');
const PORT = 5000



const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './images')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "--" + file.originalname)
    },
});
const upload = multer({ storage: fileStorageEngine });

app.post('/single', upload.single("image"), (req, res) => {
    console.log(req.file)
    res.send("single file upload successfull")
})

app.post('/multiple', upload.array('images', 4), (req, res) => {
    console.log(req.files)
    res.send("multiple file upload done successfully")
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})

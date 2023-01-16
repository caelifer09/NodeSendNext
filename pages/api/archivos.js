import nextConnect from 'next-connect';
import multer from 'multer';
import shortid from 'shortid';


const upload = multer({
    limits: {fileSize: 1024 * 1024 * 10},
    storage: multer.diskStorage({
            destination: './public/uploads',
            filename: (req, file, cb) => {
                const extension = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length)
                cb(null, `${shortid.generate()}${extension}`)
            }
    }),
});

const apiRoute = nextConnect({
  onError(error, req, res) {
    res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(upload.single('archivo'));

apiRoute.post((req, res) => {
  res.status(200).json({ archivo: req.file.filename });
});

apiRoute.get(async (req, res) => {
    console.log("hola get")
})

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};

export default apiRoute;
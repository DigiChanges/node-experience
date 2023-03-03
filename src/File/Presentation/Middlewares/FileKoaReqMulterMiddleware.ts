import multer from '@koa/multer';

const storage = multer.diskStorage(
    {
        destination: (req, file, cb) => cb(null, '/tmp'),
        filename: (req: any, file: any, cb: any) => cb(null, file.originalname)
    }
);

const FileKoaReqMulterMiddleware = multer({ storage });

export default FileKoaReqMulterMiddleware;

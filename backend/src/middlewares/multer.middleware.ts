import multer, { diskStorage } from "multer";
import { extname, join } from "node:path";
import { v4 as uuidv4 } from 'uuid';
import { cwd } from "node:process";

const storage = diskStorage({
    destination: function (req, file, cb) {
        cb(null, join(cwd(), '/uploads'))
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = uuidv4();
        cb(null, file.originalname + uniqueSuffix + extname(file.originalname))
    }
});

const upload = multer({ storage: storage });

export default upload;


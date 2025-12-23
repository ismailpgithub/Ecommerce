import multer from "multer";

const storage = multer.memoryStorage();

const uploadsFiles = multer({ storage }).array("files", 10);

export default uploadsFiles;

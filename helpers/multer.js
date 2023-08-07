const multer = require("multer");


const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === "input_image" || file.fieldname === "mask_image") {
            cb(null, "public/gpt");
        } else if (file.fieldname === "model_file") {
            cb(null, "public/model_file");
        } else if (file.fieldname === "service_image") {
            cb(null, "public/services");
        } else {
            cb(new Error("Invalid field name"), false);
        }
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split("/")[1];
        cb(null, `${file.fieldname}-${Date.now()}.${ext}`);
    },
});

const multerFilter = (req, file, cb) => {
    if (
        file.mimetype.startsWith("image/") || // Allow image files
        file.mimetype === "application/pdf" || // Allow PDF files
        file.mimetype === "application/msword" || // Allow DOC files
        file.mimetype === "text/csv"             // Allow CSV files
    ) {
        cb(null, true);
    } else {
        const unsupportedFileTypeError = new Error("Unsupported file type.");
        unsupportedFileTypeError.code = "LIMIT_UNSUPPORTED_FILE";
        cb(unsupportedFileTypeError, false);
    }
};


const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
});

module.exports = upload;

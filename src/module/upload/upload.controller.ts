import { Controller, Post, UploadedFile, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer"
import { extname, join } from "path";

@Controller("upload")
export class UploadController {
    @Post("single")
    @UseInterceptors(
        FileInterceptor("file", {
            storage: diskStorage({
                destination: join(process.cwd(), "uploads"),
                filename: (req, file, cb) => {
                    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
                    const ext = extname(file.originalname)
                    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`)
                }
            })
        })
    )


    singleFileUpload(@UploadedFile() file: Express.Multer.File) {
        return {
            message: "Successfully uploaded",
            filePath: `http://localhost:4001/uploads/${file.fieldname}`
        }
    }


    // multiple upload 

        @Post("multipel")
    @UseInterceptors(
        FilesInterceptor("files", 10, {
            storage: diskStorage({
                destination: join(process.cwd(), "uploads"),
                filename: (req, file, cb) => {
                    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
                    const ext = extname(file.originalname)
                    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`)
                }
            })
        })
    )


    multipleFilesUpload(@UploadedFiles() files: Express.Multer.File[]) {
        return {
            message: "Successfully uploaded",
            filePath: files.map((file) => "http://localhost:4001/uploads/" + file.filename)
        }
    }
}
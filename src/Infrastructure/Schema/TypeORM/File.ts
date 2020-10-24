import { EntitySchema } from "typeorm";
import File from "../../../Domain/Entities/File";

const FileSchema = new EntitySchema<File>({
    name: "file",
    columns: {
        _id: {
            type: String,
            primary: true
        },
        name: {
            type: String
        },
        originalName: {
            type: String
        },
        mimeType: {
            type: String
        },
        path: {
            type: String
        },
        extension: {
            type: String
        },
        size: {
            type: Number
        },
        version: {
            type: Number
        },
        createdAt: {
            name: 'createdAt',
            type: 'timestamp with time zone',
            createDate: true,
        },
        updatedAt: {
            name: 'updatedAt',
            type: 'timestamp with time zone',
            updateDate: true,
        }
    }
})

export default FileSchema;
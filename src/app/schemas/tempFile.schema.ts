import mongoose, { type Document, type ObjectId, model } from 'mongoose';

const { Schema } = mongoose;

const tempFile = new Schema<ITempFileSchema>(
    {
        url: {
            type: String,
        },
        fileName: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

const TempFile = model<ITempFileSchema>('TempFile', tempFile);

export default TempFile;

export interface ITempFileSchema extends Document {
    url: string;
    fileName: string;
}

export type TempFileDataType = Document<
    unknown,
    Record<string, unknown>,
    ITempFileSchema
> &
    Omit<
        ITempFileSchema & {
            _id: ObjectId;
        },
        never
    >;

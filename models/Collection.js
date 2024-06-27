import { deserialize } from 'mongodb';
import { Collection, Schema } from 'mongoose';

const CollectionSchema = new Schema(
    {
        title: { type: String },
        slug: { type: String, required: true },
        description: { type: String, required: true },
        genre: [{ type: String, required: true }],
        price: { type: Number, required: true },
        imageDemo: [{ type: String, required: true }],
        imageCharacter: [{ type: String, required: true }],
        imageBuilding: [{ type: String, required: true }],
    },
    {
        timestamps: true,
    },
);

export const Collection =
    models.Collection || models('Collection', CollectionSchema, 'collections');

import Collection from '~/models/Collection';
import { mongooseConnect } from '~/lib/mongoose';

//fetch data
export default async function handle(request, response) {
    //connect mongoDB if authenticated
    await mongooseConnect();
    const { method } = request;
    if (method === 'POST') {
        const {
            title,
            slug,
            description,
            genre,
            price,
            imageDemo,
            imageCharacter,
            imageBuilding,
        } = request.body;
        const collectionData = await Collection.create({
            title,
            slug,
            description,
            genre,
            price,
            imageDemo,
            imageCharacter,
            imageBuilding,
        });

        response.json(collectionData);
    }

    // find
    if (method === 'GET') {
        if (request.query?.id) {
            response.json(await Collection.findById(request.query.id));
        } else {
            response.json((await Collection.find()).reverse());
        }
    }

    // update
    if (method === 'PUT') {
        const {
            _id,
            title,
            slug,
            description,
            genre,
            price,
            imageDemo,
            imageCharacter,
            imageBuilding,
        } = request.body;

        await Collection.updateOne(
            { _id },
            {
                title,
                slug,
                description,
                genre,
                price,
                imageDemo,
                imageCharacter,
                imageBuilding,
            },
        );

        response.json(true);
    }

    // delete
    if (method === 'PUT') {
        if (request.query?.id) {
            await Collection.deleteOne({ _id: request.query.id });
            response.json(true);
        }
    }
}

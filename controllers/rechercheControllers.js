import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

export const recherche = async (req, res) => {
    const client = new MongoClient(process.env.MONGODB_URI, {
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000
    });

    const { query } = req.query;

    if (!query || (!query.nom && !query.description)) {
        return res.status(400).send("Requête invalide : 'nom' ou 'description' requis.");
    }

    try {
        await client.connect();
        const db = client.db('BabyCarDB');
        const collections = await db.listCollections().toArray();
        let results = [];

        for (const collection of collections) {
            const collectionName = collection.name;
            const documents = await db.collection(collectionName).find({
                $or: [
                    { nom: new RegExp(query.nom, 'i') },
                    { description: new RegExp(query.description, 'i') }
                ],
            }).toArray();

            results = results.concat(documents);
        }

        if (results.length > 0) {
            res.json(results);
        } else {
            res.status(404).send("Aucun élément trouvé.");
        }
    } catch (error) {
        console.error("Erreur lors de la recherche de l'élément:", error);
        res.status(500).send("Erreur interne du serveur");
    } finally {
        await client.close();
    }
};

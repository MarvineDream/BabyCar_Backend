import Ressource from "../models/Ressource.js";





// Ajouter une nouvelle ressource
export const createResource = async (req, res) => {
    const { titre, lien, description } = req.body;

    try {
        const newResource = new Ressource({ titre, lien, description });
        await newResource.save();
        res.status(201).json({ message: 'Ressource créée avec succès.', resource: newResource });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// Récupérer toutes les ressources
export const getAllResources = async (req, res) => {
    try {
        const resources = await Ressource.find();
        res.status(200).json(resources);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// Récupérer une ressource par son ID
export const getResourceById = async (req, res) => {
    const { id } = req.params;

    try {
        const resource = await Ressource.findById(id);
        if (!resource) {
            return res.status(404).json({ message: 'Ressource non trouvée.' });
        }
        res.status(200).json(resource);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// Mettre à jour une ressource
export const updateResource = async (req, res) => {
    const { id } = req.params;
    const { titre, lien, description } = req.body;

    try {
        const updatedResource = await Ressource.findByIdAndUpdate(id, { titre, lien, description }, { new: true });
        if (!updatedResource) {
            return res.status(404).json({ message: 'Ressource non trouvée.' });
        }
        res.status(200).json({ message: 'Ressource mise à jour avec succès.', resource: updatedResource });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// Supprimer une ressource
export const deleteResource = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedResource = await Ressource.findByIdAndDelete(id);
        if (!deletedResource) {
            return res.status(404).json({ message: 'Ressource non trouvée.' });
        }
        res.status(200).json({ message: 'Ressource supprimée avec succès.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};
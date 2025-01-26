import Statistic from '../models/Statistic.js';

/*export const createStatistic = async (req, res) => {
    try {
        const statistic = new Statistic(req.body);
        await statistic.save();
        res.status(201).send(statistic);
    } catch (error) {
        res.status(400).send(error);
    }
}; */

export const getStatistics = async (req, res) => {
    try {
        const statistics = await Statistic.find()
            .populate('rendezvous')
            .populate('consultations')
            .populate('midwife')
            .populate('patient');

        // Vérification si des statistiques ont été trouvées
        if (!statistics.length) {
            return res.status(404).send({ message: 'Aucune statistique trouvée.' });
        }

        res.status(200).send(statistics);
    } catch (error) {
        console.error('Erreur lors de la récupération des statistiques:', error);
        res.status(500).send({ message: 'Erreur interne du serveur.', error });
    }
};


export const getStatisticById = async (req, res) => {
    try {
        const statistic = await Statistic.findById(req.params.id)
            .populate('rendezvous')
            .populate('consultations')
            .populate('midwife')
            .populate('patient');
        
        if (!statistic) {
            return res.status(404).send({ message: 'Statistique non trouvée' });
        }
        
        res.send(statistic);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const updateStatistic = async (req, res) => {
    try {
        const statistic = await Statistic.findByIdAndUpdate(req.params.id, req.body, { new: true });
        
        if (!statistic) {
            return res.status(404).send({ message: 'Statistique non trouvée' });
        }
        
        res.send(statistic);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const deleteStatistic = async (req, res) => {
    try {
        const statistic = await Statistic.findByIdAndDelete(req.params.id);
        
        if (!statistic) {
            return res.status(404).send({ message: 'Statistique non trouvée' });
        }
        
        res.send({ message: 'Statistique supprimée avec succès' });
    } catch (error) {
        res.status(500).send(error);
    }
};

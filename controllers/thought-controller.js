const { User, Thought } = require('../models')

const thoughtController = {
    //get all users
    getAllThoughts(req, res) {
        Thought.find({})
            .populate({
                path: "thoughts",
                select: '-__v'
            })
            .select('-__v')
            .sort({ _id: -1 })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400)
            })
    },

    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .select('-__v')
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400)
            })

    },

    createThought({ body }, res) {
        Thought.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.json(err))
    },

    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({
            _id: params.id
        },
            body, { new: true, runValidators: true })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No thought is found with this id' })
                }
                res.json(dbUserData)
            })
            .catch(err => res.json(err))
    },

    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.json(err))
    }


};

module.exports = thoughtController
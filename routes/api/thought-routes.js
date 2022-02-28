const router = require('express').Router();
const {
    createThought,
    removeThought,
    addReaction,
    removeReaction

} = require('../../controllers/thought-controller')

router.route('/:userThought').post(createThought)

module.exports = router;
const router = require('express').Router();

const {
  addThought,
  removeThought,
  getAllThoughts,
  getThoughtById,
  updateThought,
  addReaction,
  removeReaction
} = require('../../controllers/thought-controller');


router
.route('/:userId')
.post(addThought);


router
.route('/')
.get(getAllThoughts);

router
  .route('/:id')
  .get(getThoughtById)
  .put(updateThought)
  .delete(removeThought);


router
  .route('/:thoughtId/reactions')
  .post(addReaction);


router
.route('/:thoughtId/reactions/:reactionId')
.delete(removeReaction);

module.exports = router;

const router = require('express').Router();
const {
    getAllUsers,
    createUser,
    getuserById,
    updateUser,
    deleteUser,
    addToFriendList,
    removefromFriendList

} = require('../../controllers/user-controller')

router
    .route('/')
    .get(getAllUsers)
    .post(createUser)
    

router
    .route('/:id')
    .get(getuserById)
    .put(updateUser)
    .delete(deleteUser)

//api/users/<userId>/friends/<friendId>
router
  .route('/:userId/friends/:friendId')
  .post(addToFriendList);

//api/users/<userId>/friends/<friendId>
router
  .route('/:userId/friends/:friendId')
  .delete(removefromFriendList);

module.exports = router;
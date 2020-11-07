const {
    User
} = require('../models');

const userController = {
    //get all
    getAllUsers(req, res) {
        console.log('workign')
        User.find({})
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .select('-__v')
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    //get one by id
    getuserById({ params }, res) {
        User.findOne({
                _id: params.id
            })
             .populate({
                path: 'thoughts',
                select: '-__V'
            })
            .select('-__V')
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({
                        message: 'No user with that id!'
                    });
                    return;
                }
                res.json(dbUserData)
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    //create user
    createUser( {body }, res) {
        console.log( body)
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(400).json(err));
    },
    //edit user
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, 
            body, {
                new: true
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({
                        message: 'No user with this id!'
                    })
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },
    //delete user
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id   })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({  message: 'no user found with this id'  });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },
    //add a friend
    addToFriendList({  params }, res) {
        User.findOneAndUpdate({  _id: params.userId  },
                //push to friends array
                { $push: { friends: params.friendId }}, 
                { new: true }
            )

            .then(dbUserData => {
                if (!dbUserData) {res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err)
                res.json(err)
            });
    },
    //remove a friend
    removefromFriendList({ params }, res) {
        User.findOneAndDelete({  _id: params.thoughtId })
            .then(deletedFriend => {
                if (!deletedFriend) {
                    return res.status(404).json({ message: 'No friend with this id!'  });
                }
                return User.findOneAndUpdate(
                    { friends: params.friendId}, 
                    //pull from array
                    { $pull: { friends: params.friendId }}, 
                    { new: true}
                );
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!'  });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },
};



module.exports = userController
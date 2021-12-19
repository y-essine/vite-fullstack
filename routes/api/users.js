const { Router } = require('express');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../../models/User');

const router = Router();

const { SECRETKEY } = require('../../config');

router.get('/user', async (req, res) => {
    let token = req.headers.token;

    jwt.verify(token, SECRETKEY, (err, decoded) => {
        if(err) return res.status(201).json({
            message: 'not authorized'
        })
        //token is valid
        User.findOne({ _id: decoded.usedid }, (err, user) => {
            if(err) return console.log(err);
            return res.status(200).json({
                user: user
            })
        })
    })
})

router.post('/login', async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        password: req.body.password,
    })

    User.findOne({ username: newUser.username }, (err, user) => {
        if (err) return res.status(500).json({ err: err });
        //check username exists
        if (!user) return res.status(201).json({ 
            message: 'user not found'
        })
        //check pw
        if (!bcrypt.compareSync(newUser.password, user.password))
            return res.status(201).json({
                message: 'wrong pw'
            })
        //all good
        let token  = jwt.sign({ usedid: user._id }, SECRETKEY);
        return res.status(200).json({
            title: 'login success',
            token: token
        })
    })

})

router.post('/signup', async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 10),
        email: req.body.email
    })

    User.findOne({ username: newUser.username }, (err, user) => {
        if (err) return res.status(500).json({ err: err });
        //check username exists
        if (user) return res.status(201).json({
            message: 'user already exists'
        })
        //all good
        try {
            const user = newUser.save();
            if (!user) throw new Error('Something went wrong saving user');
            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    })


})

router.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const removed = await User.findByIdAndDelete(id);
        if (!removed) throw Error('Something went wrong in delete');
        res.status(200).json(removed)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})


router.put('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const response = await User.findByIdAndUpdate(id, req.body);
        if (!response) throw Error('Something went wrong ');
        const updated = { ...response._doc, ...req.body };
        res.status(200).json(updated)


    } catch (error) {
        res.status(500).json({ message: error.message })

    }
})



module.exports = router;
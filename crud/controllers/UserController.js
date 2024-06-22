const User = require('../models/UserModel.js');
const jwt = require('jsonwebtoken');

const index = (req, res) => {
    User.find().then(users => {
        res.json(users);
    }).catch(err => {
        res.status(500).send({
            message: err.message || 'Some error occurred while retrieving users'
        });
    });
};

const show = (req, res) => {
    const id = req.params.id;
    User.findById(id).then(data => {
        if (!data) {
            res.status(404).send({
                message: `User with id ${id} not found`
            });
        } else {
            res.json(data);
        }
    }).catch(err => {
        res.status(500).send({
            message: `Error retrieving user with id ${id}`
        });
    });
};

const create = async (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: 'Content cannot be empty'
        });
    }

    // Destructure fields from req.body
    const { First_name, Last_name, email, phone, password, status } = req.body;

    try {
        // Create a new User instance with plaintext password
        const user = new User({
            First_name,
            Last_name,
            email,
            phone,
            password, // Store plaintext password
            status
        });

        // Save user to database
        const data = await user.save();

        // Return the saved user data (excluding password) as JSON response
        res.json({
            _id: data._id,
            First_name: data.First_name,
            Last_name: data.Last_name,
            email: data.email,
            phone: data.phone,
            status: data.status,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt
        });
    } catch (err) {
        // Handle errors
        res.status(500).send({
            message: err.message || 'Some error occurred while creating the User'
        });
    }
};

const update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: 'Data to update cannot be empty'
        });
    }
    const id = req.params.id;
    User.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
        if (!data) {
            res.status(404).send({
                message: `Cannot update User with id ${id}. Maybe User was not found`
            });
        } else {
            res.json(data);
        }
    }).catch(err => {
        res.status(500).send({
            message: `Error updating User with id ${id}`
        });
    });
};

const destroy = (req, res) => {
    const id = req.params.id;
    User.findByIdAndDelete(id).then(data => {
        if (!data) {
            res.status(404).send({
                message: `Cannot delete User with id ${id}. Maybe User was not found`
            });
        } else {
            res.send({
                message: 'User was deleted successfully'
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: `Could not delete User with id ${id}`
        });
    });
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }
console.log(user.password, password)
        // Compare plaintext password with the stored password
        if (user.password !== password) {
            return res.status(401).json({ message: 'Incorrect password' });
        }
        console.log(password, user.password)

        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ token });
    } catch (error) {
        console.error('Error during login:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    index,
    show,
    create,
    update,
    destroy,
    login
};

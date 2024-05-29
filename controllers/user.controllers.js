const User = require('../models/users.models');

module.exports = {
    // Create a new user
    createUser: async (req, res) => {
        try {
            const { username, email, password } = req.body;

            // Periksa apakah semua field sudah ada di body request
            if (!username || !email || !password) {
                return res.status(400).json({ message: 'All fields are required' });
            }

            const newUser = new User({ username, email, password });
            await newUser.save();
            res.status(201).json(newUser);
        } catch (error) {
            if (error.code === 11000) {
                // Duplicate key error
                return res.status(400).json({ message: 'Username or email already exists' });
            }
            res.status(500).json({ message: error.message });
        }
    },



    // Get all users
    getUsers: async (req, res) => {
        try {
            const users = await User.find();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Get a single user by ID
    getUserById: async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            if (!user) return res.status(404).json({ message: 'User not found' });
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Update a user by ID
    updateUser: async (req, res) => {
        try {
            const { username, email, password } = req.body;
            const updatedUser = await User.findByIdAndUpdate(
                req.params.id,
                { username, email, password },
                { new: true }
            );
            if (!updatedUser) return res.status(404).json({ message: 'User not found' });
            res.status(200).json(updatedUser);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Delete a user by ID
    deleteUser: async (req, res) => {
        try {
            const user = await User.findByIdAndDelete(req.params.id);
            if (!user) return res.status(404).json({ message: 'User not found' });
            res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

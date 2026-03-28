"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const createUserRoutes = (userService) => {
    const router = (0, express_1.Router)();
    router.get('/', async (req, res) => {
        try {
            const users = await userService.getAllUsers();
            res.json(users);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    });
    router.get('/:id', async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                res.status(400).json({ message: 'Invalid user ID' });
                return;
            }
            const user = await userService.getUserById(id);
            if (user) {
                res.json(user);
            }
            else {
                res.status(404).json({ message: 'User not found' });
            }
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    });
    router.post('/', async (req, res) => {
        try {
            const { name, email, password } = req.body;
            if (typeof name !== 'string' || typeof email !== 'string' || typeof password !== 'string') {
                res.status(400).json({ message: 'User name, email, and password are required.' });
                return;
            }
            const newUser = await userService.createUser({ name, email, password });
            res.status(201).json(newUser);
        }
        catch (error) {
            res.status(400).json({ message: error.message });
        }
    });
    router.put('/:id', async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                res.status(400).json({ message: 'Invalid user ID' });
                return;
            }
            const updated = await userService.updateUser(id, req.body);
            if (updated) {
                res.json({ message: 'User updated successfully' });
            }
            else {
                res.status(404).json({ message: 'User not found or no changes made' });
            }
        }
        catch (error) {
            res.status(400).json({ message: error.message });
        }
    });
    router.delete('/:id', async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                res.status(400).json({ message: 'Invalid user ID' });
                return;
            }
            const deleted = await userService.deleteUser(id);
            if (deleted) {
                res.status(204).send();
            }
            else {
                res.status(404).json({ message: 'User not found' });
            }
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    });
    return router;
};
exports.default = createUserRoutes;

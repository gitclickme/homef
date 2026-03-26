// File: src/routes/userRoutes.ts
import { Router, Request, Response } from 'express';
import UserService from '../service/userService'; // Import the class




/**
 * Creates and returns an Express Router for user-related routes.
 * This function takes a UserService instance as a dependency.
 * @param {UserService} userService The UserService instance to use for business logic.
 * @returns {Router} An Express Router configured with user routes.
 */
const createUserRoutes = (userService: UserService): Router => {
  const router = Router();

  // Apply authentication middleware to all routes defined in this router
  // This means all /api/users routes will now require a valid JWT


  // GET all users
  router.get('/', async (req: Request, res: Response) => {
    try {
      // Access authenticated user info from req.user if needed
      // console.log('Authenticated user:', req.user);
      const users = await userService.getAllUsers();
      res.json(users);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // GET user by ID
  router.get('/:id', async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
         res.status(400).json({ message: 'Invalid user ID' });
         return; // Exit early if ID is invalid
      }
      const user = await userService.getUserById(id);
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // POST create new user (Note: Registration is handled by authRoutes now)
  // This route might be used by an admin to create users directly without a password,
  // or it could be removed if all user creation is via /api/auth/register.
  // For now, keeping it but it's protected by JWT.
  router.post('/', async (req: Request, res: Response) => {
    try {
      const { name, email, password } = req.body;
      if (typeof name !== 'string' || typeof email !== 'string' || typeof password !== 'string') {
         res.status(400).json({ message: 'User name, email, and password are required.' });
         return; // Exit early if any field is missing or not a string
      }
      const newUser = await userService.createUser({ name, email, password });
      res.status(201).json(newUser);
    } catch (error: any) {
      res.status(400).json({ message: error.message }); // 400 for bad request (e.g., validation errors)
    }
  });

  // PUT update user by ID
  router.put('/:id', async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
         res.status(400).json({ message: 'Invalid user ID' });
         return;
      }
      const updated = await userService.updateUser(id, req.body);
      if (updated) {
        res.json({ message: 'User updated successfully' });
      } else {
        res.status(404).json({ message: 'User not found or no changes made' });
      }
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  // DELETE user by ID
  router.delete('/:id', async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
         res.status(400).json({ message: 'Invalid user ID' });
         return; // Exit early if ID is invalid
      }
      const deleted = await userService.deleteUser(id);
      if (deleted) {
        res.status(204).send(); // 204 No Content for successful deletion
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  return router;
};

export default createUserRoutes;

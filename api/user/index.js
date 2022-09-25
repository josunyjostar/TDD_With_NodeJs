import express from 'express';
export const router = express.Router();
import {index, getUserById, deleteUserById, createUser, modifyUser} from './user.ctrl.js';

router.get('/', index);
router.get('/:id', getUserById);
router.delete('/:id', deleteUserById);
router.post('/', createUser);
router.put('/:id', modifyUser);

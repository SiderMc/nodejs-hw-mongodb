import { Router } from 'express';
import {
  addContactsController,
  deleteContactsController,
  getAllContactsController,
  getContactsByIdController,
  updateContactsController,
} from '../controlers/contacts.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';

const contactsRouters = Router();

contactsRouters.get('/', ctrlWrapper(getAllContactsController));
contactsRouters.get('/:id', ctrlWrapper(getContactsByIdController));
contactsRouters.post('/', ctrlWrapper(addContactsController));
contactsRouters.patch('/:id', ctrlWrapper(updateContactsController));
contactsRouters.delete('/:id', ctrlWrapper(deleteContactsController));

export default contactsRouters;

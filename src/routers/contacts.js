import { Router } from 'express';
import {
  addContactsController,
  deleteContactsController,
  getAllContactsController,
  getContactsByIdController,
  updateContactsController,
} from '../controlers/contacts.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import validateBody from '../utils/validateBody.js';
import {
  contactAddSchema,
  contactUpdateSchema,
} from '../validation/contacts.js';
import isValidId from '../middlewares/isValidId.js';

const contactsRouters = Router();

contactsRouters.get('/', ctrlWrapper(getAllContactsController));
contactsRouters.get('/:id', isValidId, ctrlWrapper(getContactsByIdController));
contactsRouters.post(
  '/',
  validateBody(contactAddSchema),
  ctrlWrapper(addContactsController),
);
contactsRouters.patch(
  '/:id',
  isValidId,
  validateBody(contactUpdateSchema),
  ctrlWrapper(updateContactsController),
);
contactsRouters.delete(
  '/:id',
  isValidId,
  ctrlWrapper(deleteContactsController),
);

export default contactsRouters;

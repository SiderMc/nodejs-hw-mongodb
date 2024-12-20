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
import authenticate from '../middlewares/authenticate.js';
import upload from '../middlewares/uploads.js';

const contactsRouters = Router();

contactsRouters.use(authenticate);

contactsRouters.get('/', ctrlWrapper(getAllContactsController));
contactsRouters.get('/:id', isValidId, ctrlWrapper(getContactsByIdController));
contactsRouters.post(
  '/',
  upload.single('photo'),
  validateBody(contactAddSchema),
  ctrlWrapper(addContactsController),
);
contactsRouters.patch(
  '/:id',
  upload.single('photo'),
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

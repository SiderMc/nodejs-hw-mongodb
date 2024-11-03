import createError from 'http-errors';
import {
  addContacts,
  deleteContacts,
  getAllContacts,
  getContactById,
  updateContacts,
} from '../services/contacts.js';

export const getAllContactsController = async (req, res) => {
  const data = await getAllContacts();
  return res.json({
    status: 200,
    message: 'Successfully find contacts !',
    data,
  });
};
export const getContactsByIdController = async (req, res) => {
  const { id } = req.params;
  const data = await getContactById(id);
  if (!data) {
    throw createError(404, `Contact with id ${id} not found.`);
  }
  return res.json({
    status: 200,
    message: `Successfully found contact with id ${id}!`,
    data,
  });
};
export const addContactsController = async (req, res) => {
  const data = await addContacts(req.body);
  res.json({
    status: 201,
    message: 'Successfully created a contact!',
    data,
  });
};
export const updateContactsController = async (req, res) => {
  const { id: _id } = req.params;
  const data = await updateContacts({ _id, payload: req.body });
  if (!data) {
    throw createError(404, `Contact with id ${_id} not found.`);
  }

  res.json({
    status: 200,
    message: 'Successfully patched a contact!',
    data,
  });
};
export const deleteContactsController = async (req, res) => {
  const { id: _id } = req.params;
  const data = await deleteContacts({ _id });
  if (!data) {
    throw createError(404, `Contact with id ${_id} not found.`);
  }
  res.status(204).send();
};

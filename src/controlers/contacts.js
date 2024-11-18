import createError from 'http-errors';
import {
  addContacts,
  deleteContacts,
  getAllContacts,
  getContactById,
  updateContacts,
} from '../services/contacts.js';
import parsePaginationParams from '../utils/parsePaginationParams.js';
import parseSortParams from '../utils/parseSortParams.js';
import { sortOrderByList } from '../db/models/contacts.js';
import parseFilterParams from '../utils/parseFilterParams.js';

export const getAllContactsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query, sortOrderByList);
  const filter = parseFilterParams(req.query);
  filter.userId = req.user;
  const data = await getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
  });
  return res.json({
    status: 200,
    message: 'Successfully find contacts !',
    data,
  });
};

export const getContactsByIdController = async (req, res) => {
  const { id } = req.params;
  const data = await getContactById(id, { userId: req.user._id });
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
  const data = await addContacts({ ...req.body, userId: req.user._id });
  res.json({
    status: 201,
    message: 'Successfully created a contact!',
    data,
  });
};

export const updateContactsController = async (req, res) => {
  const { id: _id } = req.params;
  const data = await updateContacts({
    _id,
    payload: req.body,
    userId: req.user._id,
  });
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
  const data = await deleteContacts({ _id, userId: req.user._id });
  if (!data) {
    throw createError(404, `Contact with id ${_id} not found.`);
  }
  res.status(204).send();
};


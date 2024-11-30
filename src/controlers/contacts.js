import createError from 'http-errors';
import path from 'node:path';
import env from '../utils/env.js';
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
import saveFileToUploadDir from '../utils/saveFileToUploadDir.js';
import saveFileToCloudinary from '../utils/saveFileToCloudinary.js';

export const getAllContactsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query, sortOrderByList);
  const filter = parseFilterParams(req.query);
  const data = await getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
    userId: req.user._id,
  });
  return res.json({
    status: 200,
    message: 'Successfully find contacts !',
    data,
  });
};

export const getContactsByIdController = async (req, res) => {
  const { _id } = req.params;
  const data = await getContactById({ _id, userId: req.user._id });
  if (!data) {
    throw createError(404, `Contact with id ${_id} not found.`);
  }
  return res.json({
    status: 200,
    message: `Successfully found contact with id ${_id}!`,
    data,
  });
};
export const addContactsController = async (req, res) => {
  const payload = req.body;
  const enableCloudinary = env('ENABLE_CLOUDINARY');
  if (req.file) {
    if (enableCloudinary === 'true') {
      payload.photo = await saveFileToCloudinary(req.file, 'photo');
    } else {
      await saveFileToUploadDir(req.file);
      payload.photo = path.join(req.file.filename);
    }
  }
  const data = await addContacts({ ...payload, userId: req.user._id });
  res.json({
    status: 201,
    message: 'Successfully created a contact!',
    data,
  });
};

export const updateContactsController = async (req, res) => {
  const { _id } = req.params;
  const payload = req.body;
  const enableCloudinary = env('ENABLE_CLOUDINARY');
  if (req.file) {
    if (enableCloudinary === 'true') {
      payload.photo = await saveFileToCloudinary(req.file, 'photo');
    } else {
      await saveFileToUploadDir(req.file);
      payload.photo = path.join(req.file.filename);
    }
  }
  const data = await updateContacts({
    _id,
    payload,
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

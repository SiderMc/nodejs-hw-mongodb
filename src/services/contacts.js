import ContactsCollection from '../db/models/contacts.js';
import calculatePagination from '../utils/calculatePagination.js';

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortBy = '_id',
  sortOrder = 'asc',
  filter = {},
}) => {
  const skip = (page - 1) * perPage;
  const query = ContactsCollection.find(filter)
    .skip(skip)
    .limit(perPage)
    .sort({ [sortBy]: sortOrder });
  const data = await query;
  const totalItems = await ContactsCollection.countDocuments(filter);
  const paginationData = calculatePagination(totalItems, perPage, page);
  return { data, ...paginationData };
};


export const getContactById = async (id) => ContactsCollection.findById(id);
export const addContacts = async (payload) =>
  ContactsCollection.create(payload);
export const updateContacts = async ({ _id, payload, options = {} }) => {
  const data = await ContactsCollection.findOneAndUpdate({ _id }, payload, {
    ...options,
    new: true,
  });
  return data;
};
export const deleteContacts = (id) => ContactsCollection.findOneAndDelete(id);

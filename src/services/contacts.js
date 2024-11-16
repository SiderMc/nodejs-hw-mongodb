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
  const query = ContactsCollection.find()
    .skip(skip)
    .limit(perPage)
    .sort({ [sortBy]: sortOrder });

  if (filter.isFavourite) {
    query.where('isFavourite').equals(filter.isFavourite);
  }

  if (filter.contactType) {
    query.where('contactType').equals(filter.contactType);
  }
  const data = await query;
  const totalItems = await ContactsCollection.find()
    .merge(query)
    .countDocuments();
  const paginationData = calculatePagination({ totalItems, page, perPage });

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

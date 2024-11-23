import ContactsCollection from '../db/models/contacts.js';
import calculatePagination from '../utils/calculatePagination.js';

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortBy = '_id',
  sortOrder = 'asc',
  filter = {},
  userId,
}) => {
  const skip = (page - 1) * perPage;
  const query = ContactsCollection.find({ ...filter, userId })
    .skip(skip)
    .limit(perPage)
    .sort({ [sortBy]: sortOrder });
  const data = await query;
  const totalItems = await ContactsCollection.countDocuments({
    ...filter,
    userId,
  });
  const paginationData = calculatePagination(totalItems, perPage, page);
  return { data, ...paginationData };
};

export const getContactById = async ({ id, userId }) =>
  ContactsCollection.findOne({ id, userId });

export const addContacts = async (payload) =>
  ContactsCollection.create(payload);

export const updateContacts = async ({ id, payload, userId, options = {} }) => {
  const data = await ContactsCollection.findOneAndUpdate(
    { id, userId },
    payload,
    {
      ...options,
      new: true,
    },
  );
  return data;
};
export const deleteContacts = ({ id, userId }) =>
  ContactsCollection.findOneAndDelete({ id, userId });

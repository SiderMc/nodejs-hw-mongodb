import ContactsCollection from '../db/models/contacts.js';

export const getAllContacts = async () => ContactsCollection.find();
export const getContactById = async (id) => ContactsCollection.findById(id);
export const addContacts = async (payload) =>ContactsCollection.create(payload);
export const updateContacts = async ({ _id, payload, options = {} }) => {
  const data = await ContactsCollection.findOneAndUpdate({ _id }, payload, {
    ...options,
    new: true,
  });
  return data;
};
export const deleteContacts = (id) => ContactsCollection.findOneAndDelete(id);

import ContactsCollection from '../db/models/contacts.js';

export const getAllContacts = async () => ContactsCollection.find();
export const getContactById = async (id) => ContactsCollection.findById(id);

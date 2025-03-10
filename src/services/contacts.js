import Contact from '../models/contact.js';

export const createContact = async (payload) => {
  const contact = await Contact.create(payload);
  return contact;
};

export const updateContact = async (contactId, payload, options = {}) => {
  const renewedContact = await Contact.findByIdAndUpdate(contactId, payload, {
    new: true,
  });

  if (!renewedContact) return null;
  return {
    contact: renewedContact,
    isNew: false,
  };
};

export const deleteContact = async (contactId) => {
  const contact = await Contact.findOneAndDelete({ _id: contactId });
  return contact;
};

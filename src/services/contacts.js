import Contact from '../models/contact.js';

export async function getContacts({
  page,
  perPage,
  sortBy,
  sortOrder,
  filter,
}) {
  const skip = (page - 1) * perPage;
  const contactQuery = Contact.find();

  if (typeof filter.contactType !== 'undefined') {
    contactQuery.where('contactType').equals(filter.contactType);
  }

  if (typeof filter.isFavourite !== 'undefined') {
    const isFavouriteBool =
      filter.isFavourite === 'true' || filter.isFavourite === '1';
    contactQuery.where('isFavourite').equals(isFavouriteBool);
  }

  const [total, contacts] = await Promise.all([
    Contact.countDocuments(contactQuery),
    contactQuery
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(perPage),
  ]);

  const totalPages = Math.ceil(total / perPage);

  return {
    data: contacts,
    page,
    perPage,
    totalItems: total,
    totalPages,
    hasNextPage: totalPages > page,
    hasPreviousPage: page > 1,
  };
}

export async function getContactById(id) {
  const filteredContact = await Contact.findById(id);
  return filteredContact;
}

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

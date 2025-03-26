import Contact from '../models/contact.js';
import User from '../models/user.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

export const registerUser = async (payload) => {
  return await User();
};

export async function getContacts({
  page,
  perPage,
  sortBy,
  sortOrder,
  filter,
  userId,
}) {
  const skip = (page - 1) * perPage;
  const contactQuery = Contact.find({ userId });

  const { type, isFavourite } = parseFilterParams(filter);

  if (type) {
    contactQuery.where('contactType').equals(type);
  }

  if (isFavourite !== undefined) {
    contactQuery.where('isFavourite').equals(isFavourite);
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

export async function getContactById(id, userId) {
  const filteredContact = await Contact.findOne({ _id: id, userId });
  return filteredContact;
}

export const createContact = async (payload) => {
  const contact = await Contact.create(payload);
  return contact;
};

export const updateContact = async (contactId, payload, userId) => {
  const renewedContact = await Contact.findOneAndUpdate(
    { _id: contactId, userId },
    payload,
    {
      new: true,
    },
  );

  if (!renewedContact) return null;
  return {
    contact: renewedContact,
    isNew: false,
  };
};

export const deleteContact = async (contactId, userId) => {
  const contact = await Contact.findOneAndDelete({ _id: contactId, userId });
  return contact;
};

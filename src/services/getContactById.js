import Contact from '../models/contact.js';

export async function getContactById(id) {
  const filteredContact = await Contact.findById(id);
  return filteredContact;
}

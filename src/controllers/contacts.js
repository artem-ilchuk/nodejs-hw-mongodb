import {
  getContacts,
  getContactById,
  createContact,
  deleteContact,
  updateContact,
} from '../services/contacts.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';
import createHttpError from 'http-errors';
import { uploadPhoto } from '../utils/uploadPhoto.js';

export const getContactsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);

  const contacts = await getContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
    userId: req.user.id,
  });
  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactByIdController = async (req, res, next) => {
  const id = req.params.id;
  const filteredContact = await getContactById(id, req.user.id);

  if (filteredContact === null) {
    throw createHttpError(404, 'Contact not found');
  }

  if (filteredContact.userId.toString() !== req.user.id.toString()) {
    throw new createHttpError.NotFound('Contact not found');
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${id}!`,
    data: filteredContact,
  });
};

export const createContactController = async (req, res) => {
  const contact = {
    ...req.body,
    userId: req.user.id,
  };

  const photo = req.file;

  let photoUrl;

  if (photo) {
    photoUrl = await uploadPhoto(photo);
  }

  const newContact = await createContact({ ...contact, photo: photoUrl });

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: newContact,
  });
};

export const patchContactController = async (req, res, _next) => {
  const { id } = req.params;
  const photo = req.file;

  let photoUrl;

  if (photo) {
    photoUrl = await uploadPhoto(req.file);
  }

  const result = await updateContact(
    id,
    { ...req.body, photo: photoUrl },
    req.user.id,
  );

  if (result === null) {
    throw createHttpError(404, 'Contact not found');
  }
  res.status(200).json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: result.contact,
  });
};

export const deleteContactController = async (req, res, next) => {
  const { id } = req.params;
  const contact = await deleteContact(id, req.user.id);
  if (contact === null) {
    throw createHttpError(404, 'Contact not found');
  }
  res.status(204).send();
};

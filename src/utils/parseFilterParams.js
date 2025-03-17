const parseContactType = (type) => {
  if (typeof type !== 'string') return undefined;
  return ['work', 'home', 'personal'].includes(type) ? type : undefined;
};

const parseIsFavourite = (isFavourite) => {
  if (typeof isFavourite !== 'boolean') return undefined;
  return isFavourite;
};

export const parseFilterParams = (query = {}) => {
  const { contactType, isFavourite } = query;

  return {
    contactType: parseContactType(contactType),
    isFavourite: parseIsFavourite(isFavourite),
  };
};

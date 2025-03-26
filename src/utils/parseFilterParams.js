const parseContactType = (type) => {
  if (typeof type !== 'string') return undefined;
  return ['work', 'home', 'personal'].includes(type) ? type : undefined;
};

const parseIsFavourite = (isFavourite) => {
  const typedIsFavourite =
    typeof isFavourite === 'string' ? isFavourite.trim() : String(isFavourite);

  if (typedIsFavourite === 'true' || typedIsFavourite === '1') {
    return true;
  }
  if (typedIsFavourite === 'false' || typedIsFavourite === '0') {
    return false;
  }
  return undefined;
};

export const parseFilterParams = (query = {}) => {
  const { type, isFavourite } = query;

  return {
    type: parseContactType(type),
    isFavourite: parseIsFavourite(isFavourite),
  };
};

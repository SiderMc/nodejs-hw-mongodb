import { typeList } from '../constants/contacts.js';

const parseIsFavourite = (isFavourite) => {
  if (typeof isFavourite !== 'string') return null;
  return isFavourite === 'true' ? true : isFavourite === 'false' ? false : null;
};

const parseContactType = (contactType) => {
  if (typeof contactType !== 'string') return null;
  const normalizedType = contactType.toLowerCase();
  return typeList.includes(normalizedType) ? normalizedType : null;
};

const parseFilterParams = ({ isFavourite, contactType }) => {
  const parsedFavourite = parseIsFavourite(isFavourite);
  const parsedContactType = parseContactType(contactType);
  const filter = {};
  if (parsedFavourite !== null) {
    filter.isFavourite = parsedFavourite;
  }
  if (parsedContactType !== null) {
    filter.contactType = parsedContactType;
  }
  return filter;
};

export default parseFilterParams;

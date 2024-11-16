const sortOrderList = ['asc', 'desc'];

const parseSortParams = ({ sortBy, sortOrder }, sortList) => {
  const parsedSortOrder = sortOrderList.includes(sortOrder)
    ? sortOrder
    : sortOrderList[0];
  const parsedSortBy = sortList.includes(sortBy) ? sortBy : '_id';
  return {
    sortOrder: parsedSortOrder,
    sortBy: parsedSortBy,
  };
};

export default parseSortParams;

const calculatePagination = (totalItems, perPage,page) => {
  const totalPages = Math.ceil(totalItems / perPage);
  const hasNextPage = Boolean(page < totalPages);
  const hasPrevPage = page > 1;
  return { page, perPage, totalItems, totalPages, hasNextPage, hasPrevPage };
};

export default calculatePagination;

import createHttpError from 'http-errors';
import { isValidObjectId } from 'mongoose';

const isValidId = (req, res, next) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return next(createHttpError(404, `id ${id} not valid`));
  }
  return next()
};

export default isValidId;

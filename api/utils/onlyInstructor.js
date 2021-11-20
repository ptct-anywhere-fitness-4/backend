module.exports = (req, res, next) => {
  if (req.decodedToken.isInstructor) {
    next();
  } else {
    next({ status: 403, message: 'you are not authorized' });
  }
};

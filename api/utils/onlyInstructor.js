module.exports = (isInstructorBool) => (req, res, next) => {
  if (req.decodedToken.isInstructor === isInstructorBool) {
    next();
  } else {
    next({ status: 403, message: 'you are not authorized' });
  }
};

const Clients = require('./clients-model');

const uniqueRegistration = async (req, res, next) => {
  //something
  const { client_id, class_id } = req.params;
  const clientClass = await Clients.getRegistrationClass(client_id, class_id);

  if (clientClass) {
    next({
      status: 409,
      message: 'client is already registered to this class',
    });
  } else {
    req.client_id = client_id;
    req.class_id = class_id;
    next();
  }
};

module.exports = {
  uniqueRegistration,
};

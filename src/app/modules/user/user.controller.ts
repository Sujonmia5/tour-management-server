import UserServices from "./user.services";

const createUser = (req, res) => {
  // Function implementation
  const result = UserServices.createUserDB(req.body);
  res.status(201).json(result);
};

const UserContrller = {
  createUser,
};
export default UserContrller;

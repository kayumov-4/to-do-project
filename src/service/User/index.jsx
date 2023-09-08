import api from "../index";

const User = {
  addUser: async (data) => api.post("/user/registration", data),
  loginUser: async (data) => api.post("/user/login", data),
};
export default User;

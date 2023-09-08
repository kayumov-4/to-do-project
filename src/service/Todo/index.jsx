import api from "../index";

const Todo = {
  addTodo: async (data) => api.post("/task/add", data),
  getOneTodo: async (id) => api.get(`/task/${id}`),
  getAllTodos: async () => api.get("/task/all"),
  updateTodo: async (id, data) => api.put(`/task/update/${id}`, data),
  // deleteTodo: async (id) => api.delete(`/task/delete/${id}`),
};
export default Todo;

import axios from "axios";

const Habit = {
  addHabit: async (data) => axios.post("http://localhost:3000/habits", data),
  getOneHabit: async (id) => axios.get(`http://localhost:3000/habits/${id}`),
  getAllHabits: async () => axios.get("http://localhost:3000/habits"),
};
export default Habit;

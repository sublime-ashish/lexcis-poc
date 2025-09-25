import API from "../api/api";

export const fetchUsers = async () => {
  const res = await API.get("/users");
  return res.data;
};

export const updateUser = async (id, data) => {
  return await API.put(`/users/${id}`, data);
};

export const deleteUser = async (id) => {
  return await API.delete(`/users/${id}`);
};

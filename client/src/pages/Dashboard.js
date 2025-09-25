import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ROLES } from "../constants/roles";
import { fetchUsers, updateUser, deleteUser } from "../utils/userAPI";
import UserTable from "../components/UserTable";
import EditUserForm from "../components/EditUserForm";

export default function Dashboard() {
  const { user, logout } = useContext(AuthContext);

  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", role: ROLES.USER });

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const data = await fetchUsers();
    setUsers(data);
  };

  const handleEditClick = (u) => {
    setEditingUser(u);
    setFormData({ name: u.name, email: u.email, role: u.role });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await deleteUser(id);
      loadUsers();
    } catch {
      alert("Delete failed");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateUser(editingUser.id, {
        name: formData.name,
        email: user.role === ROLES.ADMIN ? formData.email : editingUser.email,
        role: user.role === ROLES.ADMIN ? formData.role : editingUser.role,
      });
      setEditingUser(null);
      loadUsers();
    } catch {
      alert("Update failed");
    }
  };

  return (
    <div>
      <h1>Dashboard - Welcome {user.name}</h1>
      <h4>Role: {user.role}</h4>
      <button onClick={logout}>Logout</button>

      <UserTable
        users={users}
        currentUser={user}
        onEdit={handleEditClick}
        onDelete={handleDelete}
      />

      {editingUser && (
        <EditUserForm
          editingUser={editingUser}
          formData={formData}
          currentUser={user}
          onChange={handleChange}
          onSubmit={handleUpdate}
          onCancel={() => setEditingUser(null)}
        />
      )}
    </div>
  );
}

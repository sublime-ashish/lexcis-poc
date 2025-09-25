import React from "react";
import { ROLES } from "../constants/roles";

const UserTable = ({ users, currentUser, onEdit, onDelete }) => {
  return (
    <table border="1" cellPadding="10">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          {currentUser.role !== ROLES.USER && <th>Actions</th>}
        </tr>
      </thead>
      <tbody>
        {users.map((u) => (
          <tr key={u.id}>
            <td>{u.name}</td>
            <td>{u.email}</td>
            <td>{u.role}</td>
            {currentUser.role !== ROLES.USER && (
              <td>
                {(currentUser.role === ROLES.ADMIN || currentUser.role === ROLES.EDITOR) && (
                  <button onClick={() => onEdit(u)}>Edit</button>
                )}
                {currentUser.role === ROLES.ADMIN && (
                  <button onClick={() => onDelete(u.id)}>Delete</button>
                )}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;

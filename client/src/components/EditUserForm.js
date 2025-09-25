import React from "react";
import { ROLES } from "../constants/roles";

const EditUserForm = ({ editingUser, formData, onChange, onSubmit, onCancel, currentUser }) => {
  return (
    <form onSubmit={onSubmit} style={{ marginTop: "20px" }}>
      <h3>Edit User: {editingUser.name}</h3>

      {/* Name: editable for both admin and editor */}
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={onChange}
        required
      />

      {/* Email: editable only by admin */}
      {currentUser.role === ROLES.ADMIN && (
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={onChange}
          required
        />
      )}

      {/* Role: editable only by admin */}
      {currentUser.role === ROLES.ADMIN && (
        <select name="role" value={formData.role} onChange={onChange}>
          <option value={ROLES.USER}>User</option>
          <option value={ROLES.EDITOR}>Editor</option>
          <option value={ROLES.ADMIN}>Admin</option>
        </select>
      )}

      <button type="submit">Update</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default EditUserForm;

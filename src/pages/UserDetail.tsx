import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetUsersQuery, useUpdateUserMutation } from "../features/users/usersApi";

const UserDetail = () => {
  const { userId } = useParams<{ userId: string }>();
  const { user, isLoading } = useGetUsersQuery(undefined, {
    selectFromResult: ({ data, isLoading }) => ({
      user: data?.entities[Number(userId)],
      isLoading,
    }),
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", company: "" });
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  const handleEditClick = () => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        company: user.company?.name || "",
      });
      setIsEditing(true);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      await updateUser({ id: user.id, ...formData, company: { name: formData.company } });
      setIsEditing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border" role="status"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="alert alert-danger text-center mt-5">
        User not found.
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="card mx-auto" style={{ maxWidth: "600px" }}>
        <div className="card-body">
          <h2 className="card-title text-center mb-4">{user.name}</h2>
          <p className="card-text">
            <strong>Email:</strong> {user.email}
          </p>
          <p className="card-text">
            <strong>Company:</strong> {user.company?.name}
          </p>
          <button className="btn btn-primary w-100" onClick={handleEditClick}>
            Edit User
          </button>
        </div>
      </div>

      {isEditing && (
        <div className="modal show d-block" tabIndex={-1} role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit User</h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => setIsEditing(false)}
                >
                  <span>&times;</span>
                </button>
              </div>
              <form onSubmit={handleFormSubmit}>
                <div className="modal-body">
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="company">Company</label>
                    <input
                      type="text"
                      className="form-control"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isUpdating}
                  >
                    {isUpdating ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDetail;

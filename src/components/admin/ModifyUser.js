import React, { useState, useEffect ,useCallback} from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ModifyUser = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingUserId, setEditingUserId] = useState(null);
    const [updatedRole, setUpdatedRole] = useState('');
    const { user, showToast } = useAuth();
    const navigate = useNavigate();
  
    // Wrap fetchUsers in useCallback to memoize it
    const fetchUsers = useCallback(async () => {
      try {
        const response = await fetch('/api/admin/users', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        
        const data = await response.json();
        setUsers(data);
        setLoading(false);
      } catch (error) {
        showToast(error.message, 'error');
        setLoading(false);
      }
    }, [showToast]); // Add showToast as dependency since it's used inside
  
    useEffect(() => {
      if (user?.role !== 'admin') {
        navigate('/');
        return;
      }
      fetchUsers();
    }, [user, navigate, fetchUsers]); 

  const handleEditClick = (userId, currentRole) => {
    setEditingUserId(userId);
    setUpdatedRole(currentRole);
  };

  const handleRoleChange = (e) => {
    setUpdatedRole(e.target.value);
  };

  const handleUpdateRole = async (userId) => {
    try {
      const response = await fetch(`/api/admin/users/${userId}/role`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ role: updatedRole })
      });

      if (!response.ok) {
        throw new Error('Failed to update user role');
      }

      const updatedUser = await response.json();
      
      setUsers(users.map(user => 
        user.id === updatedUser.id ? updatedUser : user
      ));
      
      setEditingUserId(null);
      showToast('User role updated successfully', 'success');
    } catch (error) {
      showToast(error.message, 'error');
    }
  };

  const handleCancelEdit = () => {
    setEditingUserId(null);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Manage Users</h2>
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Current Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  {editingUserId === user.id ? (
                    <select
                      className="form-select"
                      value={updatedRole}
                      onChange={handleRoleChange}
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  ) : (
                    <span className={`badge ${user.role === 'admin' ? 'bg-success' : 'bg-primary'}`}>
                      {user.role}
                    </span>
                  )}
                </td>
                <td>
                  {editingUserId === user.id ? (
                    <>
                      <button
                        className="btn btn-sm btn-success me-2"
                        onClick={() => handleUpdateRole(user.id)}
                      >
                        Save
                      </button>
                      <button
                        className="btn btn-sm btn-secondary"
                        onClick={handleCancelEdit}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      className="btn btn-sm btn-warning"
                      onClick={() => handleEditClick(user.id, user.role)}
                      disabled={user.id === user?.id} // Disable editing own role
                    >
                      Edit Role
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ModifyUser;
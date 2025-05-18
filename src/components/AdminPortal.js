import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faTrain, 
  faUserEdit, 
  faSearch,
  faPlus,
  faEdit
} from '@fortawesome/free-solid-svg-icons';

const AdminPortal = () => {
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-5">Admin Portal</h2>
      <div className="row justify-content-center">
        {/* Add Train */}
        <div className="col-md-3 mb-4">
          <Link to="/admin/add-train" className="text-decoration-none">
            <div className="admin-card text-center h-100 shadow-sm p-4">
              <FontAwesomeIcon icon={faPlus} size="3x" className="mb-3" color='black'/>
              <h5 className="card-title text-dark">Add New Train</h5>
            </div>
          </Link>
        </div>

        {/* Modify Train */}
        <div className="col-md-3 mb-4">
          <Link to="/admin/modify-train" className="text-decoration-none">
            <div className="admin-card text-center h-100 shadow-sm p-4">
              <FontAwesomeIcon icon={faEdit} size="3x" className="mb-3" color='black'/>
              <h5 className="card-title text-dark">Manage Trains</h5>
            </div>
          </Link>
        </div>

        {/* View Trains */}
        <div className="col-md-3 mb-4">
          <Link to="/admin/view-trains" className="text-decoration-none">
            <div className="admin-card text-center h-100 shadow-sm p-4">
              <FontAwesomeIcon icon={faSearch} size="3x" className="mb-3" color='black'/>
              <h5 className="card-title text-dark">View All Trains</h5>
            </div>
          </Link>
        </div>

        {/* Modify User */}
        <div className="col-md-3 mb-4">
          <Link to="/admin/modify-user" className="text-decoration-none">
            <div className="admin-card text-center h-100 shadow-sm p-4">
              <FontAwesomeIcon icon={faUserEdit} size="3x" className="mb-3" color='black'/>
              <h5 className="card-title text-dark">Manage Users</h5>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminPortal;
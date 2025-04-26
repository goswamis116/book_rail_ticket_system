import React from 'react';
import { Link } from 'react-router-dom';

const AdminPortal = () => {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 text-center">
          <h2 className="mb-4">Admin Portal</h2>
          <div className="d-grid gap-3">
            <Link to="/admin/add-train" className="btn btn-primary btn-lg">
              Add Train
            </Link>
            <Link to="/admin/modify-train" className="btn btn-warning btn-lg">
              Modify Train
            </Link>
            <Link to="/admin/modify-user" className="btn btn-danger btn-lg">
              Modify User
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPortal;
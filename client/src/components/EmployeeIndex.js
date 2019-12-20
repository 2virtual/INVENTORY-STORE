import React, { Component } from 'react';
import EmployeeTable from './EmployeeTable';


class EmployeeIndex extends Component {
  render() {
    return (
      <div className="container">
        <div className="heading">
          {/* Employees */}
        </div>
        <div className="content">
          <EmployeeTable />
        </div>
      </div>
    );
  }
}

export default EmployeeIndex;
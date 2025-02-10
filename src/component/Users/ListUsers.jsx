import React from "react";

const ListUsers = () => {
  return (
    <div className='min-h-[cal(100vh) -70px] bg-red-400'>
      <div>List of Users</div>
      <table className='border-separated border-spacing-2 border border-gray-400'>
        <thead>
          <tr>
            <th className='border border-gray-300 '>First Name</th>
            <th>Last Name</th>
            <th>Maiden Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Password</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ListUsers;

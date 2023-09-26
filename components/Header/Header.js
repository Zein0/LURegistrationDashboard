import React, { useContext } from 'react';
import './header.css';
import { AdminDataContext } from '../../contexts/AdminDataContext';

const Header = () => {
  const {
    state: { studentRegisteredCourses },
  } = useContext(AdminDataContext);

  return (
    <div className='header-container'>
      <div>
        <h3>{studentRegisteredCourses.user?.full_name}</h3>
        <p>{studentRegisteredCourses.user?.uni_id}</p>
        <p>{studentRegisteredCourses.user?.email}</p>
        <p>
          <b>Total Credits:</b> {studentRegisteredCourses.total}
        </p>
      </div>
    </div>
  );
};

export default Header;

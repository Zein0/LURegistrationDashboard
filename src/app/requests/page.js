'use client';
import DataTable from '../../../components/DataTable/DataTable';
import Drawer from '../../../components/Drawer/Drawer';
import { AdminDataContext } from '../../../contexts/AdminDataContext';
import './requests.css';
import React, { useContext, useEffect } from 'react';

const page = () => {
  const {
    state: { paginatePage },
    actions: { getUsersRegisteredCourses },
  } = useContext(AdminDataContext);

  useEffect(() => {
    getUsersRegisteredCourses();
  }, [paginatePage]);

  return (
    <div className='dashboard-container'>
      <Drawer />
      <DataTable />
    </div>
  );
};

export default page;

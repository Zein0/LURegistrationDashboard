'use client';
import React, { useContext, useEffect } from 'react';
import { AdminDataContext } from '../../../../../../contexts/AdminDataContext';
import TemporaryDrawer from '../../../../../../components/Drawer/Drawer';
import CoursesTable from '../../../../../../components/CoursesTable/CoursesTable';
import { Box, Button, CircularProgress } from '@mui/material';
import './courses.css';
import Header from '../../../../../../components/Header/Header';

const page = ({ params }) => {
  const { id } = params;
  const {
    state: { studentRegisteredCourses },
    actions: { getStudentRegisteredCourses, approveCourses },
  } = useContext(AdminDataContext);

  useEffect(() => {
    getStudentRegisteredCourses(id);
  }, []);

  return (
    <div
      className={`${
        studentRegisteredCourses.loading ? 'courses-container-empty' : ''
      } courses-container`}
    >
      <TemporaryDrawer />
      <Header />
      {studentRegisteredCourses.loading ? (
        <Box className='courses-loading-container'>
          <CircularProgress />
        </Box>
      ) : (
        <div>
          <div className='courses-table-courses-container'>
            {studentRegisteredCourses.data.map((data, key) => {
              return <CoursesTable key={key} data={data} />;
            })}
          </div>
          <div className='courses-btn-container'>
            <Button
              variant='contained'
              className='courses-btn'
              onClick={() => approveCourses(id)}
              disabled={studentRegisteredCourses.submitLoading}
            >
              Approve
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default page;

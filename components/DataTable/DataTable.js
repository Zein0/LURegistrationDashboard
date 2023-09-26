import './dataTable.css';
import React, { useContext } from 'react';
import { AdminDataContext } from '../../contexts/AdminDataContext';
import { Button, CircularProgress, Pagination } from '@mui/material';
import { useRouter } from 'next/navigation';

const DataTable = () => {
  const router = useRouter();

  const {
    state: { registeredCourses },
    actions: { setPaginatePage },
  } = useContext(AdminDataContext);

  const viewStudentDetails = (studentId) => {
    router.push(`/requests/user/${studentId}/courses`);
  };

  return (
    <div className='data-table-wrapper'>
      <table className='data-table'>
        <thead>
          <tr className='data-table-header-row'>
            <th className='data-table-header'>Id</th>
            <th className='data-table-header'>Name</th>
            <th className='data-table-header'>Email</th>
            <th className='data-table-header'></th>
          </tr>
        </thead>
      </table>
      <div className='table-scroll'>
        {!registeredCourses?.data?.data ? (
          <div className='data-table-spinner-container'>
            <CircularProgress />
          </div>
        ) : (
          <table className='data-table'>
            <tbody>
              {registeredCourses?.data?.data.map((course, key) => {
                return (
                  <tr key={key} className='data-table-row'>
                    <td className='data-table-data'>{course.uni_id}</td>
                    <td className='data-table-data'>{course.full_name}</td>
                    <td className='data-table-data'>{course.email}</td>
                    <td className='data-table-data data-table-btn-data'>
                      <Button
                        variant='contained'
                        className='data-table-btn'
                        onClick={() => viewStudentDetails(course.id)}
                      >
                        View Details
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
      {registeredCourses?.data?.last_page > 1 && (
        <div className='data-table-pagination'>
          <Pagination
            count={registeredCourses?.data?.last_page}
            showFirstButton
            showLastButton
            onChange={(e, p) => {
              setPaginatePage(p);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default DataTable;

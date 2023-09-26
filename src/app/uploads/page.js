'use client';
import Drawer from '../../../components/Drawer/Drawer';
import DropZone from '../../../components/DropZone/DropZone';
import './uploads.css';
import React from 'react';

const page = () => {
  return (
    <div className='uploads-container'>
      <Drawer />
      <DropZone />
    </div>
  );
};

export default page;

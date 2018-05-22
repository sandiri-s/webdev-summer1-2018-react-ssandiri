import React from 'react';
import ReactDOM from 'react-dom';
import CourseManager from './containers/CourseManager';
import CourseList from './containers/CourseList';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';



ReactDOM.render(
  <div className="">
    <CourseManager/>
  </div>,
  document.getElementById('root')
);

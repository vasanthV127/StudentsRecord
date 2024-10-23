import React from 'react';
import Sidebar from './Sidebar';

import './InterviewBotPage.css';
import MainContent from './MainContent.js' ;

const InterviewBotPage = () => {
  return (
    <div className="flex flex-col  ">


    

      
      <Sidebar  />

    

      <MainContent/>

      
  
    </div>
  );
};

export default InterviewBotPage;
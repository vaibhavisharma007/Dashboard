import React from 'react'
import {Box,useMediaQuery} from '@mui/material';
import Navbar from 'components/NavBar';
import {Outlet} from 'react-router-dom';
import {useSelector} from 'react-redux';
import Sidebar from 'components/Sidebar';

import { useGetUserQuery } from 'state/api';

const Layout = () => {
  const isNonMobile=useMediaQuery('(min-width:600px)');//true for desktop and false for mobile
  const [isSidebarOpen,setIsSidebarOpen]=React.useState(true);
  const userId=useSelector((state)=>state.global.userId);
  const {data}=useGetUserQuery(userId);
  // console.log("🚀 ~ Layout ~ userId:", userId)
  // console.log("🚀 ~ Layout ~ data:", data)
  return (
    // width="100%" height="100%"  its for  taking full h and w and flex is for side by side in desktop and stacked in mobile kinda
    <Box width="100%" height="100%" display={isNonMobile ? "flex":"block"}>{/* can pass styling like inline css otherwise it should be sx*/}
      <Sidebar 
      // the empty object as users because of if undefined
      user ={data || {}}
      isNonMobile={isNonMobile}
      drawerWidth="250px"
      isSidebarOpen={isSidebarOpen}
      setIsSidebarOpen={setIsSidebarOpen}
      />
      {/*  in the navbar it is wrapped around  box with flex  The flexGrow={1} Box (main content) grows to fill all remaining space*/}
      <Box flexGrow={1} >
        <Navbar 
      user={data || {}}
      isSidebarOpen={isSidebarOpen}
      setIsSidebarOpen={setIsSidebarOpen}/>
      {/* This is where nested routes will render in the layout component because of  Outlet */}
      <Outlet/>
      </Box>
    </Box>  
  )
}

export default Layout;
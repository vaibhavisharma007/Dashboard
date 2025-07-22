import React from 'react'
import {
    Box,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    useTheme,
  } from "@mui/material";           


import {
    SettingsOutlined,
    ChevronLeft,
    ChevronRightOutlined,
    HomeOutlined,
    ShoppingCartOutlined,
    Groups2Outlined,
    ReceiptLongOutlined,
    PublicOutlined,
    PointOfSaleOutlined,
    TodayOutlined,
    CalendarMonthOutlined,
    AdminPanelSettingsOutlined,
    TrendingUpOutlined,
    PieChartOutlined,
    
  } from "@mui/icons-material"; 

import {useEffect,useState} from 'react';
import {useLocation,useNavigate} from 'react-router-dom';
import FlexBetween from './FlexBetween';
import profileImage from 'assets/profile_image.jpg';

export const navItems=[
  {
    text:"Dashboard",
    icon:<HomeOutlined/>
  },
  {
    text:"Client Facing",
    icon:null,
  },
  {
    text:"Products",
    icon:<ShoppingCartOutlined/>,
  },
  {
    text:"Customers",
    icon:<Groups2Outlined/>,
  },
  {
    text:"Transactions",
    icon:<ReceiptLongOutlined/>
  },
  {
    text:"Geography",
    icon:<PublicOutlined/>
  },
  {
    text:"Sales",
    icon:null
  },
  {
    text:"Overview",
    icon:<PointOfSaleOutlined/>
  },
  {
    text:"Daily",
    icon:<TodayOutlined/>
  },
  {
    text:"Monthly",
    icon:<CalendarMonthOutlined/>
  },
  {
    text:"Breakdown",
    icon:<PieChartOutlined/>
  },
  {
    text:"Management",
    icon:null
  },
  {
    text:"Admin",
    icon:<AdminPanelSettingsOutlined/>
  },
  {
    text:"Performance",
    icon:<TrendingUpOutlined/>
  }, 
]

const Sidebar = ({user,drawerWidth,isSidebarOpen,setIsSidebarOpen,isNonMobile}) => {
    const {pathname}=useLocation();// gives current URL like "/dashboard"
    const [active,setActive]=useState("");
    const navigate=useNavigate();  // lets us move to another page programmatically
    const theme=useTheme();

    useEffect(()=>{
        setActive(pathname.substring(1));    // whenever URL (pathname) changes, this runs
    // we're removing the "/" from the path to get just "dashboard"
    },[pathname])
  return (
    <Box component="nav" >
        {isSidebarOpen && (
          // open:Controls visibility of the drawer and onClose with the callback variant persistent for keep the drawer open until manually closed anchor left so it comes from left
            <Drawer open={isSidebarOpen} onClose={()=>setIsSidebarOpen(false)} variant="persistent" anchor="left" sx={{
                width:drawerWidth,"& .MuiDrawer-paper":{
                  // “Apply the following styles to the .MuiDrawer-paper class inside this component.”
                    color:theme.palette.secondary[200],
                    backgroundColor:theme.palette.background.alt,
                    boxSixing: "border-box",
                    borderWidth: isNonMobile ? 0 : "2px",
                    width: drawerWidth,
                }
            }} > 
              <Box width="100%" >
                {/* the icon with the title heading and a close icon */}
                <Box m="1.5rem 2rem 2rem 3rem" >
                    <FlexBetween color={theme.palette.secondary.main}>
                      <Box display="flex"  alignItems="center" gap="0.5rem" >
                        <Typography variant='h4' fontWeight="bold"  >
                          ECOMVISION
                        </Typography>
                      </Box>
                      {!isNonMobile && (
                        <IconButton onClick={()=>{setIsSidebarOpen(!isSidebarOpen)}} >
                          <ChevronLeft/>
                        </IconButton>
                      )} 
                    </FlexBetween>
                </Box>

                {/* 1. User clicks a sidebar item 👉 calls navigate("/dashboard")
                    2. React Router updates the URL 👉 location.pathname becomes "/dashboard"
                    3. useLocation() sees the change 👉 returns new pathname
                    4. useEffect() runs automatically 👉 updates `active` state
                    5. Sidebar now highlights the new item 👉 reflects the current page */}


                {/* the list of items */}
                <List>
                  {navItems.map(({text,icon})=>{
                    if(!icon) {
                      return (
                        <Typography key={text} sx={{ m :"2.25rem 0 1rem 3rem "}} >{text}</Typography>
                      )
                    }
                    const lcText=text.toLowerCase();

                    return (
                      <ListItem key={text} disablePadding >
                        <ListItemButton onClick={()=>{navigate(`/${lcText}`)
                          setActive(lcText)
                        }} 
                        // cause as we have the navigation url that becomes active so that why we have that text in active
                        sx={{
                         backgroundColor:active ===lcText ? theme.palette.secondary[300]: "transparent",
                         color:active ===lcText ? theme.palette.primary[600]: theme.palette.secondary[100],
                        }}
                        >
                          <ListItemIcon sx={{ ml:"2rem",color: active===lcText ? theme.palette.primary[600] : theme.palette.secondary[200]}}>
                            {icon}
                          </ListItemIcon>
                          <ListItemText primary ={text} />
                            {active === lcText && (
                              <ChevronRightOutlined sx={{ ml:"auto"}}/>
                            )}
                        </ListItemButton>
                      </ListItem>
                    )
                  })}
                </List>
              </Box>
              <Box bottom="2rem" >
                  <Divider/>
                  <FlexBetween textTransform="none" gap="1rem" m="1.5rem 2rem 0 3rem" > 
                      <Box component="img" alt="profile" src={profileImage} height="40px" width="40px" borderRadius="50%" sx={{objectFit:"cover"}} />
                        <Box textAlign="left">
                          <Typography fontWeight="bold" fontSize="0.9rem" sx={{color:theme.palette.secondary[100]}} >{user.name}</Typography>
                          <Typography fontSize="0.8rem" sx={{color:theme.palette.secondary[200]}} >{user.occupation}</Typography>
                        </Box>
                        <SettingsOutlined sx={{color:theme.palette.secondary[300],fontSize:"25px"}} />
                      
                  </FlexBetween>
              </Box>
            </Drawer>
        )}
    </Box>
  )
}

export default Sidebar
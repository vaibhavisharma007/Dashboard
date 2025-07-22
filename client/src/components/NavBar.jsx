import React from 'react';

import { LightModeOutlined ,DarkModeOutlined,Menu as MenuIcon,Search,SettingsOutlined,ArrowDropDownOutlined} from '@mui/icons-material';
import FlexBetween from './FlexBetween';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {setMode} from 'state';
import profileImage from 'assets/profile_image.jpg';
import { useTheme } from '@mui/material/styles';
import { AppBar,InputBase,Toolbar,Button } from '@mui/material';
import { IconButton } from '@mui/material';
import {MenuItem} from '@mui/material';
import {Menu} from '@mui/material';
import { Box, Typography } from '@mui/material';
import { useState } from 'react';

import {navItems} from './Sidebar';
const NavBar = ({user,isSidebarOpen,setIsSidebarOpen}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const theme=useTheme();
    const [anchorEl, setAnchorEl] = useState(null);
    const [search,setSearch]=useState('');
    const routePaths=navItems
    .filter(item=>item.icon!==null)
    .map(item=>item.text.toLowerCase());
    const isOpen=Boolean(anchorEl);
    const handleClick=(event)=>{
        setAnchorEl(event.currentTarget);
    };
    const handleClose=()=>{
        setAnchorEl(null);
    };
    const handleSearch=()=>{
        const route=search.trim().toLowerCase();
        if(routePaths.includes(route)){
            navigate(`${route}`);
        }
        else{
            alert(`No matching page found for "${search}"`);
        }

        setSearch("");
    }

  return (
    // AppBar is :it as the shell for your navbar and AppBar stays in normal flow — scrolls with the page with static position
    <AppBar sx={{position:"static",background:"none",boxShadow:"none"}} >
        {/* Toolbar is a flex container inside AppBar that helps align and space out its children. */}
        <Toolbar sx={{justifyContent:"space-between"}} >
            {/* LEFT SIDE */}
            <FlexBetween>
                <IconButton onClick={()=>setIsSidebarOpen(!isSidebarOpen)} >
                    <MenuIcon/>
                </IconButton>
                <FlexBetween backgroundColor={theme.palette.background.alt} borderRadius="9px" gap="3rem" p="0.1rem 1.5rem">
                    <InputBase placeholder="Search..." onChange={(e)=>setSearch(e.target.value)} onKeyDown={(e)=>{if(e.key==="Enter")handleSearch()}} />
                    <IconButton>
                        <Search onClick={handleSearch} />
                    </IconButton>
                </FlexBetween>
            </FlexBetween>
            {/*Right Side*/}
             <FlexBetween>
                <IconButton onClick={()=>dispatch(setMode())}>
                    {theme.palette.mode==="dark" ? (
                        <DarkModeOutlined sx={{fontSize:"25px"}} />
                    ):<LightModeOutlined sx={{fontSize:"25px"}}/>}
                </IconButton>
                <IconButton>
                    <SettingsOutlined sx={{fontSize:"25px"}}/>
                </IconButton>

                <FlexBetween>
                    <Button onClick={(e)=>{handleClick(e)}} sx={{display:"flex", justifyContent:"space-between",alignItems:"center",textTransform:"none",gap:"1rem"}}>
                        <Box component="img" alt="profile" src={profileImage} height="32px" width="32px" borderRadius="50%" sx={{objectFit:"cover"}} />
                        <Box textAlign="left">
                          <Typography fontWeight="bold" fontSize="0.85rem" sx={{color:theme.palette.secondary[100]}} >{user.name}</Typography>
                          <Typography fontSize="0.75rem" sx={{color:theme.palette.secondary[200]}} >{user.occupation}</Typography>
                        </Box>
                        {/* ArrowDropDownOutlined is used to indicate a dropdown menu */}
                          <ArrowDropDownOutlined sx={{fontSize:"1.5rem", color:theme.palette.secondary[300]}} />
                        
                    </Button>
                    <Menu anchorEl={anchorEl} open={isOpen} onClose={handleClose} anchorOrigin={{vertical:"bottom",horizontal:"left"}}>
                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                        <MenuItem onClick={handleClose}>Settings</MenuItem>
                        <MenuItem onClick={handleClose}>Logout</MenuItem>
                    </Menu>
                </FlexBetween>
             </FlexBetween>
        </Toolbar>
    </AppBar>
  )
}

export default NavBar
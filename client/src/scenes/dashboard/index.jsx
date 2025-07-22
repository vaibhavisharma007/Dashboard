import React from 'react'
import FlexBetween from 'components/FlexBetween';
import Header from 'components/Header';
import { DownloadOutlined,Email,PointOfSale,PersonAdd,Traffic } from '@mui/icons-material';
import {Box,Button,Typography,useTheme,useMediaQuery} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import BreakdownChart from 'components/BreakDownChart';
import OverviewChart from 'components/OverviewChart';
import { useGetDashboardDataQuery } from 'state/api';
import StatBox from 'components/StatBox';
const Dashboard = () => {
  const theme=useTheme();
  const isNonMediumScreen=useMediaQuery("(min-width:1200px)");
  const {data,isLoading}=useGetDashboardDataQuery();
  console.log(data);
   const columns = [
    { field: "_id", headerName: "ID", flex: 1 },
    { field: "userId", headerName: "User ID", flex: 1 },
    {
      field: "products",
      headerName: "# of Products",
      flex: 0.5,
      sortable: false,
      renderCell: (params) => params.value.length || 0,
    },
    {
      field: "cost",
      headerName: "Cost",
      flex: 1,
      renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
    },
  ];

  return (
    <Box m="1.5rem 2.5rem" >
      <FlexBetween>
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard"  />

        <Box>
          <Button sx={{
            backgroundColor:theme.palette.secondary.light,
            color:theme.palette.background.alt,
            fontSize:"14px",
            fontWeight:"bold",
            padding:"10px 20px",

          }} >
            <DownloadOutlined sx={{ mr:"10px"}} />
            Download Reports</Button>


        </Box>
      </FlexBetween>

      <Box mt="20px" 
      display="grid"
      gridTemplateColumns="repeat(12,1fr)" 
      gridAutoRows="160px"
      gap="20px"
      sx={{
        "& > div" :{gridColumn : isNonMediumScreen? undefined : "span 12"  }
      }}
      >
        {/* ROW 1 */}
        <StatBox title="Total Customers" value={data && data.totalCustomers} increase="+14%" description="Since last month" icon={<Email sx={{color:theme.palette.secondary[300],fontSize:"26px"}} />} />
        <StatBox title="Total Sales" value={data && data.todayStats.totalSales} increase="+10%" description="Since last month" icon={<PointOfSale sx={{color:theme.palette.secondary[300],fontSize:"26px"}} />} />
        <Box gridColumn="span 8" gridRow="span 2" backgroundColor={theme.palette.background.alt} p="1rem" borderRadius="0.55rem">
          <OverviewChart view="sales" isDashboard={true} />
        </Box>
        <StatBox title="Monthly Sales" value={data && data.thisMonthStats.totalSales} increase="+20%" description="This month" icon={<Traffic sx={{color:theme.palette.secondary[300],fontSize:"26px"}} />} />
        <StatBox title="Yearly Sales" value={data && data.yearlySalesTotal} increase="+43%" description="This year" icon={<PersonAdd sx={{color:theme.palette.secondary[300],fontSize:"26px"}} />} />
        
        {/* ROW 2 */}
        <Box gridColumn="span 8"
        gridRow="span 3"
        sx={{
          "& .MuiDataGrid-root": { border: "none",
            borderRadius:"0.55rem",
           },
          "& .MuiDataGrid-cell": { borderBottom: "none" },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.primary.alt,
            color: theme.palette.secondary[100],
            
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.background.alt,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[100]} !important`,
            
          },
        }}
        
        >
          <DataGrid 
          loading={isLoading}
          getRowId={(row) => row._id}
          rows={(data && data.transactions) || []}
          columns={columns}
          />
        </Box>
        <Box 
        gridColumn="span 4"
        gridRow="span 2"
        backgroundColor={theme.palette.background.alt}
        p="1.5rem"
        borderRadius="0.55rem"

         >
          <Typography variant='h6' sx={{color:theme.palette.secondary[100]}}>Sales By Category</Typography>
          <BreakdownChart isDashboard={true} />
          <Typography p="0 0.6rem" fontSize="0.8rem" sx={{color:theme.palette.secondary[200]}} >
            BreakDown of sales by product category
          </Typography>

         </Box>


      </Box>
    </Box>
  )
}

export default Dashboard;
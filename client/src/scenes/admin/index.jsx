import React from 'react'
import Header from 'components/Header'
import { useGetAdminsQuery } from 'state/api'
import {Box,useTheme } from "@mui/material"
import { DataGrid } from '@mui/x-data-grid'
const Admin = () => {
  const { data, isLoading} = useGetAdminsQuery();
  const theme = useTheme();

  
  const columns=[
    {field: '_id', headerName: 'ID', flex:1},
    {field: 'name', headerName: 'Name', flex:0.5},
    {field: 'email', headerName: 'Email', flex:1},
    {field:"phoneNumber", headerName: 'Phone Number', flex:0.5 ,renderCell:(params)=>{
      return params.value.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
    }},
    {field: 'country', headerName: 'Country', flex:0.4},
    {field: 'occupation', headerName: 'Occupation', flex:1},
    {field: 'role', headerName: 'Role', flex:0.5},
  ]
  return (
    <Box m="1.5rem 2rem">
      <Header title="Admins" subtitle="List of all admins" />
      <Box mt="40px" height="75vh" sx={{ 
        "& .MuiDataGrid-root": {
          border:"none"
        }
        ,"& .MuiDataGrid-cell": {
          borderBottom:"none"
        },
        "& .MuiDataGrid-columnHeader": {
          backgroundColor: theme.palette.background.alt,
          color: theme.palette.secondary[100],
          borderBottom: "none"
        },
        "& .MuiDataGrid-virtualScroller": {
          backgroundColor: theme.palette.primary.light
        },
        "& .MuiDataGrid-footerContainer": {
          borderTop:"none",
          color: theme.palette.secondary[100],
          backgroundColor: theme.palette.background.alt,
        },
        "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
          color: `${theme.palette.secondary[100]} !important`,
      }}}>
        {/* DataGrid is a component from MUI that displays data in a table format */}
        {/* rows is the data to be displayed, columns defines the structure of the table */}
        <DataGrid
          loading={isLoading || !data}
          rows={data || []}
          columns={columns}
          getRowId={(row) => row._id}
          
        />
      </Box>
    </Box>
  )
}

export default Admin
import React, { useState } from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid"; 
import { TextField } from "@mui/material";
import { useGetTransactionsQuery } from "state/api";
import Header from "components/Header";

const Transactions = () => {
  const theme = useTheme();

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sortModel, setSortModel] = useState([]);
  const [search, setSearch] = useState("");
  const [searchValue, setSearchValue] = useState("");

  // Debounce search to avoid too many API calls
  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      setSearch(searchValue);
      setPage(0); // Reset to first page when searching
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [searchValue]);

  const { data, isLoading, error } = useGetTransactionsQuery({
    page: page + 1, // Backend expects 1-based page numbers
    pageSize,
    sort: sortModel[0] ? JSON.stringify(sortModel[0]) : "",
    
    search,
  });
  console.log("sortmodel",sortModel[0]);
  

  console.log("Current state:", { page, pageSize, sortModel, search });
  console.log("API Response:", data);

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

  if (error) {
    console.error('API Error:', error);
  }

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="TRANSACTIONS" subtitle="Entire list of transactions" />
      
      {/* Search Box */}
      <Box mb="1rem">
        <TextField
          label="Search transactions..."
          variant="outlined"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          sx={{ width: "300px" }}
        />
      </Box>

      <Box
        height="80vh"
        sx={{
          "& .MuiDataGrid-root": { border: "none" },
          "& .MuiDataGrid-cell": { borderBottom: "none" },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          loading={isLoading}
          getRowId={(row) => row._id}
          rows={(data && data.transactions) || []}
          columns={columns}
          
          // ✅ FIXED: Updated pagination props for newer MUI versions
          paginationModel={{ page, pageSize }}
          onPaginationModelChange={(model) => {
            console.log("🔥 Pagination model changed:", model);
            setPage(model.page);
            setPageSize(model.pageSize);
          }}
          
          // ✅ FIXED: Proper pagination setup
          rowCount={(data && data.total) || 0}
          paginationMode="server"
          pageSizeOptions={[10, 20, 50, 100]}
          
          // ✅ FIXED: Sorting Setup
          sortingMode="server"
          sortModel={sortModel}
          onSortModelChange={(newSortModel) => {
            console.log("🔥 Sort model changed:", newSortModel);
            setSortModel(newSortModel);
            setPage(0); // Reset to first page when sorting
          }}
        />
      </Box>

      {data && (
        <Box mt="1rem" p="1rem" bgcolor="background.paper" borderRadius="4px">
          <strong>Debug Info:</strong>
          <p>Frontend State - Page: {page + 1}, PageSize: {pageSize}</p>
          <p>API Request - Page: {page + 1}, PageSize: {pageSize}</p>
          <p>API Response - Total: {data.total}, Pages: {data.totalPages}, Showing: {data.transactions?.length}</p>
          <p>Expected Range: {(page * pageSize) + 1}-{Math.min((page + 1) * pageSize, data.total)} of {data.total}</p>
          <p>Current Sort: {sortModel.length > 0 ? JSON.stringify(sortModel[0]) : "None"}</p>
          <p>Current Search: "{search}"</p>
        </Box>
      )}
    </Box>
  );
};

export default Transactions;
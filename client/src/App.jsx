import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector} from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { themeSettings } from "theme";
import Layout from "scenes/layout";
import Dashboard from "scenes/dashboard";
import Customers from "scenes/customers";
import Products from "scenes/products";
import Transactions from "scenes/transactions";
import Geography from "scenes/geography";
import Overview from "scenes/overview";
import Daily from "scenes/daily";
import Monthly from "scenes/monthly";
import Breakdown from "scenes/breakdown";
import Admin from "scenes/admin";
import Performance from "scenes/performance";
function App() {
  //useSelector is used to access the global state
  // 1. Get mode ('light' or 'dark') from Redux
  const mode = useSelector((state) => state.global.mode);
  // 2. Create the theme object ONLY when mode changes
  const theme=useMemo(()=>createTheme(themeSettings(mode)),[mode]);
  return (
    <div>
      <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
         {/* CssBaseline resets browser styles for a clean, consistent look across your app */}
        <Routes>
          <Route element={<Layout/>} >
            <Route path="/" element={<Navigate to="/dashboard" replace />} />{/* redirect to dashboard page and replace the url that means the page will not be added to the history so you will not go to lets say login page again it doesnt remeber previous pages */}
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="/customers" element={<Customers/>} />
            <Route path="/products" element={<Products/>} />
            
            <Route path="/transactions" element={<Transactions/>} />
            <Route path="/geography" element={<Geography/>} />
            <Route path="/overview" element={<Overview/>} />
            <Route path="/daily" element={<Daily/>} />
            <Route path="/monthly" element={<Monthly/>} />
            <Route path="/breakdown" element={<Breakdown/>} />
            <Route path="/admin" element={<Admin/>} />
            <Route path="/performance" element={<Performance/>} />
          </Route>
        </Routes>
      </ThemeProvider>
      </BrowserRouter>

    </div>
  );
}

export default App;

import ReactDOM from "react-dom/client";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import { MantineProvider, createTheme } from "@mantine/core";
import { Notifications } from "@mantine/notifications";

import "./index.css";

// pages
import {
  Loginpage,
  Dashboard,
  DashboardLayout,
  Warehouse,
  Categories,
  Vendor,
  Products,
  Employees,
  Customers,
  Shops,
  Settings,
} from "./pages/index.ts";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const theme = createTheme({});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <MantineProvider theme={theme}>
    <Notifications position="top-right" />

    <QueryClientProvider client={new QueryClient({})}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Loginpage />} />

          <Route
            path="/dashboard"
            element={
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            }
          />

          <Route
            path="/warehouse"
            element={
              <DashboardLayout>
                <Warehouse />
              </DashboardLayout>
            }
          />

          <Route
            path="/category"
            element={
              <DashboardLayout>
                <Categories />
              </DashboardLayout>
            }
          />
          <Route
            path="/vendor"
            element={
              <DashboardLayout>
                <Vendor />
              </DashboardLayout>
            }
          />
          <Route
            path="/products"
            element={
              <DashboardLayout>
                <Products />
              </DashboardLayout>
            }
          />
          <Route
            path="/employees"
            element={
              <DashboardLayout>
                <Employees />
              </DashboardLayout>
            }
          />
          <Route
            path="/customer"
            element={
              <DashboardLayout>
                <Customers />
              </DashboardLayout>
            }
          />
          <Route
            path="/shops"
            element={
              <DashboardLayout>
                <Shops />
              </DashboardLayout>
            }
          />
          <Route
            path="/settings"
            element={
              <DashboardLayout>
                <Settings />
              </DashboardLayout>
            }
          />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </MantineProvider>
);

"use client";

import PropTypes from "prop-types";
// auth
import { AuthGuard } from "@/app/(RSAdmin)/admin/auth/guard";
// components
import DashboardLayout from "@/app/(RSAdmin)/admin/layouts/dashboard";

// ----------------------------------------------------------------------

export default function Layout({ children }) {
  return <AuthGuard>
    <DashboardLayout>{children}</DashboardLayout>
  </AuthGuard>;
}

Layout.propTypes = {
  children: PropTypes.node,
};

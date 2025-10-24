import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

export default function DashboardLayout() {
  return (
    <div style={{ display: 'flex', gap: 20 }}>
      <aside style={{ minWidth: 180, padding: 10, background: '#f7f7f7' }}>
        <h3>Dashboard</h3>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <NavLink to="/dashboard" end>Home</NavLink>
          <NavLink to="/dashboard/settings">Settings</NavLink>
          <NavLink to="/dashboard/reports">Reports</NavLink>
        </nav>
      </aside>
      <main style={{ flex: 1, padding: 10 }}>
        <Outlet />
      </main>
    </div>
  );
}

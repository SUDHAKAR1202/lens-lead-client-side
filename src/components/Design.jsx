import React, { useState } from "react";
import {
  Home, Building2, Users, Layers, MessageSquare,
  HelpCircle, Wallet, BarChart, Settings, ChevronLeft,
  ChevronRight, Bell, MessageCircle, User
} from "lucide-react";
import { Link, Outlet, useLocation } from "react-router-dom";



export default function Layout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const menuItems = [
    { icon: Home, label: "Dashboard", path: "/dashboard" },
    { icon: Wallet, label: "Dues", path: "/dues" },
    { icon: Building2, label: "Society", path: "#" },
    { icon: Users, label: "People Hub", path: "#" },
    { icon: Layers, label: "MyGate Club", path: "#" },
    { icon: MessageSquare, label: "Communications", path: "#" },
    { icon: HelpCircle, label: "Help Desk", path: "#" },
    { icon: BarChart, label: "Financial Reports", path: "#" },
    { icon: Settings, label: "Settings", path: "#" },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`${collapsed ? "w-20" : "w-64"} bg-white shadow-md transition-all duration-300`}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b">
          
          <span className="text-xl font-bold text-red-500">
            {!collapsed && <img src="/MyGate.png" alt="" />}
          </span>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1 rounded hover:bg-gray-200"
          >
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>
        <nav className="mt-4">
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.path}
                  className={`flex items-center px-4 py-2 hover:bg-red-50 hover:text-red-500
                    ${location.pathname === item.path ? "text-red-500 font-semibold" : "text-gray-700"}
                  `}
                >
                  <item.icon className="w-5 h-5" />
                  {!collapsed && <span className="ml-3">{item.label}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        
        <header className="flex justify-between items-center bg-white px-6 py-3 shadow">
          <div className="flex items-center space-x-2">
            <fieldset>
              <legend>Select Society</legend>
              
            <select className="border rounded px-2 py-1">
              <option><b>Autumn Ridge Apts</b></option>
            </select>&nbsp;
             <span className="text-sm text-gray-500"><b>2025-2026</b></span>
            </fieldset>
           
          </div>
          <div className="flex items-center space-x-4">
            <button className="px-3 py-1 bg-red-100 text-red-600 rounded-full flex flex-items-center gap=2">
              <MessageCircle size={14} />&nbsp;
              <b>Chat with us</b>
            </button>
            <button className="px-3 py-1 bg-pink-100 text-pink-600 rounded">
              <b> FAQ</b>
            </button>

            <Bell className="w-6 h-6 text-gray-600" />
            <div className="w-10 h-9 flex items-center justify-center rounded-full bg-red-500 text-white">
             <User />

            </div>
      
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
}

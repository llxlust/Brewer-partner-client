import { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function PrivateLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-gray-800 text-white transform transition-transform duration-300 ease-in-out
          ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:relative md:translate-x-0`}
      >
        <div className="p-4 flex items-center justify-between md:hidden">
          <h1 className="text-lg font-bold">Brewer Partner</h1>
          <button onClick={toggleSidebar}>
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="hidden md:block p-4 text-xl font-bold">
          Brewer Partner
        </div>

        <nav className="space-y-2 px-4">
          <NavLink
            to="/private/dashboard"
            end
            className={({ isActive }) =>
              `block px-3 py-2 rounded-md ${
                isActive ? "bg-blue-500" : "hover:bg-gray-700"
              }`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/private/coupons-scanner"
            className={({ isActive }) =>
              `block px-3 py-2 rounded-md ${
                isActive ? "bg-blue-500" : "hover:bg-gray-700"
              }`
            }
          >
            Coupons-scanner
          </NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white shadow-md px-4 py-3 flex items-center md:hidden">
          <button onClick={toggleSidebar}>
            <Menu className="h-6 w-6" />
          </button>
          <h2 className="ml-4 text-lg font-semibold">Dashboard</h2>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto bg-gray-100 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

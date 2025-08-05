import { useContext, useEffect, useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { LuLoaderCircle } from "react-icons/lu";
import { SessionContext } from "../stores/context";
import { useAuth } from "../hooks/useAuth";
export default function PrivateLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  const { partnerLoginByToken } = useAuth();
  const { isLoader, setIsLoader } = useContext(SessionContext);
  const naviagate = useNavigate();
  const loginByTokenHandler = async () => {
    setIsLoader(true);
    const res = await partnerLoginByToken();
    setIsLoader(false);
    if (!res.success) {
      naviagate("/");
      return;
    }
    setIsLogin(true);
  };
  useEffect(() => {
    loginByTokenHandler();
  }, []);
  return (
    <>
      {isLogin && (
        <>
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
          {isLoader && (
            <>
              <div className="w-full h-[100svh] absolute top-0 left-0 z-1000 bg-main flex justify-center items-center">
                <span className="text-6xl text-white animate-spin">
                  <LuLoaderCircle />
                </span>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}

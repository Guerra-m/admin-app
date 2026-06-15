import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Footer } from "../ui/footer/Footer";
import { Sidebar } from "../ui/Sidebar";

export const MainLayout = () => {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">

      {/* Header móvil */}
      <header className="lg:hidden bg-white shadow p-4">
        <button
          onClick={() => setSidebarOpen(true)}
          className="flex items-center"
        >
          <span className="material-symbols-outlined">
            menu
          </span>
        </button>
      </header>

      <div className="flex flex-1">

        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <main className="flex-1 p-4 bg-gray-100">
          <Outlet />
        </main>

      </div>

      <Footer />

    </div>
  );
};
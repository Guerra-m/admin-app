import { Outlet } from "react-router-dom";
import { Footer } from "../ui/footer/Footer";
import { Sidebar } from "../ui/Sidebar";

export const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">

      

      <div className="flex flex-1">

        <Sidebar />

        <main className="flex-1 p-4 bg-gray-100">
          <Outlet />
        </main>

      </div>

      <Footer />

    </div>
  );
};
import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

export const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">

      <Header />

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
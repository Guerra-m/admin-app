import { Outlet } from "react-router-dom"
import { Footer } from "../components/layout/Footer"
import { Header } from "../components/layout/Header"

export const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header></Header>
      <main className="flex-1 p-4">
        <Outlet></Outlet>
      </main>
      <Footer></Footer>
    </div>


  )
}

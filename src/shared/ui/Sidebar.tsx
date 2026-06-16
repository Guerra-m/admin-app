import type { Dispatch, SetStateAction } from "react";
import { Navbar } from "./Navbar";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
}

export const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  return (
    <>
      {/* Fondo oscuro */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 z-50
          w-64 h-screen
          bg-surface-container-low
          text-on-surface
          p-container-padding-admin
          shadow-warm
          flex flex-col
          overflow-y-auto
          transform transition-transform duration-300

          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}

          lg:translate-x-0
          lg:sticky lg:top-0
        `}
      >

        <button
  onClick={() => setSidebarOpen(!sidebarOpen)}
  className="
    lg:hidden
    flex flex-col
    justify-center
    items-center
    gap-1.5

    w-12
    h-12

    rounded-lg

    bg-primary
    shadow-lg

    transition-all
    duration-300
  "
>
  <span
    className={`
      block h-0.5 w-6 bg-white
      transition-all duration-300

      ${
        sidebarOpen
          ? "rotate-45 translate-y-2"
          : ""
      }
    `}
  />

  <span
    className={`
      block h-0.5 w-6 bg-white
      transition-all duration-300

      ${
        sidebarOpen
          ? "opacity-0"
          : "opacity-100"
      }
    `}
  />

  <span
    className={`
      block h-0.5 w-6 bg-white
      transition-all duration-300

      ${
        sidebarOpen
          ? "-rotate-45 -translate-y-2"
          : ""
      }
    `}
  />
</button>

        <div className="mb-8">
          <div className="flex items-center gap-3 m-5">
            <div
              className="
                flex items-center justify-center
                w-11 h-11
                rounded-xl
                bg-primary
                shadow-warm
              "
            >
              <span
                className="
                  material-symbols-outlined
                  text-on-primary
                  text-[24px]
                "
              >
                restaurant
              </span>
            </div>

            <h1
              className="
                text-2xl
                font-bold
                text-primary
                font-store
              "
            >
              FoodStore
            </h1>
          </div>

          <p className="text-sm text-on-surface-variant px-3">
            Administrador de operaciones
          </p>
        </div>

        <Navbar />

      </aside>
    </>
  );
};
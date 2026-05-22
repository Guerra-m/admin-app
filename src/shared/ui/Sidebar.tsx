import { Navbar } from "./Navbar";

export const Sidebar = () => {
  return (
    <aside
      className="
        w-64
        min-h-screen
        bg-surface-container-low
        text-on-surface
        p-container-padding-admin
        shadow-warm
        flex
        flex-col
      "
    >
      <div className="mb-8">
        {/* LOGO */}
        <div className="flex items-center gap-3 m-5">

          <div
            className="
              flex
              items-center
              justify-center

              w-11
              h-11

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
        
        <p className="text-sm text-on-surface-variant">
          Administrador de operaciones
        </p>
      </div>

      <Navbar />
    </aside>
  );
};
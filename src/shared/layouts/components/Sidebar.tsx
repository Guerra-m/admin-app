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
        <h1 className="text-2xl font-bold text-primary font-store">
          FoodStore Admin
        </h1>
        
        <p className="text-sm text-on-surface-variant">
          Administrador de operaciones
        </p>
      </div>

      <Navbar />
    </aside>
  );
};
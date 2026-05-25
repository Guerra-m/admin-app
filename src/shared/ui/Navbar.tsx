import { NavLink, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../modules/auth/store/authStore";

const links = [
  {
    to: "/dashboard",
    label: "Dashboard",
    icon: "dashboard",
    roles: ["ADMIN"],
  },

  {
    to: "/productos",
    label: "Productos",
    icon: "inventory_2",
    roles: ["ADMIN", "STOCK"],
  },

  {
    to: "/categorias",
    label: "Categorías",
    icon: "category",
    roles: ["ADMIN"],
  },

  {
    to: "/ingredientes",
    label: "Ingredientes",
    icon: "kitchen",
    roles: ["ADMIN", "STOCK"],
  },

  {
    to: "/pedidos",
    label: "Pedidos",
    icon: "receipt_long",
    roles: ["ADMIN", "PEDIDOS"],
  },

  {
    to: "/usuarios",
    label: "Usuarios",
    icon: "group",
    roles: ["ADMIN"],
  },

  {
    to: "/carrito",
    label: "Carrito",
    icon: "shopping_cart",
    roles: [],
  },

  {
    to: "/perfil",
    label: "Mi perfil",
    icon: "person",
    roles: ["ADMIN", "STOCK", "PEDIDOS", ],
  },
  
];

const linkBase = `
  flex
  items-center
  gap-3
  px-4
  py-3
  rounded-md
  transition-all
  duration-200
  font-admin
  text-sm
`;

export const Navbar = () => {

  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();

    navigate("/login", { replace: true });
  };

  const filteredLinks = links.filter((link) =>
    link.roles.some((role) => user?.roles.includes(role))
  );

  return (
    <nav className="flex flex-col gap-1 h-full">

      {filteredLinks.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          className={({ isActive }) =>
            `
              ${linkBase}

              ${
                isActive
                  ? `
                    bg-primary/10
                    text-primary
                    border-r-4
                    border-primary
                    font-semibold
                  `
                  : `
                    text-on-surface-variant
                    hover:bg-surface-container-high
                    hover:text-on-surface
                  `
              }
            `
          }
        >
          <span className="material-symbols-outlined text-[20px]">
            {link.icon}
          </span>

          <span>{link.label}</span>
        </NavLink>
      ))}

      <div className="flex-1" />

      <div className="flex items-center gap-3">
        <button
          onClick={handleLogout}
          className="
            flex
            items-center
            gap-2
            bg-error
            text-on-error
            px-4
            py-2
            mx-3
            m-12
            rounded-md
            font-admin
            font-semibold
            shadow-warm
            hover:opacity-90
            active:scale-95
            transition-all
            duration-200
          "
        >
          <span className="material-symbols-outlined text-[20px]">
            logout
          </span>

          Salir
        </button>
      </div>
    </nav>
  );
};
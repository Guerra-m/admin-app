import { NavLink } from "react-router-dom";

const links = [
  {
    to: "/productos",
    label: "Productos",
    icon: "inventory_2",
  },
  {
    to: "/categorias",
    label: "Categorías",
    icon: "category",
  },
  {
    to: "/ingredientes",
    label: "Ingredientes",
    icon: "kitchen",
  },
  {
    to: "/empleados",
    label: "Empleados",
    icon: "badge",
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
  return (
    <nav className="flex flex-col gap-1">

      {links.map((link) => (
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

          <span>
            {link.label}
          </span>
        </NavLink>
      ))}

    </nav>
  );
};
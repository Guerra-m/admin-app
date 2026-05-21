import { NavLink } from "react-router-dom";

const links = [
  {
    to: "/productos",
    label: "Productos",
  },
  {
    to: "/categorias",
    label: "Categorías",
  },
  {
    to: "/ingredientes",
    label: "Ingredientes",
  },
  {
    to: "/empleados",
    label: "Empleados",
  },
];

const linkBase =
  "rounded-md px-3 py-2 text-sm transition block";

export const Navbar = () => {
  return (
    <nav className="flex flex-col gap-2">

      {links.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          className={({ isActive }) =>
            `
              ${linkBase}
              ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-700"
              }
            `
          }
        >
          {link.label}
        </NavLink>
      ))}

    </nav>
  );
};
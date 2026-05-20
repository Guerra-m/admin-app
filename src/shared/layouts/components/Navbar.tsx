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
];

const linkBase =
  "rounded-md px-3 py-2 text-sm transition";

export const Navbar = () => {
  return (
    <header className="border-b bg-gray-800
        text-white">
      <nav className="mx-auto flex max-w-6xl gap-2 p-4">

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
                    : "hover:bg-gray-100"
                }
              `
            }
          >
            {link.label}
          </NavLink>
        ))}

      </nav>
    </header>
  );
};
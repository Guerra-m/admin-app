import { useAuthStore } from "../../../modules/auth/store/authStore";
import { Navbar } from "./Navbar";

export const Header = () => {

  const logout = useAuthStore((state) => state.logout);

  return (

    <header
      className="
        bg-gray-800
        text-white
        px-6
        py-4
        flex
        items-center
        justify-between
        shadow-md
        col-span-2
      "
    >

      <h1 className="text-2xl font-bold tracking-wide">
        FoodStore
      </h1>
      <button
        onClick={logout}
        className="
          bg-red-500
          hover:bg-red-600
          active:scale-95
          transition
          duration-200
          px-5
          py-2
          rounded-lg
          font-semibold
          shadow-md
        "
      >
        Salir
      </button>

    </header>
  );
};
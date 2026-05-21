import { useAuthStore } from "../../../modules/auth/store/authStore";

export const Header = () => {
  const logout = useAuthStore((state) => state.logout);

  return (
    <header
      className="
        col-span-2

        flex
        items-center

        bg-surface-container-low
        text-on-surface

        px-container-padding-admin
        py-4

        border-b
        border-outline-variant

        shadow-warm
      "
    >

      {/* Spacer */}
      <div className="flex-1" />

      {/* Actions */}
      <div className="flex items-center gap-3">

        <button
          onClick={logout}
          className="
            flex
            items-center
            gap-2

            bg-error
            text-on-error

            px-4
            py-2
            mx-3

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
    </header>
  );
};
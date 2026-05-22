import type { ReactNode } from "react";

interface ModalProps {
  title: string;
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const Modal = ({
  title,
  open,
  onClose,
  children,
}: ModalProps) => {

  if (!open) return null;

  return (

    <div
      className="
        fixed
        inset-0
        z-50

        flex
        items-center
        justify-center

        bg-black/50
        backdrop-blur-sm

        p-4
      "
    >

      <div
        className="
          w-full
          max-w-xl

          rounded-2xl

          border
          border-outline-variant

          bg-surface

          shadow-warm

          overflow-hidden

          animate-in
          fade-in
          zoom-in-95
          duration-200
        "
      >

        {/* HEADER */}
        <div
          className="
            flex
            items-center
            justify-between

            border-b
            border-outline-variant

            bg-surface-container

            px-6
            py-5
          "
        >

          <div className="space-y-1">

            <h2
              className="
                text-xl
                font-bold
                font-admin

                text-on-surface
              "
            >
              {title}
            </h2>

            <p
              className="
                text-sm
                text-on-surface-variant
              "
            >
              Complete la información requerida
            </p>

          </div>

          <button
            type="button"
            onClick={onClose}
            className="
              flex
              items-center
              justify-center

              rounded-lg

              border
              border-outline-variant

              bg-surface-container-low

              p-2

              text-on-surface-variant

              transition-all
              duration-200

              hover:bg-surface-container-high
              hover:text-on-surface
            "
          >

            <span className="material-symbols-outlined text-[20px]">
              close
            </span>

          </button>

        </div>

        {/* CONTENT */}
        <div className="p-6">
          {children}
        </div>

      </div>

    </div>
  );
};
type ButtonProps =
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "secondary" | "danger";
  };

export const Button = ({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) => {

  const baseStyles = `
    inline-flex
    items-center
    justify-center

    gap-2

    px-4
    py-2

    rounded-md

    text-sm
    font-semibold
    font-admin

    transition-all
    duration-200

    active:scale-95
    disabled:opacity-50
    disabled:cursor-not-allowed

    shadow-warm
  `;

  const variants = {

    primary: `
      bg-primary
      text-on-primary

      hover:opacity-90
    `,

    secondary: `
      bg-surface-container

      text-on-surface

      border
      border-outline-variant

      hover:bg-surface-container-high
    `,

    danger: `
      bg-error/10

      text-error

      border
      border-error/30

      hover:bg-error
      hover:text-on-error
    `,
  };

  return (
    <button
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};
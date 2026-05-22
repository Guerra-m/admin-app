import type { ReactNode } from "react";

interface Props {
  title: string;
  children: ReactNode;
}

export const FooterSection = ({
  title,
  children,
}: Props) => {

  return (

    <section className="space-y-4">

      <h3
        className="
          text-sm
          font-bold
          tracking-wide

          text-on-surface
          font-admin
        "
      >
        {title}
      </h3>

      {children}

    </section>
  );
};
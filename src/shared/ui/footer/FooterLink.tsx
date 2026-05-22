interface Props {
  children: string;
}

export const FooterLink = ({
  children,
}: Props) => {

  return (

    <li
      className="
        hover:text-primary
        transition-colors
        cursor-pointer
      "
    >
      {children}
    </li>
  );
};
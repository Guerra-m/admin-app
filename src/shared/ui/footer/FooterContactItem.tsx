interface Props {
  icon: string;
  text: string;
}

export const FooterContactItem = ({
  icon,
  text,
}: Props) => {

  return (

    <div className="flex items-center gap-3">

      <span
        className="
          material-symbols-outlined
          text-[18px]
        "
      >
        {icon}
      </span>

      <p>{text}</p>

    </div>
  );
};
const Header = function Header({
  className,
  title,
}: {
  className: string;
  title: string;
}) {
  return <div className={className}>{title}</div>;
};

export { Header };

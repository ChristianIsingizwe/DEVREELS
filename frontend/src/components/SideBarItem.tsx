const SideBarItem = ({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) => {
  return (
    <div className="text-white flex gap-2">
      {icon}
      <p>{text}</p>
    </div>
  );
};

export default SideBarItem;

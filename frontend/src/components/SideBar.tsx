import { House, Clock, Users } from "lucide-react";
import SearchBar from "./SearchBar";
import SideBarItem from "./SideBarItem";

const SideBar = () => {
  return (
    <div className="flex flex-col gap-4 px-4 py-6 border-r border-white w-1/3 h-full cursor-pointer">
      <SearchBar />

      <SideBarItem icon={<House />} text="Home" />
      <SideBarItem icon={<Clock />} text="Watch later" />
      <SideBarItem icon={<Users />} text="Following" />
    </div>
  );
};
export default SideBar;

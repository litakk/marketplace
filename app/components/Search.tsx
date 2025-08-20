import { Input } from "@/components/ui/input";
import { IoSearchOutline } from "react-icons/io5";

const Search: React.FC = () => {
  return (
    <div className="relative w-[100%] mx-auto mt-1">
      <div className="relative">
        <IoSearchOutline
          size={28}
          className="absolute left-3 top-1/4 transform-translate-y-1/2 text-[#61828A]"
        />

        <Input
          className="w-full bg-[#F0F5F5] h-[48px] pl-12 rounded-[12px]"
          placeholder="Search"
        />
      </div>
    </div>
  );
};

export default Search;

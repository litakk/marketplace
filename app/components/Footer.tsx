import { FiTwitter } from "react-icons/fi";
import { LiaFacebook } from "react-icons/lia";
import { FaInstagram } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <div className="mb-[100px] lg:mb-[40px]">
      <div className="w-full flex justify-center gap-7 md:justify-around xl:justify-around">
        <p className="text-[14px] md:text-[18px] xl:text-xl text-[#61828A] w-[50%] text-center cursor-pointer">
          Contact Us
        </p>
        <p className="text-[14px] md:text-[18px] xl:text-xl text-[#61828A] w-[50%] text-center cursor-pointer">
          Privacy Policy
        </p>
        <p className="text-[14px] md:text-[18px] xl:text-xl text-[#61828A] w-[50%] text-center cursor-pointer">
          Terms of Service
        </p>
      </div>
      <div className="flex justify-center gap-5 md:gap-15 mt-6 mb-6 xl:mt-8 xl:mb-8">
        <div>
          <FiTwitter className="w-6 h-6 md:w-7 md:h-7 text-[#61828A] cursor-pointer" />
        </div>

        <div>
          <LiaFacebook className="w-6 h-6 md:w-7 md:h-7 text-[#61828A] cursor-pointer" />
        </div>

        <div>
          <FaInstagram className="w-6 h-6 md:w-7 md:h-7 text-[#61828A] cursor-pointer" />
        </div>
      </div>
      <div className="flex justify-center">
        <p className="text-[14px] md:text-[18px] xl:text-xl text-[#61828A] w-[50%] text-center cursor-pointer">
          @2025 Clothes Store. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;

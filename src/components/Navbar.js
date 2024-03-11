import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import { FaInstagram } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";

function Navbar() {
  return (
    <nav className="my-6 px-4  w-full relative flex items-center justify-between max-w-3xl mx-auto">
      <Link href="/" className="font-bold text-2xl md:text-4xl">
        Nơi đây có <span className="text-primary">Cát</span>
      </Link>
      <div className="flex gap-5 items-center">
        <Link
          href="mailto:nglecatlinh@gmail.com "
          passHref={true}
          target="_blank"
        >
          <IoMdMail className="text-xl md:text-3xl" />
        </Link>
        <Link
          href="https://www.instagram.com/withmyexperience/"
          passHref={true}
          target="_blank"
        >
          <FaInstagram className="text-xl md:text-3xl" />
        </Link>
        {/* <Link href="https://facebook.com/" passHref={true} target="_blank">
          <FaFacebook className="text-3xl" />
        </Link> */}
        <ModeToggle />
      </div>
    </nav>
  );
}

export default Navbar;

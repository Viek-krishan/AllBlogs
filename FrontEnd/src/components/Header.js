import { Link } from "react-router-dom";
import { ChevronRight, CircleUser } from "lucide-react";
import { useSelector } from "react-redux";

const Header = () => {
  const user = useSelector((store) => store.user.userDetails);
  console.log( user);

  return (
    <div className="Header h-24 p-7 flex  items-center w-full relative   ">
      <section className="Logo p-5 mx-5">
        <div>
          <Link to={`/`}>
            <h1 className="text-3xl font-bold ">All Blog</h1>
          </Link>
        </div>
      </section>
      <section className="Navigator w-1/2 flex">
        <div>
          <ChevronRight />
        </div>
        <nav className="w-full flex justify-around">
          <Link
            to={`/`}
            className={`font-light text-[0.8rem] hover:scale-110 hover:font-medium transition duration-150 ease-in-out 
            ${
              location.pathname === "/"
                ? "underline decoration-[#1ad179] decoration-2 underline-offset-4"
                : ""
            }`}
          >
            Home
          </Link>
          <Link
            to={`/teacher`}
            className={`font-light text-[0.8rem] hover:scale-110 hover:font-medium transition duration-150 ease-in-out 
            ${
              location.pathname === "/teacher"
                ? "underline decoration-[#1ad179] decoration-2 underline-offset-4"
                : ""
            }`}
          >
            Sports
          </Link>
          <Link
            to={`/class`}
            className={`font-light text-[0.8rem] hover:scale-110 hover:font-medium transition duration-150 ease-in-out 
            ${
              location.pathname === "/class"
                ? "underline decoration-[#1ad179] decoration-2 underline-offset-4"
                : ""
            }`}
          >
            Global Affairs
          </Link>
          <Link
            to={`#`}
            className={`font-light text-[0.8rem] hover:scale-110 hover:font-medium transition duration-150 ease-in-out 
            ${
              location.pathname === "#"
                ? "underline decoration-[#1ad179] decoration-2 underline-offset-4"
                : ""
            }`}
          >
            National Affairs
          </Link>
          <Link
            to={`/profile/student`}
            className={`font-light text-[0.8rem] hover:scale-110 hover:font-medium transition duration-150 ease-in-out 
            ${
              location.pathname === "/profile/student"
                ? "underline decoration-[#1ad179] decoration-2 underline-offset-4"
                : ""
            }`}
          >
            Technology
          </Link>
          <Link
            to="/about"
            className={`font-light text-[0.8rem] hover:scale-110 hover:font-medium transition duration-150 ease-in-out 
            ${
              location.pathname === "/about"
                ? "underline decoration-[#1ad179] decoration-2 underline-offset-4"
                : ""
            }`}
          >
            View more
          </Link>
        </nav>
      </section>

      {user.length === 1 ? (
        <section className="Profile mr-5 relative left-[25vw] text-white">
          <Link to={`/profile`} className="flex">
            <h1 className="text-lg font-serif">{user[0].fullName}</h1>
            <CircleUser width={50} />
          </Link>
        </section>
      ) : (
        <section className="LogIn flex relative left-80">
          <Link
            to={`/authentication`}
            className="bg-red-600/30 mx-2 px-2 py-1 rounded-lg text-sm  border-b-2 border-l-2 border-white/30 hover:scale-105 transition duration-200 ease-in-out"
          >
            Login
          </Link>
          <h5 className="cursor-default text-xl">/</h5>
          <Link
            to={`/authentication`}
            className="bg-red-600/30 mx-2 px-2 py-1 rounded-lg text-sm border-b-2 border-l-2 border-white/30  hover:scale-105 transition duration-200 ease-in-out"
          >
            Register
          </Link>
        </section>
      )}
    </div>
  );
};

export default Header;

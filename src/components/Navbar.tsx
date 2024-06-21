import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const NavbarItem = ({ to, title }: { to: string; title: string }) => {
  const location = useLocation();
  return (
    <li>
      <Link
        to={to}
        className={cn(
          "px-4 rounded-md text-md text-sm hover:bg-gray-200 transition py-2 font-semibold",
          {
            "bg-gray-200": location?.pathname === to,
          },
        )}
      >
        {title}
      </Link>
    </li>
  );
};

function Navbar() {
  return (
    <nav className="flex items-center py-8 px-8 justify-between">
      <Link to="/" className="text-2xl font-bold">
        FED Autoværksted
      </Link>
      <ul className="flex gap-4">
        <NavbarItem to="/" title="Hjem" />
        <NavbarItem to="/appointments/edit" title="Ret aftale" />
        <NavbarItem to="/appointments" title="Se aftaler" />

        <NavbarItem to="/book" title="Book ny aftale" />
      </ul>
    </nav>
  );
}

export default Navbar;

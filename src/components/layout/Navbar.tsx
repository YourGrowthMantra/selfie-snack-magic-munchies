
import { Home, Upload, Coffee, Image } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="w-full py-4">
      <div className="container flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <div className="h-10 w-10 bg-snack-pink-bright rounded-full flex items-center justify-center">
            <Image className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-2xl font-display font-bold text-gray-800">SelfieSnack</h1>
        </Link>
        
        <div className="hidden md:flex space-x-6">
          <NavLink href="/" active={location.pathname === "/"}>
            <Home className="h-4 w-4 mr-1" />
            Home
          </NavLink>
          <NavLink href="/upload" active={location.pathname === "/upload"}>
            <Upload className="h-4 w-4 mr-1" />
            Upload
          </NavLink>
          <NavLink href="/preview" active={location.pathname === "/preview"}>
            <Coffee className="h-4 w-4 mr-1" />
            Preview
          </NavLink>
        </div>
        
        <div className="md:hidden">
          <div className="flex space-x-4">
            <MobileNavLink href="/" active={location.pathname === "/"}>
              <Home className="h-5 w-5" />
            </MobileNavLink>
            <MobileNavLink href="/upload" active={location.pathname === "/upload"}>
              <Upload className="h-5 w-5" />
            </MobileNavLink>
            <MobileNavLink href="/preview" active={location.pathname === "/preview"}>
              <Coffee className="h-5 w-5" />
            </MobileNavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

interface NavLinkProps {
  href: string;
  active: boolean;
  children: React.ReactNode;
}

const NavLink = ({ href, active, children }: NavLinkProps) => {
  return (
    <Link
      to={href}
      className={cn(
        "flex items-center px-3 py-2 rounded-full text-sm font-medium transition-colors duration-200 button-hover",
        active 
          ? "bg-snack-pink text-primary"
          : "text-gray-600 hover:bg-snack-yellow/50 hover:text-gray-900"
      )}
    >
      {children}
    </Link>
  );
};

const MobileNavLink = ({ href, active, children }: NavLinkProps) => {
  return (
    <Link
      to={href}
      className={cn(
        "flex items-center justify-center p-2 rounded-full transition-colors duration-200 button-hover",
        active 
          ? "bg-snack-pink text-primary"
          : "text-gray-600 hover:bg-snack-yellow/50 hover:text-gray-900"
      )}
    >
      {children}
    </Link>
  );
};

export default Navbar;

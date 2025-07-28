import { Search, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Link to="/" className="flex items-center space-x-2">
                <img
                  src="https://res.cloudinary.com/dbvxzjo34/image/upload/v1753421112/aduhai/kuaraa_tf33y7.jpg"
                  alt="icon"
                  className="w-8 h-8 rounded object-cover"
                />
              </Link>
              <div>
                <div className="text-xs opacity-80">DASHBOARD</div>
                <div className="text-lg font-bold">SIMANIS</div>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-1 text-sm">
              {/* <span className="bg-warning w-2 h-2 rounded-full"></span>
              <span className="bg-white w-2 h-2 rounded-full opacity-60"></span>
              <span className="bg-white w-2 h-2 rounded-full opacity-60"></span> */}
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-6 text-sm">
            <Link
              to="/perkembangan"
              className="hover:opacity-80 flex items-center space-x-1"
            >
              <span>Perkembangan Harga</span>
              <ChevronDown className="w-4 h-4" />
            </Link>
            {/* <button className="hover:opacity-80">Eksplorasi Dashboard</button>
            <button className="hover:opacity-80">Tentang</button>
            <button className="hover:opacity-80">Executive Dashboard</button> */}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;

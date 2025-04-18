import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  Search, 
  LayoutDashboard, 
  TrendingUp, 
  Lightbulb, 
  Calculator, 
  BarChart2, 
  BookOpen, 
  LogIn, 
  Menu, 
  X 
} from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navLinks = [
    { name: "Home", path: "/", icon: <Home className="h-4 w-4 mr-1" /> },
    { name: "Search", path: "/search", icon: <Search className="h-4 w-4 mr-1" /> },
    { name: "Dashboard", path: "/dashboard", icon: <LayoutDashboard className="h-4 w-4 mr-1" /> },
    { name: "Risk", path: "/risk", icon: <TrendingUp className="h-4 w-4 mr-1" /> },
    { name: "Suggestions", path: "/suggestions", icon: <Lightbulb className="h-4 w-4 mr-1" /> },
    { name: "Calculator", path: "/calculator", icon: <Calculator className="h-4 w-4 mr-1" /> },
    { name: "Compare", path: "/compare", icon: <BarChart2 className="h-4 w-4 mr-1" /> },
    { name: "Learn", path: "/learn", icon: <BookOpen className="h-4 w-4 mr-1" /> },
  ];

  return (
    <nav className="bg-white shadow-md py-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <TrendingUp className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-bold text-gray-900">GrowVestor</span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-2">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path} 
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-primary transition-colors"
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
            <Link to="/login">
              <Button variant="outline" size="sm" className="flex items-center ml-2">
                <LogIn className="h-4 w-4 mr-1" />
                Login
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary hover:bg-blue-50 focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="pt-2 pb-3 space-y-1 px-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-primary"
              onClick={() => setIsOpen(false)}
            >
              {link.icon}
              {link.name}
            </Link>
          ))}
          <Link
            to="/login"
            className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-primary"
            onClick={() => setIsOpen(false)}
          >
            <LogIn className="h-4 w-4 mr-1" />
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

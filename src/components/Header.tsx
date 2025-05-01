
import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/Icon";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navigationItems = [
  { path: "/", label: "Главная" },
  { path: "/catalog", label: "Каталог мотоциклов" },
  { path: "/about", label: "О нас" },
  { path: "/contacts", label: "Контакты" },
];

const Header = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <header className="bg-black text-white py-4 sticky top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold flex items-center">
          <Icon name="Bike" className="mr-2" />
          МотоПрокат
        </Link>
        
        {/* Десктопное меню */}
        <nav className="hidden md:flex items-center space-x-6">
          {navigationItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`hover:text-gray-300 transition-colors ${
                location.pathname === item.path ? "font-bold" : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link to="/cart">
            <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-black">
              <Icon name="ShoppingCart" className="mr-2 h-4 w-4" />
              Корзина
            </Button>
          </Link>
        </nav>

        {/* Мобильное меню */}
        <div className="md:hidden flex items-center">
          <Link to="/cart" className="mr-4">
            <Button variant="outline" size="icon" className="bg-transparent border-white text-white hover:bg-white hover:text-black">
              <Icon name="ShoppingCart" className="h-4 w-4" />
            </Button>
          </Link>
          
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="bg-transparent border-white text-white hover:bg-white hover:text-black">
                <Icon name="Menu" className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-zinc-900 text-white">
              <nav className="flex flex-col space-y-4 mt-8">
                {navigationItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`hover:text-gray-300 transition-colors text-lg ${
                      location.pathname === item.path ? "font-bold" : ""
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;


import { Link } from "react-router-dom";
import Icon from "@/components/ui/Icon";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <Icon name="Bike" className="mr-2" />
              МотоПрокат
            </h3>
            <p className="text-gray-400">
              Лучший сервис проката мотоциклов в городе. Безопасность, качество и комфорт.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Навигация</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Главная</Link></li>
              <li><Link to="/catalog" className="text-gray-400 hover:text-white transition-colors">Каталог</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">О нас</Link></li>
              <li><Link to="/contacts" className="text-gray-400 hover:text-white transition-colors">Контакты</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Контакты</h4>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center">
                <Icon name="MapPin" className="mr-2 h-4 w-4" />
                ул. Мотоциклетная, 123
              </li>
              <li className="flex items-center">
                <Icon name="Phone" className="mr-2 h-4 w-4" />
                +7 (999) 123-45-67
              </li>
              <li className="flex items-center">
                <Icon name="Mail" className="mr-2 h-4 w-4" />
                info@motoprpokat.ru
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Мы в соцсетях</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Icon name="Instagram" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Icon name="Facebook" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Icon name="Twitter" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-6 text-center text-gray-500">
          <p>© {currentYear} МотоПрокат. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

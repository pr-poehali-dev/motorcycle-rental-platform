
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/Icon";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MotorcycleCard from "@/components/MotorcycleCard";
import { motorcycles } from "@/data/motorcycles";

const Index = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Здесь будет логика подписки
    alert(`Спасибо за подписку, ${email}!`);
    setEmail("");
  };

  // Только популярные мотоциклы для главной страницы
  const popularMotorcycles = motorcycles.slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[80vh] bg-black flex items-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1558979158-65a1eaa08691?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080&q=80"
            alt="Мотоцикл"
            className="w-full h-full object-cover opacity-60"
          />
        </div>
        <div className="container mx-auto px-4 z-10 text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 max-w-2xl">
            Свобода начинается здесь
          </h1>
          <p className="text-xl mb-8 max-w-xl">
            Прокат премиальных мотоциклов для незабываемых впечатлений. 
            Выбирайте мотоцикл своей мечты и наслаждайтесь дорогой.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" asChild>
              <Link to="/catalog">
                Выбрать мотоцикл
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white hover:text-black" asChild>
              <Link to="/about">
                О нас
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Преимущества */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Почему выбирают нас</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-purple-100 rounded-full text-purple-600">
                <Icon name="Shield" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Безопасность</h3>
              <p className="text-gray-600">Все мотоциклы регулярно проходят техобслуживание и проверку безопасности</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-blue-100 rounded-full text-blue-600">
                <Icon name="Clock" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Быстрое оформление</h3>
              <p className="text-gray-600">Оформление занимает всего 15 минут при наличии необходимых документов</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-green-100 rounded-full text-green-600">
                <Icon name="ThumbsUp" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Премиум класс</h3>
              <p className="text-gray-600">В нашем автопарке только современные мотоциклы премиум-класса</p>
            </div>
          </div>
        </div>
      </section>

      {/* Популярные модели */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Популярные мотоциклы</h2>
            <Button variant="outline" asChild>
              <Link to="/catalog">
                Смотреть все
                <Icon name="ChevronRight" className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularMotorcycles.map((motorcycle) => (
              <MotorcycleCard key={motorcycle.id} {...motorcycle} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-black text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Подпишитесь на наши новости</h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Получайте уведомления о новых поступлениях, акциях и специальных предложениях
          </p>
          
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ваш email"
              required
              className="flex-1 px-4 py-3 rounded-lg focus:outline-none text-black"
            />
            <Button type="submit">Подписаться</Button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;

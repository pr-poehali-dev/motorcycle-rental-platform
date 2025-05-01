
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { Calendar } from "@/components/ui/calendar";
import { addDays } from "date-fns";
import { motorcycles } from "@/data/motorcycles";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Icon from "@/components/ui/Icon";

const MotorcycleDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [dateRange, setDateRange] = useState({
    from: undefined,
    to: undefined,
  });
  const [totalDays, setTotalDays] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  // Найти мотоцикл по id
  const motorcycle = motorcycles.find(m => m.id === Number(id));

  // Если мотоцикл не найден, показываем сообщение
  if (!motorcycle) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-12">
          <div className="text-center py-12">
            <Icon name="AlertTriangle" className="mx-auto h-12 w-12 text-yellow-500 mb-4" />
            <h2 className="text-2xl font-bold mb-2">Мотоцикл не найден</h2>
            <p className="text-gray-600 mb-4">Извините, мотоцикл с указанным ID не существует.</p>
            <Button onClick={() => navigate("/catalog")}>Вернуться в каталог</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Обновляем расчеты при изменении дат
  const updateCalculations = (range) => {
    if (range.from && range.to) {
      const days = Math.ceil((range.to - range.from) / (1000 * 60 * 60 * 24)) + 1;
      setTotalDays(days);
      setTotalPrice(days * motorcycle.price);
    } else {
      setTotalDays(0);
      setTotalPrice(0);
    }
  };

  // Обработчик изменения дат
  const handleDateChange = (range) => {
    setDateRange(range);
    updateCalculations(range);
  };

  // Добавление в корзину
  const handleAddToCart = () => {
    if (!dateRange.from || !dateRange.to) {
      alert("Пожалуйста, выберите даты аренды");
      return;
    }
    
    const cartItem = {
      motorcycleId: motorcycle.id,
      name: motorcycle.name,
      price: motorcycle.price,
      image: motorcycle.image,
      dateFrom: dateRange.from,
      dateTo: dateRange.to,
      totalDays,
      totalPrice
    };
    
    // Сохраняем в localStorage (в реальном приложении это будет API)
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    cart.push(cartItem);
    localStorage.setItem("cart", JSON.stringify(cart));
    
    alert("Мотоцикл добавлен в корзину!");
    navigate("/cart");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Хлебные крошки */}
        <div className="bg-gray-100 py-4">
          <div className="container mx-auto px-4">
            <div className="flex items-center text-sm text-gray-600">
              <a href="/" className="hover:text-gray-900">Главная</a>
              <Icon name="ChevronRight" className="h-4 w-4 mx-1" />
              <a href="/catalog" className="hover:text-gray-900">Каталог</a>
              <Icon name="ChevronRight" className="h-4 w-4 mx-1" />
              <span className="text-gray-900">{motorcycle.name}</span>
            </div>
          </div>
        </div>
        
        {/* Основная информация о мотоцикле */}
        <section className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Фото мотоцикла */}
            <div className="bg-gray-100 rounded-lg overflow-hidden">
              <img 
                src={motorcycle.image} 
                alt={motorcycle.name} 
                className="w-full h-auto object-cover" 
              />
            </div>
            
            {/* Информация и бронирование */}
            <div>
              <h1 className="text-3xl font-bold mb-2">{motorcycle.name}</h1>
              <div className="flex items-center text-yellow-500 mb-4">
                <Icon name="Star" className="h-5 w-5 fill-current" />
                <Icon name="Star" className="h-5 w-5 fill-current" />
                <Icon name="Star" className="h-5 w-5 fill-current" />
                <Icon name="Star" className="h-5 w-5 fill-current" />
                <Icon name="Star" className="h-5 w-5 fill-current" />
                <span className="ml-2 text-gray-600">(12 отзывов)</span>
              </div>
              
              <p className="text-2xl font-bold text-primary mb-4">
                {motorcycle.price} ₽/день
              </p>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-100 p-3 rounded-lg">
                  <div className="flex items-center">
                    <Icon name="Tag" className="mr-2 h-5 w-5 text-gray-500" />
                    <span className="text-sm text-gray-600">Категория</span>
                  </div>
                  <p className="font-medium">{motorcycle.category}</p>
                </div>
                <div className="bg-gray-100 p-3 rounded-lg">
                  <div className="flex items-center">
                    <Icon name="Zap" className="mr-2 h-5 w-5 text-gray-500" />
                    <span className="text-sm text-gray-600">Мощность</span>
                  </div>
                  <p className="font-medium">{motorcycle.power}</p>
                </div>
                <div className="bg-gray-100 p-3 rounded-lg">
                  <div className="flex items-center">
                    <Icon name="Calendar" className="mr-2 h-5 w-5 text-gray-500" />
                    <span className="text-sm text-gray-600">Год выпуска</span>
                  </div>
                  <p className="font-medium">{motorcycle.year} г.</p>
                </div>
              </div>
              
              <Separator className="my-6" />
              
              {/* Бронирование */}
              <h2 className="text-xl font-bold mb-4">Бронирование</h2>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Выберите даты аренды
                </label>
                <div className="rounded-md border p-4">
                  <Calendar
                    mode="range"
                    selected={dateRange}
                    onSelect={handleDateChange}
                    disabled={{ before: new Date() }}
                    className="mx-auto"
                  />
                </div>
              </div>
              
              {totalDays > 0 && (
                <Card className="mb-6 p-4 bg-gray-50">
                  <h3 className="font-semibold mb-2">Детали бронирования</h3>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Стоимость в день:</span>
                      <span>{motorcycle.price} ₽</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Количество дней:</span>
                      <span>{totalDays}</span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between font-bold">
                      <span>Итого:</span>
                      <span>{totalPrice} ₽</span>
                    </div>
                  </div>
                </Card>
              )}
              
              <Button 
                className="w-full" 
                size="lg"
                onClick={handleAddToCart}
                disabled={!dateRange.from || !dateRange.to}
              >
                <Icon name="ShoppingCart" className="mr-2 h-5 w-5" />
                Добавить в корзину
              </Button>
            </div>
          </div>
        </section>
        
        {/* Дополнительная информация */}
        <section className="container mx-auto px-4 py-8">
          <Tabs defaultValue="description">
            <TabsList className="w-full md:w-auto justify-start mb-6">
              <TabsTrigger value="description">Описание</TabsTrigger>
              <TabsTrigger value="specifications">Характеристики</TabsTrigger>
              <TabsTrigger value="requirements">Требования</TabsTrigger>
              <TabsTrigger value="reviews">Отзывы</TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="space-y-4">
              <h3 className="text-xl font-semibold">О мотоцикле {motorcycle.name}</h3>
              <p>
                {motorcycle.name} — это высокопроизводительный мотоцикл, который обеспечивает невероятные впечатления от вождения. 
                Оснащен мощным двигателем и передовыми технологиями, этот мотоцикл предлагает идеальный баланс 
                мощности, управляемости и комфорта.
              </p>
              <p>
                Независимо от того, планируете ли вы городскую поездку или длительное путешествие по живописным 
                маршрутам, {motorcycle.name} обеспечит вам незабываемые впечатления от вождения.
              </p>
            </TabsContent>
            
            <TabsContent value="specifications" className="space-y-6">
              <h3 className="text-xl font-semibold">Технические характеристики</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-md">
                  <h4 className="font-medium mb-2">Двигатель</h4>
                  <ul className="space-y-2">
                    <li className="flex justify-between">
                      <span className="text-gray-600">Тип:</span>
                      <span>4-тактный</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-600">Мощность:</span>
                      <span>{motorcycle.power}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-600">Объем:</span>
                      <span>1000 куб. см</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-md">
                  <h4 className="font-medium mb-2">Ходовая часть</h4>
                  <ul className="space-y-2">
                    <li className="flex justify-between">
                      <span className="text-gray-600">Привод:</span>
                      <span>Цепь</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-600">Передние тормоза:</span>
                      <span>Дисковые</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-600">Задние тормоза:</span>
                      <span>Дисковые</span>
                    </li>
                  </ul>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="requirements" className="space-y-4">
              <h3 className="text-xl font-semibold">Требования к арендатору</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Icon name="CheckCircle" className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Возраст от 21 года</span>
                </li>
                <li className="flex items-start">
                  <Icon name="CheckCircle" className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Водительское удостоверение категории "A" со стажем от 2 лет</span>
                </li>
                <li className="flex items-start">
                  <Icon name="CheckCircle" className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Паспорт гражданина РФ</span>
                </li>
                <li className="flex items-start">
                  <Icon name="CheckCircle" className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Залог в размере 20 000 ₽ (возвращается при возврате мотоцикла в исходном состоянии)</span>
                </li>
              </ul>
            </TabsContent>
            
            <TabsContent value="reviews">
              <h3 className="text-xl font-semibold mb-4">Отзывы клиентов</h3>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                      <Icon name="User" className="h-6 w-6 text-gray-500" />
                    </div>
                    <div>
                      <h4 className="font-medium">Александр К.</h4>
                      <div className="flex text-yellow-500">
                        <Icon name="Star" className="h-4 w-4 fill-current" />
                        <Icon name="Star" className="h-4 w-4 fill-current" />
                        <Icon name="Star" className="h-4 w-4 fill-current" />
                        <Icon name="Star" className="h-4 w-4 fill-current" />
                        <Icon name="Star" className="h-4 w-4 fill-current" />
                      </div>
                    </div>
                    <span className="ml-auto text-sm text-gray-500">2 мая 2024</span>
                  </div>
                  <p>Отличный мотоцикл! Аренда прошла гладко, состояние техники идеальное. Рекомендую всем любителям двухколесных.</p>
                </div>
                
                <div className="border rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                      <Icon name="User" className="h-6 w-6 text-gray-500" />
                    </div>
                    <div>
                      <h4 className="font-medium">Мария Л.</h4>
                      <div className="flex text-yellow-500">
                        <Icon name="Star" className="h-4 w-4 fill-current" />
                        <Icon name="Star" className="h-4 w-4 fill-current" />
                        <Icon name="Star" className="h-4 w-4 fill-current" />
                        <Icon name="Star" className="h-4 w-4 fill-current" />
                        <Icon name="Star" className="h-4 w-4" />
                      </div>
                    </div>
                    <span className="ml-auto text-sm text-gray-500">15 апреля 2024</span>
                  </div>
                  <p>Брала на выходные, осталась очень довольна. Мотоцикл в отличном состоянии, персонал приветливый и профессиональный.</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </section>
        
        {/* Рекомендации */}
        <section className="bg-gray-100 py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8">Вам также может понравиться</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {motorcycles
                .filter(m => m.id !== motorcycle.id)
                .slice(0, 3)
                .map(m => (
                  <div key={m.id} className="bg-white rounded-lg overflow-hidden shadow hover:shadow-md transition-shadow">
                    <img src={m.image} alt={m.name} className="w-full h-48 object-cover" />
                    <div className="p-4">
                      <h3 className="font-bold text-lg mb-2">{m.name}</h3>
                      <p className="text-gray-600 mb-2">{m.category}</p>
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-primary">{m.price} ₽/день</span>
                        <Button variant="outline" size="sm" asChild>
                          <a href={`/motorcycle/${m.id}`}>Подробнее</a>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default MotorcycleDetail;


import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import Icon from "@/components/ui/Icon";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MotorcycleCard from "@/components/MotorcycleCard";
import { motorcycles } from "@/data/motorcycles";

const Catalog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState("popular");

  // Извлекаем уникальные категории для фильтра
  const categories = Array.from(new Set(motorcycles.map(m => m.category)));

  // Функция для фильтрации мотоциклов
  const filteredMotorcycles = motorcycles.filter(motorcycle => {
    // Фильтр по поисковому запросу
    const matchesSearch = motorcycle.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Фильтр по категориям
    const matchesCategory = selectedCategories.length === 0 || 
      selectedCategories.includes(motorcycle.category);
    
    // Фильтр по цене
    const matchesMinPrice = priceRange.min === "" || motorcycle.price >= parseInt(priceRange.min);
    const matchesMaxPrice = priceRange.max === "" || motorcycle.price <= parseInt(priceRange.max);
    
    return matchesSearch && matchesCategory && matchesMinPrice && matchesMaxPrice;
  });

  // Функция для сортировки мотоциклов
  const sortedMotorcycles = [...filteredMotorcycles].sort((a, b) => {
    switch (sortOption) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "year-desc":
        return b.year - a.year;
      default: // popular - сортировка по id (предполагая, что id отражает популярность)
        return a.id - b.id;
    }
  });

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const clearFilters = () => {
    setSearchTerm("");
    setPriceRange({ min: "", max: "" });
    setSelectedCategories([]);
    setSortOption("popular");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Заголовок */}
        <section className="bg-gray-100 py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold">Каталог мотоциклов</h1>
            <p className="text-lg text-gray-600 mt-2">
              Выберите мотоцикл своей мечты из нашей коллекции
            </p>
          </div>
        </section>
        
        {/* Основной контент */}
        <section className="container mx-auto px-4 py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Сайдбар с фильтрами */}
            <div className="lg:w-1/4">
              <div className="bg-white p-6 rounded-lg shadow-sm sticky top-24">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">Поиск</h3>
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="Поиск мотоциклов..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pr-10"
                    />
                    <Icon name="Search" className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">Категории</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox
                          id={`category-${category}`}
                          checked={selectedCategories.includes(category)}
                          onCheckedChange={() => handleCategoryChange(category)}
                        />
                        <Label htmlFor={`category-${category}`} className="cursor-pointer">
                          {category}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">Цена за день (₽)</h3>
                  <div className="flex items-center space-x-2">
                    <Input
                      type="number"
                      placeholder="От"
                      value={priceRange.min}
                      onChange={(e) => setPriceRange({...priceRange, min: e.target.value})}
                      className="w-full"
                    />
                    <span>-</span>
                    <Input
                      type="number"
                      placeholder="До"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange({...priceRange, max: e.target.value})}
                      className="w-full"
                    />
                  </div>
                </div>
                
                <Button variant="outline" className="w-full" onClick={clearFilters}>
                  Сбросить фильтры
                </Button>
              </div>
            </div>
            
            {/* Основной контент */}
            <div className="lg:w-3/4">
              <div className="flex justify-between items-center mb-6">
                <p className="text-gray-600">
                  Найдено: <strong>{sortedMotorcycles.length}</strong> мотоциклов
                </p>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Сортировать:</span>
                  <Select value={sortOption} onValueChange={setSortOption}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Сортировка" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="popular">По популярности</SelectItem>
                      <SelectItem value="price-asc">Сначала дешевле</SelectItem>
                      <SelectItem value="price-desc">Сначала дороже</SelectItem>
                      <SelectItem value="year-desc">Сначала новее</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {sortedMotorcycles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {sortedMotorcycles.map((motorcycle) => (
                    <MotorcycleCard key={motorcycle.id} {...motorcycle} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Icon name="Search" className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Ничего не найдено</h3>
                  <p className="text-gray-600 mb-4">
                    Попробуйте изменить параметры фильтрации
                  </p>
                  <Button onClick={clearFilters}>Сбросить фильтры</Button>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Catalog;

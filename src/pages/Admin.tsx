
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Icon from "@/components/ui/Icon";
import Header from "@/components/Header";
import { Separator } from "@/components/ui/separator";
import { motorcycles } from "@/data/motorcycles";
import { MotorcycleProps } from "@/components/MotorcycleCard";

const categoryOptions = ["Круизер", "Спортбайк", "Нейкед", "Эндуро", "Чоппер", "Скрэмблер"];

const AdminPanel = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  
  const [motorcyclesList, setMotorcyclesList] = useState<MotorcycleProps[]>(motorcycles);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentMotorcycle, setCurrentMotorcycle] = useState<MotorcycleProps | null>(null);
  const [formData, setFormData] = useState<Partial<MotorcycleProps>>({});
  
  // Статистика
  const totalMotorcycles = motorcyclesList.length;
  const totalCategories = new Set(motorcyclesList.map(m => m.category)).size;
  const averagePrice = Math.round(motorcyclesList.reduce((acc, m) => acc + m.price, 0) / totalMotorcycles);

  // Функция аутентификации
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Простая проверка (в реальном приложении здесь будет API запрос)
    if (username === "admin" && password === "admin123") {
      setIsAuthenticated(true);
      setLoginError("");
    } else {
      setLoginError("Неверное имя пользователя или пароль");
    }
  };

  // Обработчик выхода
  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsername("");
    setPassword("");
  };

  // Редактирование мотоцикла
  const handleEdit = (motorcycle: MotorcycleProps) => {
    setCurrentMotorcycle(motorcycle);
    setFormData({ ...motorcycle });
    setIsEditDialogOpen(true);
  };

  // Подтверждение редактирования
  const confirmEdit = () => {
    if (currentMotorcycle && formData) {
      const updatedList = motorcyclesList.map(m => 
        m.id === currentMotorcycle.id ? { ...m, ...formData } : m
      );
      setMotorcyclesList(updatedList);
      setIsEditDialogOpen(false);
      
      // В реальном приложении здесь будет API запрос
      // localStorage используется только для демонстрации
      localStorage.setItem('adminMotorcycles', JSON.stringify(updatedList));
    }
  };

  // Удаление мотоцикла
  const handleDelete = (motorcycle: MotorcycleProps) => {
    setCurrentMotorcycle(motorcycle);
    setIsDeleteDialogOpen(true);
  };

  // Подтверждение удаления
  const confirmDelete = () => {
    if (currentMotorcycle) {
      const updatedList = motorcyclesList.filter(m => m.id !== currentMotorcycle.id);
      setMotorcyclesList(updatedList);
      setIsDeleteDialogOpen(false);
      
      // В реальном приложении здесь будет API запрос
      localStorage.setItem('adminMotorcycles', JSON.stringify(updatedList));
    }
  };

  // Добавление нового мотоцикла
  const handleAddNew = () => {
    const newId = Math.max(...motorcyclesList.map(m => m.id)) + 1;
    const newMotorcycle: MotorcycleProps = {
      id: newId,
      name: "",
      price: 0,
      image: "https://images.unsplash.com/photo-1558980394-dbb977039a2e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
      category: "Круизер",
      power: "0 л.с.",
      year: new Date().getFullYear()
    };
    
    setCurrentMotorcycle(newMotorcycle);
    setFormData(newMotorcycle);
    setIsEditDialogOpen(true);
  };

  // Обновление формы
  const updateFormField = (field: keyof MotorcycleProps, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Если пользователь не аутентифицирован, показываем форму входа
  if (!isAuthenticated) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-grow flex items-center justify-center bg-gray-50">
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle className="text-2xl">Вход в админ-панель</CardTitle>
              <CardDescription>Введите учетные данные администратора</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                {loginError && (
                  <Alert variant="destructive">
                    <Icon name="AlertCircle" className="h-4 w-4" />
                    <AlertTitle>Ошибка</AlertTitle>
                    <AlertDescription>{loginError}</AlertDescription>
                  </Alert>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="username">Имя пользователя</Label>
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Пароль</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                
                <Button type="submit" className="w-full">Войти</Button>
              </form>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">Административная панель</h1>
              <p className="text-gray-600">Управление сайтом проката мотоциклов</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                Вы вошли как <span className="font-medium">admin</span>
              </span>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <Icon name="LogOut" className="mr-2 h-4 w-4" />
                Выйти
              </Button>
            </div>
          </div>
          
          {/* Статистика */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Всего мотоциклов</CardTitle>
                <Icon name="Bike" className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalMotorcycles}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Категорий</CardTitle>
                <Icon name="Tag" className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalCategories}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Средняя цена в день</CardTitle>
                <Icon name="CreditCard" className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{averagePrice} ₽</div>
              </CardContent>
            </Card>
          </div>
          
          {/* Главная часть админки */}
          <Tabs defaultValue="motorcycles" className="space-y-4">
            <TabsList>
              <TabsTrigger value="motorcycles">Мотоциклы</TabsTrigger>
              <TabsTrigger value="bookings">Бронирования</TabsTrigger>
              <TabsTrigger value="users">Пользователи</TabsTrigger>
              <TabsTrigger value="settings">Настройки</TabsTrigger>
            </TabsList>
            
            {/* Вкладка мотоциклов */}
            <TabsContent value="motorcycles" className="space-y-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Управление мотоциклами</CardTitle>
                  <Button onClick={handleAddNew}>
                    <Icon name="Plus" className="mr-2 h-4 w-4" />
                    Добавить мотоцикл
                  </Button>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Название</TableHead>
                        <TableHead>Категория</TableHead>
                        <TableHead>Цена/день</TableHead>
                        <TableHead>Год</TableHead>
                        <TableHead>Действия</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {motorcyclesList.map((motorcycle) => (
                        <TableRow key={motorcycle.id}>
                          <TableCell>{motorcycle.id}</TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <div className="h-10 w-10 rounded overflow-hidden">
                                <img 
                                  src={motorcycle.image} 
                                  alt={motorcycle.name} 
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <span className="font-medium">{motorcycle.name}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary">{motorcycle.category}</Badge>
                          </TableCell>
                          <TableCell>{motorcycle.price} ₽</TableCell>
                          <TableCell>{motorcycle.year}</TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => handleEdit(motorcycle)}
                              >
                                <Icon name="Edit" className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => handleDelete(motorcycle)}
                              >
                                <Icon name="Trash" className="h-4 w-4 text-red-500" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => navigate(`/motorcycle/${motorcycle.id}`)}
                              >
                                <Icon name="ExternalLink" className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Вкладка бронирований */}
            <TabsContent value="bookings">
              <Card>
                <CardHeader>
                  <CardTitle>Бронирования</CardTitle>
                  <CardDescription>
                    Управление бронированиями мотоциклов
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <Icon name="Calendar" className="h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium mb-2">Нет активных бронирований</h3>
                    <p className="text-gray-500 max-w-md">
                      Список бронирований появится здесь, когда клиенты начнут бронировать мотоциклы
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Вкладка пользователей */}
            <TabsContent value="users">
              <Card>
                <CardHeader>
                  <CardTitle>Пользователи</CardTitle>
                  <CardDescription>
                    Управление аккаунтами пользователей
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <Icon name="Users" className="h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium mb-2">Нет зарегистрированных пользователей</h3>
                    <p className="text-gray-500 max-w-md">
                      Список пользователей появится здесь после их регистрации
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Вкладка настроек */}
            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Настройки сайта</CardTitle>
                  <CardDescription>
                    Управление общими настройками сайта
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="site-name">Название сайта</Label>
                      <Input id="site-name" defaultValue="МотоПрокат" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="contact-email">Контактный email</Label>
                      <Input id="contact-email" type="email" defaultValue="info@motoprpokat.ru" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Телефон</Label>
                      <Input id="phone" defaultValue="+7 (999) 123-45-67" />
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-2">
                      <Label htmlFor="theme">Тема оформления</Label>
                      <Select defaultValue="dark">
                        <SelectTrigger id="theme">
                          <SelectValue placeholder="Выберите тему" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">Светлая</SelectItem>
                          <SelectItem value="dark">Темная</SelectItem>
                          <SelectItem value="system">Системная</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <Button type="button">Сохранить настройки</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      {/* Диалог редактирования мотоцикла */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {currentMotorcycle?.id === Math.max(...motorcyclesList.map(m => m.id)) + 1 
                ? "Добавить новый мотоцикл" 
                : "Редактировать мотоцикл"}
            </DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Название</Label>
              <Input
                id="name"
                value={formData.name || ""}
                onChange={(e) => updateFormField("name", e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">Цена/день</Label>
              <Input
                id="price"
                type="number"
                value={formData.price || ""}
                onChange={(e) => updateFormField("price", Number(e.target.value))}
                className="col-span-3"
                required
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">Категория</Label>
              <Select
                value={formData.category || ""}
                onValueChange={(value) => updateFormField("category", value)}
              >
                <SelectTrigger id="category" className="col-span-3">
                  <SelectValue placeholder="Выберите категорию" />
                </SelectTrigger>
                <SelectContent>
                  {categoryOptions.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="power" className="text-right">Мощность</Label>
              <Input
                id="power"
                value={formData.power || ""}
                onChange={(e) => updateFormField("power", e.target.value)}
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="year" className="text-right">Год выпуска</Label>
              <Input
                id="year"
                type="number"
                value={formData.year || ""}
                onChange={(e) => updateFormField("year", Number(e.target.value))}
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="image" className="text-right">URL изображения</Label>
              <Input
                id="image"
                value={formData.image || ""}
                onChange={(e) => updateFormField("image", e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Отмена</Button>
            <Button onClick={confirmEdit}>Сохранить</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Диалог удаления мотоцикла */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Удалить мотоцикл</DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            <p>Вы уверены, что хотите удалить мотоцикл "{currentMotorcycle?.name}"?</p>
            <p className="text-sm text-gray-500 mt-2">Это действие нельзя будет отменить.</p>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Отмена</Button>
            <Button variant="destructive" onClick={confirmDelete}>Удалить</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminPanel;

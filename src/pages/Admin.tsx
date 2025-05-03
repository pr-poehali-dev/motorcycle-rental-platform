
import { useState, useEffect } from "react";
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
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import Icon from "@/components/ui/Icon";
import Header from "@/components/Header";
import { Separator } from "@/components/ui/separator";
import { motorcycles } from "@/data/motorcycles";
import { useToast } from "@/components/ui/use-toast";

const categoryOptions = ["Круизер", "Спортбайк", "Нейкед", "Эндуро", "Чоппер", "Скрэмблер"];

// Тип для мотоцикла
interface MotorcycleProps {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  power: string;
  year: number;
  description?: string;
  features?: string[];
  availability?: boolean;
  rentCount?: number;
  lastRented?: string;
  discount?: number;
  color?: string;
  engine?: string;
  weight?: string;
  fuelCapacity?: string;
  maxSpeed?: string;
}

// Тип для бронирования
interface BookingProps {
  id: number;
  motorcycleId: number;
  motorcycleName: string;
  customerName: string;
  email: string;
  phone: string;
  startDate: string;
  endDate: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  totalPrice: number;
  createdAt: string;
  paymentMethod?: string;
  paymentStatus?: "pending" | "paid" | "refunded";
  comment?: string;
  documents?: string[];
  rentalDays?: number;
}

// Тип для пользователя
interface UserProps {
  id: number;
  name: string;
  email: string;
  phone: string;
  registeredAt: string;
  bookingsCount: number;
  status: "active" | "blocked" | "pending";
  avatar?: string;
  role?: "user" | "admin" | "manager";
  verified?: boolean;
  lastLogin?: string;
  address?: string;
  licenseNumber?: string;
  birthDate?: string;
  favoriteMotorcycles?: number[];
}

// Тип для экспорта данных
interface ExportFormat {
  type: "csv" | "json" | "pdf" | "excel";
  section: "motorcycles" | "bookings" | "users" | "analytics";
  filters?: Record<string, any>;
}

// Тип для аналитики
interface AnalyticsProps {
  totalRevenue: number;
  bookingsThisMonth: number;
  activeUsers: number;
  popularMotorcycles: {id: number, name: string, rentCount: number}[];
  revenueByMonth: {month: string, revenue: number}[];
  bookingsByStatus: {status: string, count: number}[];
  userGrowth: {month: string, users: number}[];
}

// Тип для отчета
interface ReportProps {
  id: string;
  title: string;
  description: string;
  type: "daily" | "weekly" | "monthly" | "custom";
  lastGenerated?: string;
  recipients?: string[];
  format: "pdf" | "excel" | "csv";
  status: "active" | "paused";
}

// Расширенные демо-данные мотоциклов
const extendedMotorcycles: MotorcycleProps[] = motorcycles.map(motorcycle => ({
  ...motorcycle,
  description: `${motorcycle.name} - отличный выбор для любителей мотоциклов. Стильный дизайн, мощный двигатель и отличная управляемость.`,
  features: ["ABS", "Круиз-контроль", "LED-фары", "USB-порт"],
  availability: Math.random() > 0.2,
  rentCount: Math.floor(Math.random() * 30),
  lastRented: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  discount: Math.random() > 0.7 ? Math.floor(Math.random() * 20) : 0,
  color: ["Черный", "Красный", "Синий", "Серебристый"][Math.floor(Math.random() * 4)],
  engine: motorcycle.category === "Спортбайк" ? "4-цилиндровый, 998 куб. см" : "2-цилиндровый, 650 куб. см",
  weight: `${180 + Math.floor(Math.random() * 70)} кг`,
  fuelCapacity: `${12 + Math.floor(Math.random() * 10)} л`,
  maxSpeed: `${180 + Math.floor(Math.random() * 120)} км/ч`,
}));

// Демо-данные бронирований
const demoBookings: BookingProps[] = [
  {
    id: 1,
    motorcycleId: 1,
    motorcycleName: "Harley-Davidson Fat Boy",
    customerName: "Иван Петров",
    email: "ivan@example.com",
    phone: "+7 (900) 123-45-67",
    startDate: "2025-05-05",
    endDate: "2025-05-07",
    status: "confirmed",
    totalPrice: 15000,
    createdAt: "2025-05-01",
    paymentMethod: "Карта",
    paymentStatus: "paid",
    rentalDays: 3
  },
  {
    id: 2,
    motorcycleId: 3,
    motorcycleName: "Kawasaki Ninja ZX-10R",
    customerName: "Анна Смирнова",
    email: "anna@example.com",
    phone: "+7 (900) 987-65-43",
    startDate: "2025-05-10",
    endDate: "2025-05-12",
    status: "pending",
    totalPrice: 13000,
    createdAt: "2025-05-02",
    paymentMethod: "Наличные",
    paymentStatus: "pending",
    rentalDays: 2
  },
  {
    id: 3,
    motorcycleId: 2,
    motorcycleName: "BMW R 1250 GS",
    customerName: "Алексей Иванов",
    email: "alex@example.com",
    phone: "+7 (900) 111-22-33",
    startDate: "2025-05-03",
    endDate: "2025-05-09",
    status: "completed",
    totalPrice: 54000,
    createdAt: "2025-04-25",
    paymentMethod: "Карта",
    paymentStatus: "paid",
    comment: "Клиент запросил доставку мотоцикла",
    rentalDays: 6
  },
  {
    id: 4,
    motorcycleId: 5,
    motorcycleName: "Triumph Street Triple",
    customerName: "Мария Козлова",
    email: "maria@example.com",
    phone: "+7 (900) 444-55-66",
    startDate: "2025-05-15",
    endDate: "2025-05-18",
    status: "cancelled",
    totalPrice: 18000,
    createdAt: "2025-05-04",
    paymentMethod: "Карта",
    paymentStatus: "refunded",
    comment: "Отмена по инициативе клиента",
    rentalDays: 3
  },
  {
    id: 5,
    motorcycleId: 4,
    motorcycleName: "Ducati Monster",
    customerName: "Дмитрий Соколов",
    email: "dmitry@example.com",
    phone: "+7 (900) 777-88-99",
    startDate: "2025-05-20",
    endDate: "2025-05-25",
    status: "confirmed",
    totalPrice: 25000,
    createdAt: "2025-05-10",
    paymentMethod: "Онлайн-перевод",
    paymentStatus: "paid",
    rentalDays: 5
  }
];

// Демо-данные пользователей
const demoUsers: UserProps[] = [
  {
    id: 1,
    name: "Иван Петров",
    email: "ivan@example.com",
    phone: "+7 (900) 123-45-67",
    registeredAt: "2025-04-15",
    bookingsCount: 2,
    status: "active",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
    role: "user",
    verified: true,
    lastLogin: "2025-05-03",
    licenseNumber: "AB123456",
    favoriteMotorcycles: [1, 3]
  },
  {
    id: 2,
    name: "Анна Смирнова",
    email: "anna@example.com",
    phone: "+7 (900) 987-65-43",
    registeredAt: "2025-04-20",
    bookingsCount: 1,
    status: "active",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
    role: "user",
    verified: true,
    lastLogin: "2025-05-02",
    licenseNumber: "CD789012",
    favoriteMotorcycles: [2]
  },
  {
    id: 3,
    name: "Алексей Иванов",
    email: "alex@example.com",
    phone: "+7 (900) 111-22-33",
    registeredAt: "2025-03-10",
    bookingsCount: 3,
    status: "active",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
    role: "user",
    verified: true,
    lastLogin: "2025-05-04",
    licenseNumber: "EF345678",
    favoriteMotorcycles: [4, 5, 6]
  },
  {
    id: 4,
    name: "Мария Козлова",
    email: "maria@example.com",
    phone: "+7 (900) 444-55-66",
    registeredAt: "2025-04-05",
    bookingsCount: 1,
    status: "blocked",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
    role: "user",
    verified: false,
    lastLogin: "2025-04-20",
    licenseNumber: "GH901234",
    favoriteMotorcycles: []
  },
  {
    id: 5,
    name: "Дмитрий Соколов",
    email: "dmitry@example.com",
    phone: "+7 (900) 777-88-99",
    registeredAt: "2025-05-01",
    bookingsCount: 1,
    status: "pending",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
    role: "user",
    verified: false,
    lastLogin: "2025-05-01",
    licenseNumber: "IJ567890",
    favoriteMotorcycles: [1]
  }
];

// Демо-данные для аналитики
const demoAnalytics: AnalyticsProps = {
  totalRevenue: 125000,
  bookingsThisMonth: 12,
  activeUsers: 42,
  popularMotorcycles: [
    {id: 1, name: "Harley-Davidson Fat Boy", rentCount: 15},
    {id: 2, name: "BMW R 1250 GS", rentCount: 12},
    {id: 3, name: "Kawasaki Ninja ZX-10R", rentCount: 10}
  ],
  revenueByMonth: [
    {month: "Январь", revenue: 45000},
    {month: "Февраль", revenue: 52000},
    {month: "Март", revenue: 60000},
    {month: "Апрель", revenue: 75000},
    {month: "Май", revenue: 125000}
  ],
  bookingsByStatus: [
    {status: "Завершено", count: 35},
    {status: "Подтверждено", count: 12},
    {status: "Ожидает", count: 8},
    {status: "Отменено", count: 5}
  ],
  userGrowth: [
    {month: "Январь", users: 15},
    {month: "Февраль", users: 22},
    {month: "Март", users: 30},
    {month: "Апрель", users: 38},
    {month: "Май", users: 45}
  ]
};

// Демо-данные для отчетов
const demoReports: ReportProps[] = [
  {
    id: "rep-001",
    title: "Еженедельный отчет по бронированиям",
    description: "Сводка по бронированиям за неделю с детализацией по мотоциклам",
    type: "weekly",
    lastGenerated: "2025-05-01",
    recipients: ["admin@motoprokat.ru"],
    format: "pdf",
    status: "active"
  },
  {
    id: "rep-002",
    title: "Ежемесячный финансовый отчет",
    description: "Подробный отчет по доходам, расходам и прибыли",
    type: "monthly",
    lastGenerated: "2025-04-30",
    recipients: ["admin@motoprokat.ru", "finance@motoprokat.ru"],
    format: "excel",
    status: "active"
  },
  {
    id: "rep-003",
    title: "Отчет по загруженности мотоциклов",
    description: "Статистика использования каждого мотоцикла и рекомендации по оптимизации парка",
    type: "monthly",
    lastGenerated: "2025-04-30",
    recipients: ["admin@motoprokat.ru"],
    format: "pdf",
    status: "paused"
  }
];

// Компонент для отображения мини-графика
const MiniChart = ({ data, type = "line", height = 40 }: { data: number[], type?: "line" | "bar", height?: number }) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  
  return (
    <div style={{ height: `${height}px` }} className="flex items-end justify-between w-full gap-1">
      {type === "line" ? (
        <svg viewBox={`0 0 ${data.length - 1} 1`} className="w-full h-full overflow-visible">
          <polyline
            points={data.map((value, i) => `${i/(data.length-1)}, ${1 - (value - min) / range}`).join(' ')}
            fill="none"
            stroke="currentColor"
            strokeWidth="0.05"
            className="text-primary"
          />
        </svg>
      ) : (
        data.map((value, i) => (
          <div
            key={i}
            className="bg-primary/80 rounded-sm flex-1"
            style={{
              height: `${Math.max(10, (value - min) / range * 100)}%`,
            }}
          />
        ))
      )}
    </div>
  );
};

const AdminPanel = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
  const [motorcyclesList, setMotorcyclesList] = useState<MotorcycleProps[]>(extendedMotorcycles);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isViewBookingDialogOpen, setIsViewBookingDialogOpen] = useState(false);
  const [isViewUserDialogOpen, setIsViewUserDialogOpen] = useState(false);
  const [currentMotorcycle, setCurrentMotorcycle] = useState<MotorcycleProps | null>(null);
  const [currentBooking, setCurrentBooking] = useState<BookingProps | null>(null);
  const [currentUser, setCurrentUser] = useState<UserProps | null>(null);
  const [formData, setFormData] = useState<Partial<MotorcycleProps>>({});
  
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [bookings, setBookings] = useState<BookingProps[]>(demoBookings);
  const [users, setUsers] = useState<UserProps[]>(demoUsers);
  const [analytics, setAnalytics] = useState<AnalyticsProps>(demoAnalytics);
  const [availabilityFilter, setAvailabilityFilter] = useState<"all" | "available" | "unavailable">("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [userStatusFilter, setUserStatusFilter] = useState<"all" | "active" | "blocked" | "pending">("all");
  const [dateFilter, setDateFilter] = useState<{from: string, to: string}>({
    from: '',
    to: ''
  });
  
  // Для загрузки превью изображения
  const [imagePreview, setImagePreview] = useState("");
  const [activeTab, setActiveTab] = useState("dashboard");
  
  // Новые состояния для расширенных функций
  const [reports, setReports] = useState<ReportProps[]>(demoReports);
  const [isCreateReportDialogOpen, setIsCreateReportDialogOpen] = useState(false);
  const [reportFormData, setReportFormData] = useState<Partial<ReportProps>>({});
  const [isExportDialogOpen, setIsExportDialogOpen] = useState(false);
  const [exportOptions, setExportOptions] = useState<Partial<ExportFormat>>({
    type: "excel",
    section: "motorcycles"
  });
  
  // Состояния для фильтрации и сортировки отчетов
  const [reportFilter, setReportFilter] = useState<"all" | "active" | "paused">("all");
  const [reportSortBy, setReportSortBy] = useState<"date" | "title">("date");
  const [reportSortOrder, setReportSortOrder] = useState<"asc" | "desc">("desc");
  
  // Получение текущей даты в формате YYYY-MM-DD
  const currentDate = new Date().toISOString().split('T')[0];
  
  // Статистика
  const totalMotorcycles = motorcyclesList.length;
  const totalCategories = new Set(motorcyclesList.map(m => m.category)).size;
  const averagePrice = Math.round(motorcyclesList.reduce((acc, m) => acc + m.price, 0) / totalMotorcycles);
  const totalBookings = bookings.length;
  const pendingBookings = bookings.filter(b => b.status === "pending").length;
  const totalRevenue = bookings.reduce((acc, b) => acc + b.totalPrice, 0);
  const availableMotorcycles = motorcyclesList.filter(m => m.availability).length;

  // Проверка сохраненного состояния авторизации при загрузке
  useEffect(() => {
    const savedAuth = localStorage.getItem('adminAuth');
    if (savedAuth === 'true') {
      setIsAuthenticated(true);
    }
    
    // Загрузка мотоциклов из localStorage, если они там есть
    const savedMotorcycles = localStorage.getItem('adminMotorcycles');
    if (savedMotorcycles) {
      try {
        setMotorcyclesList(JSON.parse(savedMotorcycles));
      } catch (e) {
        console.error("Ошибка при загрузке данных мотоциклов:", e);
      }
    }
  }, []);

  // Предварительный просмотр изображения
  useEffect(() => {
    if (formData.image) {
      setImagePreview(formData.image);
    }
  }, [formData.image]);

  // Функция аутентификации
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Имитация задержки запроса к API
    setTimeout(() => {
      // Простая проверка (в реальном приложении здесь будет API запрос)
      if (username === "admin" && password === "admin123") {
        setIsAuthenticated(true);
        setLoginError("");
        if (rememberMe) {
          localStorage.setItem('adminAuth', 'true');
        }
        toast({
          title: "Успешный вход",
          description: "Добро пожаловать в панель администратора",
          variant: "default",
        });
      } else {
        setLoginError("Неверное имя пользователя или пароль");
        toast({
          variant: "destructive",
          title: "Ошибка входа",
          description: "Неверное имя пользователя или пароль",
        });
      }
      setIsLoading(false);
    }, 800);
  };

  // Обработчик выхода
  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsername("");
    setPassword("");
    localStorage.removeItem('adminAuth');
    toast({
      title: "Выход выполнен",
      description: "Вы успешно вышли из системы",
    });
  };

  // Редактирование мотоцикла
  const handleEdit = (motorcycle: MotorcycleProps) => {
    setCurrentMotorcycle(motorcycle);
    setFormData({ ...motorcycle });
    setImagePreview(motorcycle.image);
    setIsEditDialogOpen(true);
  };

  // Дублирование мотоцикла
  const handleDuplicate = (motorcycle: MotorcycleProps) => {
    const newId = Math.max(...motorcyclesList.map(m => m.id)) + 1;
    const newMotorcycle: MotorcycleProps = {
      ...motorcycle,
      id: newId,
      name: `${motorcycle.name} (копия)`,
      rentCount: 0,
      lastRented: "",
    };
    
    setMotorcyclesList([...motorcyclesList, newMotorcycle]);
    localStorage.setItem('adminMotorcycles', JSON.stringify([...motorcyclesList, newMotorcycle]));
    
    toast({
      title: "Мотоцикл дублирован",
      description: `Создана копия мотоцикла "${motorcycle.name}"`,
    });
  };

  // Изменение доступности мотоцикла
  const toggleAvailability = (motorcycle: MotorcycleProps) => {
    const updatedList = motorcyclesList.map(m => 
      m.id === motorcycle.id ? { ...m, availability: !m.availability } : m
    );
    setMotorcyclesList(updatedList);
    localStorage.setItem('adminMotorcycles', JSON.stringify(updatedList));
    
    toast({
      title: motorcycle.availability ? "Мотоцикл недоступен" : "Мотоцикл доступен",
      description: `Статус мотоцикла "${motorcycle.name}" изменен`,
    });
  };

  // Подтверждение редактирования
  const confirmEdit = () => {
    if (!formData.name || !formData.price) {
      toast({
        variant: "destructive",
        title: "Ошибка валидации",
        description: "Заполните все обязательные поля",
      });
      return;
    }
    
    if (currentMotorcycle && formData) {
      let updatedList;
      
      if (currentMotorcycle.id === Math.max(...motorcyclesList.map(m => m.id)) + 1) {
        // Это новый мотоцикл
        updatedList = [...motorcyclesList, formData as MotorcycleProps];
        toast({
          title: "Мотоцикл добавлен",
          description: `Мотоцикл "${formData.name}" успешно добавлен в каталог`,
        });
      } else {
        // Обновление существующего мотоцикла
        updatedList = motorcyclesList.map(m => 
          m.id === currentMotorcycle.id ? { ...m, ...formData } : m
        );
        toast({
          title: "Мотоцикл обновлен",
          description: `Мотоцикл "${formData.name}" успешно обновлен`,
        });
      }
      
      setMotorcyclesList(updatedList);
      setIsEditDialogOpen(false);
      
      // В реальном приложении здесь будет API запрос
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
      
      toast({
        title: "Мотоцикл удален",
        description: `Мотоцикл "${currentMotorcycle.name}" успешно удален из каталога`,
      });
      
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
      year: new Date().getFullYear(),
      availability: true,
      rentCount: 0,
      description: "",
      features: [],
      color: "Черный",
      engine: "4-тактный",
      weight: "200 кг",
      fuelCapacity: "15 л",
      maxSpeed: "200 км/ч"
    };
    
    setCurrentMotorcycle(newMotorcycle);
    setFormData({
      ...newMotorcycle, 
      description: "Описание мотоцикла..."
    });
    setImagePreview(newMotorcycle.image);
    setIsEditDialogOpen(true);
  };

  // Обновление формы
  const updateFormField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Обработчик просмотра бронирования
  const handleViewBooking = (booking: BookingProps) => {
    setCurrentBooking(booking);
    setIsViewBookingDialogOpen(true);
  };
  
  // Обработчик просмотра пользователя
  const handleViewUser = (user: UserProps) => {
    setCurrentUser(user);
    setIsViewUserDialogOpen(true);
  };

  // Обновление статуса бронирования
  const updateBookingStatus = (id: number, status: BookingProps['status']) => {
    const updatedBookings = bookings.map(booking => 
      booking.id === id ? { ...booking, status } : booking
    );
    setBookings(updatedBookings);
    
    if (currentBooking && currentBooking.id === id) {
      setCurrentBooking({ ...currentBooking, status });
    }
    
    toast({
      title: "Статус обновлен",
      description: `Статус бронирования №${id} изменен на "${
        status === "pending" ? "ожидает" : 
        status === "confirmed" ? "подтверждено" : 
        status === "completed" ? "завершено" : 
        "отменено"
      }"`,
    });
  };
  
  // Обновление статуса пользователя
  const updateUserStatus = (id: number, status: UserProps['status']) => {
    const updatedUsers = users.map(user => 
      user.id === id ? { ...user, status } : user
    );
    setUsers(updatedUsers);
    
    if (currentUser && currentUser.id === id) {
      setCurrentUser({ ...currentUser, status });
    }
    
    toast({
      title: "Статус пользователя обновлен",
      description: `Статус пользователя ID:${id} изменен на "${
        status === "active" ? "активен" :
        status === "blocked" ? "заблокирован" :
        "в ожидании"
      }"`,
    });
  };

  // Создание нового отчета
  const handleCreateReport = () => {
    setReportFormData({
      id: `rep-00${reports.length + 1}`,
      title: "",
      description: "",
      type: "weekly",
      format: "pdf",
      status: "active",
      recipients: ["admin@motoprokat.ru"]
    });
    setIsCreateReportDialogOpen(true);
  };

  // Сохранение отчета
  const confirmCreateReport = () => {
    if (!reportFormData.title) {
      toast({
        variant: "destructive",
        title: "Ошибка валидации",
        description: "Укажите название отчета",
      });
      return;
    }

    const newReport: ReportProps = {
      id: reportFormData.id || `rep-00${reports.length + 1}`,
      title: reportFormData.title || "Отчет",
      description: reportFormData.description || "",
      type: reportFormData.type || "weekly",
      format: reportFormData.format || "pdf",
      status: reportFormData.status || "active",
      recipients: reportFormData.recipients || ["admin@motoprokat.ru"],
      lastGenerated: currentDate
    };

    setReports([...reports, newReport]);
    setIsCreateReportDialogOpen(false);
    
    toast({
      title: "Отчет создан",
      description: `Отчет "${newReport.title}" успешно создан`,
    });
  };

  // Генерация отчета
  const generateReport = (reportId: string) => {
    const report = reports.find(r => r.id === reportId);
    if (report) {
      const updatedReports = reports.map(r => 
        r.id === reportId ? { ...r, lastGenerated: currentDate } : r
      );
      setReports(updatedReports);
      
      toast({
        title: "Отчет сгенерирован",
        description: `Отчет "${report.title}" успешно сгенерирован`,
      });
    }
  };

  // Изменение статуса отчета
  const toggleReportStatus = (reportId: string) => {
    const updatedReports = reports.map(r => 
      r.id === reportId ? { ...r, status: r.status === "active" ? "paused" : "active" } : r
    );
    setReports(updatedReports);
    
    const report = reports.find(r => r.id === reportId);
    if (report) {
      toast({
        title: "Статус отчета изменен",
        description: `Отчет "${report.title}" ${report.status === "active" ? "приостановлен" : "активирован"}`,
      });
    }
  };

  // Экспорт данных
  const handleExport = () => {
    setExportOptions({
      type: "excel",
      section: "motorcycles"
    });
    setIsExportDialogOpen(true);
  };

  // Подтверждение экспорта
  const confirmExport = () => {
    setIsExportDialogOpen(false);
    
    toast({
      title: "Данные экспортированы",
      description: `Данные из раздела "${
        exportOptions.section === "motorcycles" ? "Мотоциклы" :
        exportOptions.section === "bookings" ? "Бронирования" :
        exportOptions.section === "users" ? "Пользователи" : "Аналитика"
      }" экспортированы в формате ${exportOptions.type?.toUpperCase()}`,
    });
  };

  // Функция для пакетных действий с мотоциклами
  const performBulkAction = (action: 'available' | 'unavailable' | 'delete', selectedIds: number[]) => {
    if (action === 'delete') {
      const updatedList = motorcyclesList.filter(m => !selectedIds.includes(m.id));
      setMotorcyclesList(updatedList);
      localStorage.setItem('adminMotorcycles', JSON.stringify(updatedList));
      toast({
        title: "Мотоциклы удалены",
        description: `${selectedIds.length} мотоциклов успешно удалено`,
      });
    } else {
      const availability = action === 'available';
      const updatedList = motorcyclesList.map(m => 
        selectedIds.includes(m.id) ? { ...m, availability } : m
      );
      setMotorcyclesList(updatedList);
      localStorage.setItem('adminMotorcycles', JSON.stringify(updatedList));
      toast({
        title: `Мотоциклы ${availability ? 'доступны' : 'недоступны'}`,
        description: `Статус ${selectedIds.length} мотоциклов успешно изменен`,
      });
    }
  };

  // Фильтрация бронирований по статусу
  const filteredBookings = bookings.filter(booking => {
    if (filterStatus === "all") return true;
    return booking.status === filterStatus;
  });
  
  // Фильтрация пользователей по статусу
  const filteredUsers = users.filter(user => {
    if (userStatusFilter === "all") return true;
    return user.status === userStatusFilter;
  });
  
  // Фильтрация мотоциклов по наличию и категории
  const filteredMotorcycles = motorcyclesList.filter(motorcycle => {
    // Фильтр по доступности
    const matchesAvailability = 
      availabilityFilter === "all" || 
      (availabilityFilter === "available" && motorcycle.availability) ||
      (availabilityFilter === "unavailable" && !motorcycle.availability);
    
    // Фильтр по категории
    const matchesCategory = 
      categoryFilter === "all" || 
      motorcycle.category === categoryFilter;
    
    // Фильтр по поисковому запросу
    const matchesSearch = 
      searchTerm === "" || 
      motorcycle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      motorcycle.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesAvailability && matchesCategory && matchesSearch;
  });

  // Фильтрация и сортировка отчетов
  const filteredReports = reports
    .filter(report => reportFilter === "all" || report.status === reportFilter)
    .sort((a, b) => {
      if (reportSortBy === "date") {
        const dateA = a.lastGenerated ? new Date(a.lastGenerated).getTime() : 0;
        const dateB = b.lastGenerated ? new Date(b.lastGenerated).getTime() : 0;
        return reportSortOrder === "asc" ? dateA - dateB : dateB - dateA;
      } else {
        return reportSortOrder === "asc" 
          ? a.title.localeCompare(b.title) 
          : b.title.localeCompare(a.title);
      }
    });

  // Обновление формы отчета
  const updateReportField = (field: string, value: any) => {
    setReportFormData(prev => ({ ...prev, [field]: value }));
  };

  // Форматирование даты
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  // Если пользователь не аутентифицирован, показываем форму входа
  if (!isAuthenticated) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-grow flex items-center justify-center bg-gray-50">
          <Card className="w-[400px] shadow-lg">
            <CardHeader className="space-y-1">
              <div className="flex items-center justify-center mb-2">
                <div className="h-12 w-12 bg-primary/10 flex items-center justify-center rounded-full">
                  <Icon name="ShieldCheck" className="h-6 w-6 text-primary" />
                </div>
              </div>
              <CardTitle className="text-2xl text-center">Вход в админ-панель</CardTitle>
              <CardDescription className="text-center">
                Введите учетные данные администратора для доступа к панели управления
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                {loginError && (
                  <Alert variant="destructive">
                    <Icon name="AlertCircle" className="h-4 w-4" />
                    <AlertTitle>Ошибка входа</AlertTitle>
                    <AlertDescription>{loginError}</AlertDescription>
                  </Alert>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="username">Имя пользователя</Label>
                  <div className="relative">
                    <Icon name="User" className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="username"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="pl-10"
                      placeholder="admin"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="password">Пароль</Label>
                    <a href="#" className="text-xs text-primary hover:underline">
                      Забыли пароль?
                    </a>
                  </div>
                  <div className="relative">
                    <Icon name="Lock" className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="remember" 
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  />
                  <label
                    htmlFor="remember"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Запомнить меня
                  </label>
                </div>
                
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Icon name="Loader2" className="mr-2 h-4 w-4 animate-spin" />
                      Вход...
                    </>
                  ) : (
                    <>
                      <Icon name="LogIn" className="mr-2 h-4 w-4" />
                      Войти
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col">
              <p className="text-xs text-center text-gray-500 mt-2">
                Для демо-версии используйте: <br />
                Логин: <span className="font-medium">admin</span>, Пароль: <span className="font-medium">admin123</span>
              </p>
            </CardFooter>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow bg-gray-50 pb-12">
        {/* Заголовок панели с градиентом */}
        <div className="bg-gradient-to-r from-primary/90 to-primary text-white py-6 mb-8 shadow-md">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h1 className="text-3xl font-bold">Административная панель</h1>
                <p className="text-white/80 mt-1">Управление сайтом проката мотоциклов</p>
              </div>
              <div className="flex items-center mt-4 md:mt-0 space-x-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-2">
                          <Icon name="User" className="h-4 w-4" />
                        </div>
                        <span className="font-medium mr-1">admin</span>
                        <Icon name="ChevronDown" className="h-4 w-4" />
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>Аккаунт администратора</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Icon name="User" className="mr-2 h-4 w-4" />
                      <span>Профиль</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Icon name="Settings" className="mr-2 h-4 w-4" />
                      <span>Настройки</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Icon name="Bell" className="mr-2 h-4 w-4" />
                      <span>Уведомления</span>
                      <Badge className="ml-auto bg-primary text-white">5</Badge>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <Icon name="LogOut" className="mr-2 h-4 w-4" />
                      <span>Выйти</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Боковая навигация */}
            <aside className="lg:w-64 mb-6 lg:mb-0">
              <Card className="overflow-hidden border-none shadow-sm sticky top-24">
                <div className="p-4 bg-white">
                  <nav className="space-y-1">
                    <Button
                      variant={activeTab === "dashboard" ? "default" : "ghost"}
                      className={`w-full justify-start ${activeTab === "dashboard" ? "" : "hover:bg-gray-100"}`}
                      onClick={() => setActiveTab("dashboard")}
                    >
                      <Icon name="LayoutDashboard" className="mr-2 h-5 w-5" />
                      Дашборд
                    </Button>
                    
                    <Button
                      variant={activeTab === "motorcycles" ? "default" : "ghost"}
                      className={`w-full justify-start ${activeTab === "motorcycles" ? "" : "hover:bg-gray-100"}`}
                      onClick={() => setActiveTab("motorcycles")}
                    >
                      <Icon name="Bike" className="mr-2 h-5 w-5" />
                      Мотоциклы
                      <Badge className="ml-auto bg-primary/10 text-primary">{totalMotorcycles}</Badge>
                    </Button>
                    
                    <Button
                      variant={activeTab === "bookings" ? "default" : "ghost"}
                      className={`w-full justify-start ${activeTab === "bookings" ? "" : "hover:bg-gray-100"}`}
                      onClick={() => setActiveTab("bookings")}
                    >
                      <Icon name="CalendarCheck" className="mr-2 h-5 w-5" />
                      Бронирования
                      {pendingBookings > 0 && (
                        <Badge className="ml-auto bg-amber-500 text-white">{pendingBookings}</Badge>
                      )}
                    </Button>
                    
                    <Button
                      variant={activeTab === "users" ? "default" : "ghost"}
                      className={`w-full justify-start ${activeTab === "users" ? "" : "hover:bg-gray-100"}`}
                      onClick={() => setActiveTab("users")}
                    >
                      <Icon name="Users" className="mr-2 h-5 w-5" />
                      Пользователи
                    </Button>
                    
                    <Button
                      variant={activeTab === "analytics" ? "default" : "ghost"}
                      className={`w-full justify-start ${activeTab === "analytics" ? "" : "hover:bg-gray-100"}`}
                      onClick={() => setActiveTab("analytics")}
                    >
                      <Icon name="BarChart3" className="mr-2 h-5 w-5" />
                      Аналитика
                    </Button>
                    
                    <Button
                      variant={activeTab === "reports" ? "default" : "ghost"}
                      className={`w-full justify-start ${activeTab === "reports" ? "" : "hover:bg-gray-100"}`}
                      onClick={() => setActiveTab("reports")}
                    >
                      <Icon name="FileText" className="mr-2 h-5 w-5" />
                      Отчеты
                    </Button>
                    
                    <Button
                      variant={activeTab === "settings" ? "default" : "ghost"}
                      className={`w-full justify-start ${activeTab === "settings" ? "" : "hover:bg-gray-100"}`}
                      onClick={() => setActiveTab("settings")}
                    >
                      <Icon name="Settings" className="mr-2 h-5 w-5" />
                      Настройки
                    </Button>
                  </nav>
                </div>
                
                <Separator />
                
                <div className="p-4 bg-gray-50">
                  <div className="text-sm font-medium text-gray-500 mb-2">Быстрые действия</div>
                  <div className="space-y-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full justify-start"
                      onClick={handleAddNew}
                    >
                      <Icon name="PlusCircle" className="mr-2 h-4 w-4" />
                      Добавить мотоцикл
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full justify-start"
                      onClick={() => {
                        setActiveTab("bookings");
                        setFilterStatus("pending");
                      }}
                    >
                      <Icon name="ClipboardCheck" className="mr-2 h-4 w-4" />
                      Проверить бронирования
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full justify-start"
                      onClick={handleExport}
                    >
                      <Icon name="Download" className="mr-2 h-4 w-4" />
                      Экспорт данных
                    </Button>
                  </div>
                </div>
              </Card>
              
              {/* Карточка системной информации */}
              <Card className="mt-4 border-none shadow-sm overflow-hidden">
                <CardHeader className="bg-white pb-2">
                  <CardTitle className="text-sm font-medium">Информация о системе</CardTitle>
                </CardHeader>
                <CardContent className="pt-2 pb-4">
                  <div className="text-xs space-y-2 text-gray-500">
                    <div className="flex justify-between">
                      <span>Версия:</span>
                      <span>1.2.3</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Последнее обновление:</span>
                      <span>25.04.2025</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Статус системы:</span>
                      <span className="text-green-500">Активна</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </aside>
            
            {/* Основной контент */}
            <div className="flex-1">
              {/* Дашборд */}
              {activeTab === "dashboard" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold mb-4">Обзор системы</h2>
                  
                  {/* Ключевые метрики */}
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                    <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
                      <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Бронирования</CardTitle>
                        <div className="p-2 bg-blue-100 rounded-full">
                          <Icon name="Calendar" className="h-4 w-4 text-blue-500" />
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{totalBookings}</div>
                        <div className="flex items-center mt-1">
                          <span className="text-xs text-gray-500 mr-2">За месяц</span>
                          <Badge className="bg-green-100 text-green-700 text-xs">
                            <Icon name="TrendingUp" className="h-3 w-3 mr-1" />
                            +12%
                          </Badge>
                        </div>
                        <div className="mt-3">
                          <MiniChart data={[8, 12, 10, 14, 16, 12, 15]} />
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
                      <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Выручка</CardTitle>
                        <div className="p-2 bg-green-100 rounded-full">
                          <Icon name="DollarSign" className="h-4 w-4 text-green-500" />
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{totalRevenue.toLocaleString()} ₽</div>
                        <div className="flex items-center mt-1">
                          <span className="text-xs text-gray-500 mr-2">За месяц</span>
                          <Badge className="bg-green-100 text-green-700 text-xs">
                            <Icon name="TrendingUp" className="h-3 w-3 mr-1" />
                            +23%
                          </Badge>
                        </div>
                        <div className="mt-3">
                          <MiniChart data={[25000, 35000, 30000, 40000, 45000, 40000, 50000]} />
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
                      <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Пользователи</CardTitle>
                        <div className="p-2 bg-purple-100 rounded-full">
                          <Icon name="Users" className="h-4 w-4 text-purple-500" />
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{users.length}</div>
                        <div className="flex items-center mt-1">
                          <span className="text-xs text-gray-500 mr-2">Активных</span>
                          <Badge className="bg-green-100 text-green-700 text-xs">
                            <span>{users.filter(u => u.status === "active").length}</span>
                          </Badge>
                        </div>
                        <div className="mt-3">
                          <MiniChart data={[10, 15, 18, 22, 25, 28, 30]} type="bar" />
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
                      <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Мотоциклы</CardTitle>
                        <div className="p-2 bg-primary/10 rounded-full">
                          <Icon name="Bike" className="h-4 w-4 text-primary" />
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{totalMotorcycles}</div>
                        <div className="flex items-center mt-1">
                          <span className="text-xs text-gray-500 mr-2">Доступно</span>
                          <Badge className="bg-blue-100 text-blue-700 text-xs">
                            <span>{availableMotorcycles}</span>
                          </Badge>
                        </div>
                        <div className="mt-3">
                          <div className="w-full bg-gray-100 rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full" 
                              style={{ width: `${(availableMotorcycles / totalMotorcycles) * 100}%` }}
                            ></div>
                          </div>
                          <div className="flex justify-between mt-1 text-xs text-gray-500">
                            <span>Недоступно: {totalMotorcycles - availableMotorcycles}</span>
                            <span>Доступно: {availableMotorcycles}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  {/* Последние бронирования и популярные мотоциклы */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card className="border-none shadow-sm">
                      <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                          <CardTitle>Последние бронирования</CardTitle>
                          <CardDescription>
                            Недавние бронирования мотоциклов
                          </CardDescription>
                        </div>
                        <Button variant="outline" size="sm" onClick={() => setActiveTab("bookings")}>
                          Все бронирования
                        </Button>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {bookings.slice(0, 3).map((booking) => (
                            <div key={booking.id} className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                                <Icon name="User" className="h-5 w-5 text-gray-500" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex justify-between">
                                  <p className="text-sm font-medium truncate">{booking.customerName}</p>
                                  <p className="text-xs text-gray-500">{formatDate(booking.createdAt)}</p>
                                </div>
                                <p className="text-sm text-gray-500 truncate">{booking.motorcycleName}</p>
                              </div>
                              <Badge
                                className={`${
                                  booking.status === "pending" ? "bg-yellow-100 text-yellow-800" : 
                                  booking.status === "confirmed" ? "bg-green-100 text-green-800" : 
                                  booking.status === "completed" ? "bg-blue-100 text-blue-800" : 
                                  "bg-red-100 text-red-800"
                                }`}
                              >
                                {booking.status === "pending" ? "Ожидает" : 
                                booking.status === "confirmed" ? "Подтверждено" : 
                                booking.status === "completed" ? "Завершено" : 
                                "Отменено"}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="border-none shadow-sm">
                      <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                          <CardTitle>Популярные мотоциклы</CardTitle>
                          <CardDescription>
                            Мотоциклы с наибольшим количеством аренд
                          </CardDescription>
                        </div>
                        <Button variant="outline" size="sm" onClick={() => setActiveTab("motorcycles")}>
                          Все мотоциклы
                        </Button>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {motorcyclesList
                            .sort((a, b) => (b.rentCount || 0) - (a.rentCount || 0))
                            .slice(0, 3)
                            .map((motorcycle) => (
                              <div key={motorcycle.id} className="flex items-center gap-4">
                                <div className="w-14 h-10 rounded bg-gray-100 overflow-hidden flex-shrink-0">
                                  <img 
                                    src={motorcycle.image} 
                                    alt={motorcycle.name} 
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex justify-between">
                                    <p className="text-sm font-medium truncate">{motorcycle.name}</p>
                                    <p className="text-sm font-medium text-primary">{motorcycle.price.toLocaleString()} ₽</p>
                                  </div>
                                  <div className="flex justify-between">
                                    <p className="text-xs text-gray-500">Категория: {motorcycle.category}</p>
                                    <p className="text-xs text-gray-500">Аренд: {motorcycle.rentCount}</p>
                                  </div>
                                </div>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="p-0 h-8 w-8"
                                  onClick={() => navigate(`/motorcycle/${motorcycle.id}`)}
                                >
                                  <Icon name="ExternalLink" className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  {/* Деятельность и задачи */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card className="border-none shadow-sm">
                      <CardHeader>
                        <CardTitle>Недавняя активность</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="relative pl-6 space-y-6">
                          <div className="absolute top-0 bottom-0 left-2.5 w-px bg-gray-200"></div>
                          
                          <div className="relative">
                            <div className="absolute left-[-24px] rounded-full bg-blue-100 p-1">
                              <Icon name="CircleCheck" className="h-4 w-4 text-blue-500" />
                            </div>
                            <div className="mb-1">
                              <span className="font-medium">Новое бронирование</span>
                              <span className="text-xs text-gray-500 ml-2">2 часа назад</span>
                            </div>
                            <p className="text-sm text-gray-600">
                              Поступило новое бронирование от пользователя Дмитрий С.
                            </p>
                          </div>
                          
                          <div className="relative">
                            <div className="absolute left-[-24px] rounded-full bg-green-100 p-1">
                              <Icon name="UserCheck" className="h-4 w-4 text-green-500" />
                            </div>
                            <div className="mb-1">
                              <span className="font-medium">Новый пользователь</span>
                              <span className="text-xs text-gray-500 ml-2">5 часов назад</span>
                            </div>
                            <p className="text-sm text-gray-600">
                              Зарегистрировался новый пользователь Екатерина В.
                            </p>
                          </div>
                          
                          <div className="relative">
                            <div className="absolute left-[-24px] rounded-full bg-yellow-100 p-1">
                              <Icon name="AlertTriangle" className="h-4 w-4 text-yellow-500" />
                            </div>
                            <div className="mb-1">
                              <span className="font-medium">Возврат мотоцикла</span>
                              <span className="text-xs text-gray-500 ml-2">вчера</span>
                            </div>
                            <p className="text-sm text-gray-600">
                              Требуется проверка мотоцикла BMW R 1250 GS после возврата
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="border-none shadow-sm">
                      <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Задачи на сегодня</CardTitle>
                        <Button variant="ghost" size="sm">
                          <Icon name="Plus" className="h-4 w-4" />
                        </Button>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center">
                            <Checkbox id="task-1" />
                            <label
                              htmlFor="task-1"
                              className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              Подтвердить бронирования (2)
                            </label>
                            <Badge className="ml-auto bg-red-100 text-red-700">Срочно</Badge>
                          </div>
                          
                          <div className="flex items-center">
                            <Checkbox id="task-2" />
                            <label
                              htmlFor="task-2"
                              className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              Обновить цены на мотоциклы
                            </label>
                            <Badge className="ml-auto bg-yellow-100 text-yellow-700">Средний</Badge>
                          </div>
                          
                          <div className="flex items-center">
                            <Checkbox id="task-3" defaultChecked />
                            <label
                              htmlFor="task-3"
                              className="ml-2 text-sm font-medium leading-none line-through text-gray-500"
                            >
                              Проверить техническое состояние Honda CB650R
                            </label>
                          </div>
                          
                          <div className="flex items-center">
                            <Checkbox id="task-4" />
                            <label
                              htmlFor="task-4"
                              className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              Связаться с клиентом по поводу возврата залога
                            </label>
                            <Badge className="ml-auto bg-blue-100 text-blue-700">Низкий</Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}
              
              {/* Вкладка мотоциклов */}
              {activeTab === "motorcycles" && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <h2 className="text-2xl font-bold">Управление мотоциклами</h2>
                    <div className="flex gap-2">
                      <Button onClick={handleAddNew}>
                        <Icon name="Plus" className="mr-2 h-4 w-4" />
                        Добавить мотоцикл
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline">
                            <Icon name="MoreHorizontal" className="h-4 w-4 mr-2" />
                            Действия
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem onClick={handleExport}>
                            <Icon name="Download" className="mr-2 h-4 w-4" />
                            <span>Экспорт списка</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Icon name="Upload" className="mr-2 h-4 w-4" />
                            <span>Импорт списка</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => performBulkAction('available', filteredMotorcycles.map(m => m.id))}>
                            <Icon name="Eye" className="mr-2 h-4 w-4" />
                            <span>Сделать все доступными</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => performBulkAction('unavailable', filteredMotorcycles.map(m => m.id))}>
                            <Icon name="EyeOff" className="mr-2 h-4 w-4" />
                            <span>Сделать все недоступными</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  
                  <Card className="border-none shadow-sm overflow-hidden">
                    <CardHeader className="bg-white flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <CardTitle>Список мотоциклов</CardTitle>
                        <CardDescription>
                          Всего {filteredMotorcycles.length} из {totalMotorcycles} мотоциклов
                        </CardDescription>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <div className="relative">
                          <Icon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input 
                            placeholder="Поиск мотоциклов..." 
                            className="pl-10 sm:w-64"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                          />
                        </div>
                        
                        <div className="flex gap-2">
                          <Select 
                            value={availabilityFilter} 
                            onValueChange={(value) => setAvailabilityFilter(value as "all" | "available" | "unavailable")}
                          >
                            <SelectTrigger className="w-40">
                              <SelectValue placeholder="Доступность" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">Все мотоциклы</SelectItem>
                              <SelectItem value="available">Доступные</SelectItem>
                              <SelectItem value="unavailable">Недоступные</SelectItem>
                            </SelectContent>
                          </Select>
                          
                          <Select 
                            value={categoryFilter} 
                            onValueChange={(value) => setCategoryFilter(value)}
                          >
                            <SelectTrigger className="w-40">
                              <SelectValue placeholder="Категория" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">Все категории</SelectItem>
                              {categoryOptions.map(category => (
                                <SelectItem key={category} value={category}>
                                  {category}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="w-[80px]">ID</TableHead>
                              <TableHead>Название</TableHead>
                              <TableHead>Категория</TableHead>
                              <TableHead className="text-right">Цена/день</TableHead>
                              <TableHead>Статус</TableHead>
                              <TableHead>Аренд</TableHead>
                              <TableHead className="text-right">Действия</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {filteredMotorcycles.length > 0 ? (
                              filteredMotorcycles.map((motorcycle) => (
                                <ContextMenu key={motorcycle.id}>
                                  <ContextMenuTrigger>
                                    <TableRow className="hover:bg-gray-50 cursor-pointer">
                                      <TableCell className="font-medium">{motorcycle.id}</TableCell>
                                      <TableCell>
                                        <div className="flex items-center space-x-3">
                                          <div className="h-10 w-14 rounded-md overflow-hidden flex-shrink-0">
                                            <img 
                                              src={motorcycle.image} 
                                              alt={motorcycle.name} 
                                              className="h-full w-full object-cover"
                                            />
                                          </div>
                                          <div>
                                            <div className="font-medium line-clamp-1">{motorcycle.name}</div>
                                            <div className="text-xs text-gray-500">{motorcycle.year} г., {motorcycle.power}</div>
                                          </div>
                                        </div>
                                      </TableCell>
                                      <TableCell>
                                        <Badge variant="outline" className="bg-gray-50">
                                          {motorcycle.category}
                                        </Badge>
                                      </TableCell>
                                      <TableCell className="text-right font-medium">
                                        {motorcycle.price.toLocaleString()} ₽
                                        {motorcycle.discount && motorcycle.discount > 0 && (
                                          <div className="text-xs text-green-600">
                                            Скидка {motorcycle.discount}%
                                          </div>
                                        )}
                                      </TableCell>
                                      <TableCell>
                                        {motorcycle.availability ? (
                                          <Badge className="bg-green-100 text-green-700">Доступен</Badge>
                                        ) : (
                                          <Badge className="bg-red-100 text-red-700">Недоступен</Badge>
                                        )}
                                      </TableCell>
                                      <TableCell>
                                        <TooltipProvider>
                                          <Tooltip>
                                            <TooltipTrigger asChild>
                                              <div className="flex items-center">
                                                <span>{motorcycle.rentCount || 0}</span>
                                                {motorcycle.rentCount && motorcycle.rentCount > 10 && (
                                                  <Icon name="Flame" className="ml-1 h-3.5 w-3.5 text-orange-500" />
                                                )}
                                              </div>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                              <p>{motorcycle.rentCount && motorcycle.rentCount > 10 ? "Популярный мотоцикл" : "Количество аренд"}</p>
                                            </TooltipContent>
                                          </Tooltip>
                                        </TooltipProvider>
                                      </TableCell>
                                      <TableCell className="text-right">
                                        <div className="flex items-center justify-end space-x-2">
                                          <Button 
                                            variant="ghost" 
                                            size="icon" 
                                            onClick={() => toggleAvailability(motorcycle)}
                                            className="h-8 w-8"
                                          >
                                            {motorcycle.availability ? (
                                              <Icon name="EyeOff" className="h-4 w-4" />
                                            ) : (
                                              <Icon name="Eye" className="h-4 w-4" />
                                            )}
                                          </Button>
                                          <Button 
                                            variant="ghost" 
                                            size="icon" 
                                            onClick={() => handleEdit(motorcycle)}
                                            className="h-8 w-8"
                                          >
                                            <Icon name="Edit" className="h-4 w-4" />
                                          </Button>
                                          <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                                <Icon name="MoreVertical" className="h-4 w-4" />
                                              </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                              <DropdownMenuItem onClick={() => navigate(`/motorcycle/${motorcycle.id}`)}>
                                                <Icon name="ExternalLink" className="mr-2 h-4 w-4" />
                                                <span>Просмотр на сайте</span>
                                              </DropdownMenuItem>
                                              <DropdownMenuItem onClick={() => handleDuplicate(motorcycle)}>
                                                <Icon name="Copy" className="mr-2 h-4 w-4" />
                                                <span>Дублировать</span>
                                              </DropdownMenuItem>
                                              <DropdownMenuSeparator />
                                              <DropdownMenuItem 
                                                className="text-red-600" 
                                                onClick={() => handleDelete(motorcycle)}
                                              >
                                                <Icon name="Trash" className="mr-2 h-4 w-4" />
                                                <span>Удалить</span>
                                              </DropdownMenuItem>
                                            </DropdownMenuContent>
                                          </DropdownMenu>
                                        </div>
                                      </TableCell>
                                    </TableRow>
                                  </ContextMenuTrigger>
                                  <ContextMenuContent>
                                    <ContextMenuItem onClick={() => handleEdit(motorcycle)}>
                                      <Icon name="Edit" className="mr-2 h-4 w-4" />
                                      Редактировать
                                    </ContextMenuItem>
                                    <ContextMenuItem onClick={() => navigate(`/motorcycle/${motorcycle.id}`)}>
                                      <Icon name="ExternalLink" className="mr-2 h-4 w-4" />
                                      Просмотр на сайте
                                    </ContextMenuItem>
                                    <ContextMenuItem onClick={() => toggleAvailability(motorcycle)}>
                                      {motorcycle.availability ? (
                                        <>
                                          <Icon name="EyeOff" className="mr-2 h-4 w-4" />
                                          Сделать недоступным
                                        </>
                                      ) : (
                                        <>
                                          <Icon name="Eye" className="mr-2 h-4 w-4" />
                                          Сделать доступным
                                        </>
                                      )}
                                    </ContextMenuItem>
                                    <ContextMenuItem onClick={() => handleDuplicate(motorcycle)}>
                                      <Icon name="Copy" className="mr-2 h-4 w-4" />
                                      Дублировать
                                    </ContextMenuItem>
                                    <ContextMenuSeparator />
                                    <ContextMenuItem 
                                      className="text-red-600" 
                                      onClick={() => handleDelete(motorcycle)}
                                    >
                                      <Icon name="Trash" className="mr-2 h-4 w-4" />
                                      Удалить
                                    </ContextMenuItem>
                                  </ContextMenuContent>
                                </ContextMenu>
                              ))
                            ) : (
                              <TableRow>
                                <TableCell colSpan={7} className="h-24 text-center">
                                  <div className="flex flex-col items-center justify-center">
                                    <Icon name="Search" className="h-8 w-8 text-gray-400 mb-2" />
                                    <p className="font-medium text-gray-600">Ничего не найдено</p>
                                    <p className="text-sm text-gray-500 mt-1">
                                      Попробуйте изменить параметры фильтрации
                                    </p>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="mt-4"
                                      onClick={() => {
                                        setSearchTerm("");
                                        setAvailabilityFilter("all");
                                        setCategoryFilter("all");
                                      }}
                                    >
                                      Сбросить фильтры
                                    </Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            )}
                          </TableBody>
                        </Table>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
              
              {/* Вкладка бронирований */}
              {activeTab === "bookings" && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold">Управление бронированиями</h2>
                    <div className="flex gap-2">
                      <Select value={filterStatus} onValueChange={setFilterStatus}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Статус" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Все статусы</SelectItem>
                          <SelectItem value="pending">Ожидает подтверждения</SelectItem>
                          <SelectItem value="confirmed">Подтверждено</SelectItem>
                          <SelectItem value="completed">Завершено</SelectItem>
                          <SelectItem value="cancelled">Отменено</SelectItem>
                        </SelectContent>
                      </Select>
                      
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline">
                            <Icon name="Calendar" className="mr-2 h-4 w-4" />
                            Период
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-4" align="end">
                          <div className="grid gap-4">
                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <Label htmlFor="date-from">Дата с</Label>
                                <Input
                                  id="date-from"
                                  type="date"
                                  className="mt-1"
                                  value={dateFilter.from}
                                  onChange={(e) => setDateFilter({
                                    ...dateFilter,
                                    from: e.target.value
                                  })}
                                />
                              </div>
                              <div>
                                <Label htmlFor="date-to">Дата по</Label>
                                <Input
                                  id="date-to"
                                  type="date"
                                  className="mt-1"
                                  value={dateFilter.to}
                                  defaultValue={currentDate}
                                  onChange={(e) => setDateFilter({
                                    ...dateFilter,
                                    to: e.target.value
                                  })}
                                />
                              </div>
                            </div>
                            <Button type="submit">Применить</Button>
                          </div>
                        </PopoverContent>
                      </Popover>
                      
                      <Button variant="outline" onClick={handleExport}>
                        <Icon name="Download" className="mr-2 h-4 w-4" />
                        Экспорт
                      </Button>
                    </div>
                  </div>
                  
                  <Card className="border-none shadow-sm">
                    <CardContent className="p-0">
                      {filteredBookings.length > 0 ? (
                        <div className="overflow-x-auto">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead className="w-[60px]">ID</TableHead>
                                <TableHead>Клиент</TableHead>
                                <TableHead>Мотоцикл</TableHead>
                                <TableHead>Период</TableHead>
                                <TableHead className="text-right">Сумма</TableHead>
                                <TableHead>Статус</TableHead>
                                <TableHead>Оплата</TableHead>
                                <TableHead className="text-right">Действия</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {filteredBookings.map((booking) => (
                                <TableRow key={booking.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => handleViewBooking(booking)}>
                                  <TableCell className="font-medium">{booking.id}</TableCell>
                                  <TableCell>
                                    <HoverCard>
                                      <HoverCardTrigger asChild>
                                        <div className="flex flex-col">
                                          <span className="font-medium">{booking.customerName}</span>
                                          <span className="text-xs text-gray-500 truncate">{booking.email}</span>
                                        </div>
                                      </HoverCardTrigger>
                                      <HoverCardContent className="w-80">
                                        <div className="flex justify-between space-x-4">
                                          <div className="space-y-1">
                                            <h4 className="text-sm font-semibold">Контактная информация</h4>
                                            <div className="text-sm">
                                              <p className="flex items-center text-gray-600">
                                                <Icon name="Mail" className="h-3.5 w-3.5 mr-1" />
                                                {booking.email}
                                              </p>
                                              <p className="flex items-center text-gray-600">
                                                <Icon name="Phone" className="h-3.5 w-3.5 mr-1" />
                                                {booking.phone}
                                              </p>
                                            </div>
                                            <div className="pt-2">
                                              <p className="text-xs text-muted-foreground">
                                                Создано: {formatDate(booking.createdAt)}
                                              </p>
                                            </div>
                                          </div>
                                        </div>
                                      </HoverCardContent>
                                    </HoverCard>
                                  </TableCell>
                                  <TableCell>{booking.motorcycleName}</TableCell>
                                  <TableCell>
                                    <div className="flex flex-col">
                                      <div className="flex items-center text-xs">
                                        <Icon name="CalendarPlus" className="mr-1 h-3 w-3 text-gray-500" />
                                        <span>{formatDate(booking.startDate)}</span>
                                      </div>
                                      <div className="flex items-center text-xs">
                                        <Icon name="CalendarMinus" className="mr-1 h-3 w-3 text-gray-500" />
                                        <span>{formatDate(booking.endDate)}</span>
                                      </div>
                                      <Badge className="mt-1 w-fit bg-gray-100 text-gray-700 hover:bg-gray-100">
                                        {booking.rentalDays} {booking.rentalDays === 1 ? 'день' : 
                                          booking.rentalDays > 1 && booking.rentalDays < 5 ? 'дня' : 'дней'}
                                      </Badge>
                                    </div>
                                  </TableCell>
                                  <TableCell className="text-right font-medium">
                                    {booking.totalPrice.toLocaleString()} ₽
                                  </TableCell>
                                  <TableCell>
                                    {booking.status === "pending" && (
                                      <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                                        Ожидает
                                      </Badge>
                                    )}
                                    {booking.status === "confirmed" && (
                                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                        Подтверждено
                                      </Badge>
                                    )}
                                    {booking.status === "completed" && (
                                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                        Завершено
                                      </Badge>
                                    )}
                                    {booking.status === "cancelled" && (
                                      <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                                        Отменено
                                      </Badge>
                                    )}
                                  </TableCell>
                                  <TableCell>
                                    {booking.paymentStatus === "paid" && (
                                      <Badge className="bg-green-100 text-green-700">Оплачено</Badge>
                                    )}
                                    {booking.paymentStatus === "pending" && (
                                      <Badge className="bg-yellow-100 text-yellow-700">Ожидает</Badge>
                                    )}
                                    {booking.paymentStatus === "refunded" && (
                                      <Badge className="bg-blue-100 text-blue-700">Возврат</Badge>
                                    )}
                                  </TableCell>
                                  <TableCell className="text-right">
                                    <div className="flex items-center justify-end space-x-2">
                                      <Button 
                                        variant="ghost" 
                                        size="icon" 
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleViewBooking(booking);
                                        }}
                                        className="h-8 w-8"
                                      >
                                        <Icon name="Eye" className="h-4 w-4" />
                                      </Button>
                                      <DropdownMenu>
                                        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                                          <Button variant="ghost" size="icon" className="h-8 w-8">
                                            <Icon name="MoreVertical" className="h-4 w-4" />
                                          </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                          <DropdownMenuLabel>Действия</DropdownMenuLabel>
                                          <DropdownMenuSeparator />
                                          {booking.status === "pending" && (
                                            <>
                                              <DropdownMenuItem onClick={(e) => {
                                                e.stopPropagation();
                                                updateBookingStatus(booking.id, "confirmed");
                                              }}>
                                                <Icon name="Check" className="mr-2 h-4 w-4 text-green-500" />
                                                <span>Подтвердить</span>
                                              </DropdownMenuItem>
                                              <DropdownMenuItem onClick={(e) => {
                                                e.stopPropagation();
                                                updateBookingStatus(booking.id, "cancelled");
                                              }}>
                                                <Icon name="X" className="mr-2 h-4 w-4 text-red-500" />
                                                <span>Отменить</span>
                                              </DropdownMenuItem>
                                            </>
                                          )}
                                          {booking.status === "confirmed" && (
                                            <DropdownMenuItem onClick={(e) => {
                                              e.stopPropagation();
                                              updateBookingStatus(booking.id, "completed");
                                            }}>
                                              <Icon name="CheckCheck" className="mr-2 h-4 w-4 text-blue-500" />
                                              <span>Завершить</span>
                                            </DropdownMenuItem>
                                          )}
                                          <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                                            <Icon name="FileText" className="mr-2 h-4 w-4" />
                                            <span>Печать договора</span>
                                          </DropdownMenuItem>
                                          <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                                            <Icon name="Mail" className="mr-2 h-4 w-4" />
                                            <span>Отправить письмо</span>
                                          </DropdownMenuItem>
                                        </DropdownMenuContent>
                                      </DropdownMenu>
                                    </div>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center py-12 text-center">
                          <Icon name="Calendar" className="h-12 w-12 text-gray-400 mb-4" />
                          <h3 className="text-lg font-medium mb-2">Бронирований не найдено</h3>
                          <p className="text-gray-500 max-w-md">
                            {filterStatus !== "all" 
                              ? "Попробуйте изменить фильтр статуса"
                              : "Список бронирований появится здесь, когда клиенты начнут бронировать мотоциклы"}
                          </p>
                          {filterStatus !== "all" && (
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="mt-4"
                              onClick={() => setFilterStatus("all")}
                            >
                              Показать все бронирования
                            </Button>
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              )}
              
              {/* Вкладка пользователей */}
              {activeTab === "users" && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold">Управление пользователями</h2>
                    <div className="flex gap-2">
                      <Select value={userStatusFilter} onValueChange={(value) => setUserStatusFilter(value as "all" | "active" | "blocked" | "pending")}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Статус" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Все пользователи</SelectItem>
                          <SelectItem value="active">Активные</SelectItem>
                          <SelectItem value="blocked">Заблокированные</SelectItem>
                          <SelectItem value="pending">Ожидающие</SelectItem>
                        </SelectContent>
                      </Select>
                      
                      <div className="relative">
                        <Icon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input 
                          placeholder="Поиск пользователей..." 
                          className="pl-10"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <Card className="border-none shadow-sm">
                    <CardContent className="p-0">
                      {filteredUsers.length > 0 ? (
                        <div className="overflow-x-auto">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead className="w-[60px]">ID</TableHead>
                                <TableHead>Пользователь</TableHead>
                                <TableHead>Контакты</TableHead>
                                <TableHead>Дата регистрации</TableHead>
                                <TableHead>Бронирований</TableHead>
                                <TableHead>Статус</TableHead>
                                <TableHead className="text-right">Действия</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {filteredUsers.map((user) => (
                                <TableRow key={user.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => handleViewUser(user)}>
                                  <TableCell className="font-medium">{user.id}</TableCell>
                                  <TableCell>
                                    <div className="flex items-center gap-3">
                                      <div className="h-8 w-8 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                                        {user.avatar ? (
                                          <img 
                                            src={user.avatar} 
                                            alt={user.name} 
                                            className="h-full w-full object-cover" 
                                          />
                                        ) : (
                                          <div className="h-full w-full flex items-center justify-center bg-primary/10 text-primary font-medium">
                                            {user.name.charAt(0)}
                                          </div>
                                        )}
                                      </div>
                                      <div>
                                        <div className="font-medium flex items-center">
                                          {user.name}
                                          {user.verified && (
                                            <Icon name="BadgeCheck" className="ml-1 h-3.5 w-3.5 text-blue-500" />
                                          )}
                                        </div>
                                        <div className="text-xs text-gray-500">
                                          {user.role === "admin" 
                                            ? "Администратор" 
                                            : user.role === "manager" 
                                              ? "Менеджер" 
                                              : "Пользователь"}
                                        </div>
                                      </div>
                                    </div>
                                  </TableCell>
                                  <TableCell>
                                    <div className="text-sm">
                                      <div className="flex items-center">
                                        <Icon name="Mail" className="mr-1 h-3.5 w-3.5 text-gray-500" />
                                        <span className="text-gray-600">{user.email}</span>
                                      </div>
                                      <div className="flex items-center">
                                        <Icon name="Phone" className="mr-1 h-3.5 w-3.5 text-gray-500" />
                                        <span className="text-gray-600">{user.phone}</span>
                                      </div>
                                    </div>
                                  </TableCell>
                                  <TableCell>{formatDate(user.registeredAt)}</TableCell>
                                  <TableCell>
                                    <Badge className="bg-gray-100 text-gray-700">
                                      {user.bookingsCount}
                                    </Badge>
                                  </TableCell>
                                  <TableCell>
                                    {user.status === "active" && (
                                      <Badge className="bg-green-100 text-green-700">Активен</Badge>
                                    )}
                                    {user.status === "blocked" && (
                                      <Badge className="bg-red-100 text-red-700">Заблокирован</Badge>
                                    )}
                                    {user.status === "pending" && (
                                      <Badge className="bg-yellow-100 text-yellow-700">Ожидает</Badge>
                                    )}
                                  </TableCell>
                                  <TableCell className="text-right">
                                    <div className="flex items-center justify-end space-x-2">
                                      <Button 
                                        variant="ghost" 
                                        size="icon" 
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleViewUser(user);
                                        }}
                                        className="h-8 w-8"
                                      >
                                        <Icon name="Eye" className="h-4 w-4" />
                                      </Button>
                                      <DropdownMenu>
                                        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                                          <Button variant="ghost" size="icon" className="h-8 w-8">
                                            <Icon name="MoreVertical" className="h-4 w-4" />
                                          </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                          <DropdownMenuLabel>Действия</DropdownMenuLabel>
                                          <DropdownMenuSeparator />
                                          <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                                            <Icon name="Mail" className="mr-2 h-4 w-4" />
                                            <span>Отправить сообщение</span>
                                          </DropdownMenuItem>
                                          <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                                            <Icon name="FileText" className="mr-2 h-4 w-4" />
                                            <span>История бронирований</span>
                                          </DropdownMenuItem>
                                          <DropdownMenuSeparator />
                                          {user.status === "active" && (
                                            <DropdownMenuItem onClick={(e) => {
                                              e.stopPropagation();
                                              updateUserStatus(user.id, "blocked");
                                            }}>
                                              <Icon name="Ban" className="mr-2 h-4 w-4 text-red-500" />
                                              <span>Заблокировать</span>
                                            </DropdownMenuItem>
                                          )}
                                          {user.status === "blocked" && (
                                            <DropdownMenuItem onClick={(e) => {
                                              e.stopPropagation();
                                              updateUserStatus(user.id, "active");
                                            }}>
                                              <Icon name="Unlock" className="mr-2 h-4 w-4 text-green-500" />
                                              <span>Разблокировать</span>
                                            </DropdownMenuItem>
                                          )}
                                          {user.status === "pending" && (
                                            <DropdownMenuItem onClick={(e) => {
                                              e.stopPropagation();
                                              updateUserStatus(user.id, "active");
                                            }}>
                                              <Icon name="CheckCircle" className="mr-2 h-4 w-4 text-green-500" />
                                              <span>Активировать</span>
                                            </DropdownMenuItem>
                                          )}
                                        </DropdownMenuContent>
                                      </DropdownMenu>
                                    </div>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center py-12 text-center">
                          <Icon name="Users" className="h-12 w-12 text-gray-400 mb-4" />
                          <h3 className="text-lg font-medium mb-2">Пользователей не найдено</h3>
                          <p className="text-gray-500 max-w-md">
                            По выбранным фильтрам не найдено пользователей
                          </p>
                          {userStatusFilter !== "all" && (
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="mt-4"
                              onClick={() => setUserStatusFilter("all")}
                            >
                              Показать всех пользователей
                            </Button>
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              )}
              
              {/* Раздел отчетов - Новый раздел */}
              {activeTab === "reports" && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold">Отчеты и аналитика</h2>
                    <div className="flex gap-2">
                      <Select 
                        value={reportFilter}
                        onValueChange={(value: "all" | "active" | "paused") => setReportFilter(value)}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Статус" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Все отчеты</SelectItem>
                          <SelectItem value="active">Активные</SelectItem>
                          <SelectItem value="paused">Приостановленные</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button onClick={handleCreateReport}>
                        <Icon name="Plus" className="mr-2 h-4 w-4" />
                        Создать отчет
                      </Button>
                    </div>
                  </div>
                  
                  <Card className="border-none shadow-sm">
                    <CardHeader>
                      <CardTitle>Запланированные отчеты</CardTitle>
                      <CardDescription>
                        Настройка автоматической генерации отчетов по расписанию
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {filteredReports.length > 0 ? (
                        <div className="overflow-x-auto">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead className="w-[80px]">ID</TableHead>
                                <TableHead>Название</TableHead>
                                <TableHead>Периодичность</TableHead>
                                <TableHead>Формат</TableHead>
                                <TableHead>Последняя генерация</TableHead>
                                <TableHead>Статус</TableHead>
                                <TableHead className="text-right">Действия</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {filteredReports.map((report) => (
                                <TableRow key={report.id} className="hover:bg-gray-50">
                                  <TableCell className="font-medium">{report.id}</TableCell>
                                  <TableCell>
                                    <div>
                                      <div className="font-medium">{report.title}</div>
                                      <div className="text-xs text-gray-500">{report.description}</div>
                                    </div>
                                  </TableCell>
                                  <TableCell>
                                    <Badge variant="outline" className="bg-gray-50">
                                      {report.type === "daily" ? "Ежедневно" : 
                                       report.type === "weekly" ? "Еженедельно" : 
                                       report.type === "monthly" ? "Ежемесячно" : "Пользовательский"}
                                    </Badge>
                                  </TableCell>
                                  <TableCell>
                                    <Badge variant="outline" className="bg-blue-50 text-blue-700">
                                      {report.format.toUpperCase()}
                                    </Badge>
                                  </TableCell>
                                  <TableCell>
                                    {report.lastGenerated ? formatDate(report.lastGenerated) : "Не генерировался"}
                                  </TableCell>
                                  <TableCell>
                                    {report.status === "active" ? (
                                      <Badge className="bg-green-100 text-green-700">Активен</Badge>
                                    ) : (
                                      <Badge className="bg-gray-100 text-gray-700">Приостановлен</Badge>
                                    )}
                                  </TableCell>
                                  <TableCell className="text-right">
                                    <div className="flex items-center justify-end space-x-2">
                                      <TooltipProvider>
                                        <Tooltip>
                                          <TooltipTrigger asChild>
                                            <Button 
                                              variant="ghost" 
                                              size="icon" 
                                              onClick={() => generateReport(report.id)}
                                              className="h-8 w-8"
                                            >
                                              <Icon name="FileOutput" className="h-4 w-4" />
                                            </Button>
                                          </TooltipTrigger>
                                          <TooltipContent>
                                            <p>Сгенерировать отчет сейчас</p>
                                          </TooltipContent>
                                        </Tooltip>
                                      </TooltipProvider>
                                      <TooltipProvider>
                                        <Tooltip>
                                          <TooltipTrigger asChild>
                                            <Button 
                                              variant="ghost" 
                                              size="icon" 
                                              onClick={() => toggleReportStatus(report.id)}
                                              className="h-8 w-8"
                                            >
                                              {report.status === "active" ? (
                                                <Icon name="Pause" className="h-4 w-4" />
                                              ) : (
                                                <Icon name="Play" className="h-4 w-4" />
                                              )}
                                            </Button>
                                          </TooltipTrigger>
                                          <TooltipContent>
                                            <p>{report.status === "active" ? "Приостановить" : "Активировать"}</p>
                                          </TooltipContent>
                                        </Tooltip>
                                      </TooltipProvider>
                                      <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                          <Button variant="ghost" size="icon" className="h-8 w-8">
                                            <Icon name="MoreVertical" className="h-4 w-4" />
                                          </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                          <DropdownMenuItem>
                                            <Icon name="Edit" className="mr-2 h-4 w-4" />
                                            <span>Редактировать</span>
                                          </DropdownMenuItem>
                                          <DropdownMenuItem>
                                            <Icon name="Share" className="mr-2 h-4 w-4" />
                                            <span>Поделиться</span>
                                          </DropdownMenuItem>
                                          <DropdownMenuSeparator />
                                          <DropdownMenuItem>
                                            <Icon name="Trash" className="mr-2 h-4 w-4 text-red-500" />
                                            <span className="text-red-500">Удалить</span>
                                          </DropdownMenuItem>
                                        </DropdownMenuContent>
                                      </DropdownMenu>
                                    </div>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center py-12 text-center">
                          <Icon name="FileText" className="h-12 w-12 text-gray-400 mb-4" />
                          <h3 className="text-lg font-medium mb-2">Отчетов не найдено</h3>
                          <p className="text-gray-500 max-w-md">
                            У вас пока нет настроенных отчетов. Создайте новый отчет для автоматической генерации.
                          </p>
                          <Button 
                            className="mt-4"
                            onClick={handleCreateReport}
                          >
                            <Icon name="Plus" className="mr-2 h-4 w-4" />
                            Создать отчет
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="border-none shadow-sm">
                      <CardHeader>
                        <CardTitle>Экспорт данных</CardTitle>
                        <CardDescription>
                          Выгрузка и экспорт данных в различных форматах
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div 
                              className="p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                              onClick={() => {
                                setExportOptions({
                                  type: "excel",
                                  section: "motorcycles"
                                });
                                setIsExportDialogOpen(true);
                              }}
                            >
                              <div className="flex items-center mb-2">
                                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-2">
                                  <Icon name="FileSpreadsheet" className="h-4 w-4 text-green-700" />
                                </div>
                                <span className="font-medium">Excel</span>
                              </div>
                              <p className="text-sm text-gray-500">Экспорт в формате Microsoft Excel (.xlsx)</p>
                            </div>
                            
                            <div 
                              className="p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                              onClick={() => {
                                setExportOptions({
                                  type: "csv",
                                  section: "motorcycles"
                                });
                                setIsExportDialogOpen(true);
                              }}
                            >
                              <div className="flex items-center mb-2">
                                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-2">
                                  <Icon name="FileText" className="h-4 w-4 text-blue-700" />
                                </div>
                                <span className="font-medium">CSV</span>
                              </div>
                              <p className="text-sm text-gray-500">Экспорт в CSV для импорта в другие системы</p>
                            </div>
                            
                            <div 
                              className="p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                              onClick={() => {
                                setExportOptions({
                                  type: "pdf",
                                  section: "motorcycles"
                                });
                                setIsExportDialogOpen(true);
                              }}
                            >
                              <div className="flex items-center mb-2">
                                <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mr-2">
                                  <Icon name="FilePdf" className="h-4 w-4 text-red-700" />
                                </div>
                                <span className="font-medium">PDF</span>
                              </div>
                              <p className="text-sm text-gray-500">Экспорт документов в формате PDF</p>
                            </div>
                            
                            <div 
                              className="p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                              onClick={() => {
                                setExportOptions({
                                  type: "json",
                                  section: "motorcycles"
                                });
                                setIsExportDialogOpen(true);
                              }}
                            >
                              <div className="flex items-center mb-2">
                                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-2">
                                  <Icon name="FileJson" className="h-4 w-4 text-purple-700" />
                                </div>
                                <span className="font-medium">JSON</span>
                              </div>
                              <p className="text-sm text-gray-500">Экспорт данных в формате JSON</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="border-none shadow-sm">
                      <CardHeader>
                        <CardTitle>Недавно сгенерированные отчеты</CardTitle>
                        <CardDescription>
                          Последние сгенерированные отчеты и документы
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="p-4 border rounded-lg flex items-center justify-between hover:bg-gray-50 cursor-pointer">
                            <div className="flex items-center">
                              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                                <Icon name="FileText" className="h-4 w-4 text-blue-700" />
                              </div>
                              <div>
                                <p className="font-medium">Отчет по бронированиям за неделю</p>
                                <p className="text-xs text-gray-500">Сгенерирован: 01.05.2025</p>
                              </div>
                            </div>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Icon name="Download" className="h-4 w-4" />
                            </Button>
                          </div>
                          
                          <div className="p-4 border rounded-lg flex items-center justify-between hover:bg-gray-50 cursor-pointer">
                            <div className="flex items-center">
                              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                                <Icon name="FileSpreadsheet" className="h-4 w-4 text-green-700" />
                              </div>
                              <div>
                                <p className="font-medium">Финансовый отчет за апрель</p>
                                <p className="text-xs text-gray-500">Сгенерирован: 30.04.2025</p>
                              </div>
                            </div>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Icon name="Download" className="h-4 w-4" />
                            </Button>
                          </div>
                          
                          <div className="p-4 border rounded-lg flex items-center justify-between hover:bg-gray-50 cursor-pointer">
                            <div className="flex items-center">
                              <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                                <Icon name="FilePdf" className="h-4 w-4 text-red-700" />
                              </div>
                              <div>
                                <p className="font-medium">Отчет по загруженности мотоциклов</p>
                                <p className="text-xs text-gray-500">Сгенерирован: 28.04.2025</p>
                              </div>
                            </div>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Icon name="Download" className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}
              
              {/* Вкладка аналитики */}
              {activeTab === "analytics" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold">Аналитика</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="border-none shadow-sm">
                      <CardHeader>
                        <CardTitle>Статистика бронирований</CardTitle>
                        <CardDescription>
                          Распределение бронирований по статусам
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-8">
                          {/* График распределения бронирований по статусам */}
                          <div className="space-y-2">
                            {analytics.bookingsByStatus.map((item, index) => (
                              <div key={index} className="space-y-1">
                                <div className="flex justify-between text-sm">
                                  <span>{item.status}</span>
                                  <span className="font-medium">{item.count}</span>
                                </div>
                                <div className="w-full bg-gray-100 rounded-full h-2">
                                  <div 
                                    className={`h-2 rounded-full ${
                                      item.status === "Завершено" 
                                        ? "bg-blue-500" 
                                        : item.status === "Подтверждено" 
                                          ? "bg-green-500" 
                                          : item.status === "Ожидает" 
                                            ? "bg-yellow-500" 
                                            : "bg-red-500"
                                    }`} 
                                    style={{ width: `${(item.count / analytics.bookingsByStatus.reduce((acc, curr) => acc + curr.count, 0)) * 100}%` }}
                                  ></div>
                                </div>
                              </div>
                            ))}
                          </div>
                          
                          {/* Таблица с дополнительной статистикой */}
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-medium mb-3">Дополнительная статистика</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span>Среднее количество дней аренды:</span>
                                <span className="font-medium">3.6 дней</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Средняя стоимость аренды:</span>
                                <span className="font-medium">4,200 ₽/день</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Конверсия бронирований:</span>
                                <span className="font-medium">87%</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Отмены клиентами:</span>
                                <span className="font-medium">8%</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="border-none shadow-sm">
                      <CardHeader>
                        <CardTitle>Популярные мотоциклы</CardTitle>
                        <CardDescription>
                          Мотоциклы с наибольшим количеством аренд
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          {/* Топ-3 популярных мотоциклов */}
                          {analytics.popularMotorcycles.map((motorcycle, index) => (
                            <div key={index} className="flex items-center space-x-4">
                              <div className="bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center text-gray-700 font-medium flex-shrink-0">
                                {index + 1}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-center">
                                  <p className="font-medium truncate">{motorcycle.name}</p>
                                  <Badge>{motorcycle.rentCount} аренд</Badge>
                                </div>
                                <div className="w-full bg-gray-100 rounded-full h-2 mt-2">
                                  <div 
                                    className="bg-primary h-2 rounded-full" 
                                    style={{ width: `${(motorcycle.rentCount / Math.max(...analytics.popularMotorcycles.map(m => m.rentCount))) * 100}%` }}
                                  ></div>
                                </div>
                              </div>
                            </div>
                          ))}
                          
                          {/* Распределение по категориям */}
                          <div className="mt-8">
                            <h4 className="font-medium mb-3">Распределение по категориям</h4>
                            <div className="grid grid-cols-2 gap-2">
                              {categoryOptions.map((category, index) => {
                                const count = motorcyclesList.filter(m => m.category === category).length;
                                return (
                                  <div key={index} className="bg-gray-50 p-3 rounded-lg">
                                    <p className="text-sm font-medium">{category}</p>
                                    <div className="flex justify-between items-center mt-1">
                                      <span className="text-xs text-gray-500">{Math.round((count / totalMotorcycles) * 100)}%</span>
                                      <span className="text-xs font-medium">{count} мотоциклов</span>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="border-none shadow-sm">
                      <CardHeader>
                        <CardTitle>Динамика доходов</CardTitle>
                        <CardDescription>
                          Изменение выручки за последние месяцы
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="h-64 flex">
                          {/* Простая визуализация графика доходов */}
                          <div className="flex-1 flex items-end">
                            {analytics.revenueByMonth.map((item, index) => (
                              <div 
                                key={index} 
                                className="flex flex-col items-center justify-end flex-1"
                              >
                                <div 
                                  className="w-full bg-primary/80 rounded-t-md mx-1"
                                  style={{ 
                                    height: `${(item.revenue / Math.max(...analytics.revenueByMonth.map(m => m.revenue))) * 100}%` 
                                  }}
                                ></div>
                                <div className="text-xs mt-2 text-gray-600 font-medium">
                                  {item.month.substring(0, 3)}
                                </div>
                                <div className="text-xs text-gray-500 hidden sm:block">
                                  {(item.revenue / 1000).toFixed(0)}K ₽
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="mt-6 bg-gray-50 p-4 rounded-lg">
                          <h4 className="font-medium mb-3">Ключевые показатели</h4>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-gray-500">Общая выручка</p>
                              <p className="text-lg font-bold">{analytics.totalRevenue.toLocaleString()} ₽</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Рост за 3 месяца</p>
                              <p className="text-lg font-bold text-green-600">+42%</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Выручка на мотоцикл</p>
                              <p className="text-lg font-bold">{Math.round(analytics.totalRevenue / totalMotorcycles).toLocaleString()} ₽</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Прогноз на месяц</p>
                              <p className="text-lg font-bold">140,000 ₽</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="border-none shadow-sm">
                      <CardHeader>
                        <CardTitle>Активность пользователей</CardTitle>
                        <CardDescription>
                          Рост количества пользователей и их активность
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          {/* График роста пользователей */}
                          <div className="h-40 flex">
                            <div className="flex-1 flex items-end">
                              {analytics.userGrowth.map((item, index) => (
                                <div 
                                  key={index} 
                                  className="flex flex-col items-center justify-end flex-1"
                                >
                                  <div 
                                    className="w-full bg-purple-500/80 rounded-t-md mx-1"
                                    style={{ 
                                      height: `${(item.users / Math.max(...analytics.userGrowth.map(m => m.users))) * 100}%` 
                                    }}
                                  ></div>
                                  <div className="text-xs mt-2 text-gray-600 font-medium">
                                    {item.month.substring(0, 3)}
                                  </div>
                                  <div className="text-xs text-gray-500">
                                    {item.users}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-gray-50 p-3 rounded-lg">
                              <h4 className="text-sm font-medium mb-1">Активные пользователи</h4>
                              <div className="flex justify-between items-baseline">
                                <p className="text-2xl font-bold">{analytics.activeUsers}</p>
                                <Badge className="bg-green-100 text-green-700">
                                  <Icon name="TrendingUp" className="h-3 w-3 mr-1" />
                                  +18%
                                </Badge>
                              </div>
                            </div>
                            
                            <div className="bg-gray-50 p-3 rounded-lg">
                              <h4 className="text-sm font-medium mb-1">Бронирований в месяц</h4>
                              <div className="flex justify-between items-baseline">
                                <p className="text-2xl font-bold">{analytics.bookingsThisMonth}</p>
                                <Badge className="bg-green-100 text-green-700">
                                  <Icon name="TrendingUp" className="h-3 w-3 mr-1" />
                                  +8%
                                </Badge>
                              </div>
                            </div>
                          </div>
                          
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-medium mb-3">Источники трафика</h4>
                            <div className="space-y-2">
                              <div className="flex justify-between items-center">
                                <span className="text-sm">Органический поиск</span>
                                <span className="text-sm font-medium">42%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-1.5">
                                <div className="bg-green-500 h-1.5 rounded-full" style={{ width: "42%" }}></div>
                              </div>
                              
                              <div className="flex justify-between items-center">
                                <span className="text-sm">Прямые переходы</span>
                                <span className="text-sm font-medium">27%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-1.5">
                                <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: "27%" }}></div>
                              </div>
                              
                              <div className="flex justify-between items-center">
                                <span className="text-sm">Социальные сети</span>
                                <span className="text-sm font-medium">18%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-1.5">
                                <div className="bg-purple-500 h-1.5 rounded-full" style={{ width: "18%" }}></div>
                              </div>
                              
                              <div className="flex justify-between items-center">
                                <span className="text-sm">Реклама</span>
                                <span className="text-sm font-medium">13%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-1.5">
                                <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: "13%" }}></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}
              
              {/* Вкладка настроек */}
              {activeTab === "settings" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold">Настройки системы</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2">
                      <Card className="border-none shadow-sm">
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
                              <Input id="contact-email" type="email" defaultValue="info@motoprokat.ru" />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="phone">Телефон</Label>
                              <Input id="phone" defaultValue="+7 (999) 123-45-67" />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="address">Адрес</Label>
                              <Input id="address" defaultValue="г. Москва, ул. Примерная, д. 123" />
                            </div>
                            
                            <Separator />
                            
                            <div className="space-y-2">
                              <Label htmlFor="site-description">Описание сайта (SEO)</Label>
                              <Textarea 
                                id="site-description" 
                                defaultValue="Аренда мотоциклов в Москве по доступным ценам. Большой выбор техники для любых целей."
                                rows={3}
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="meta-keywords">Ключевые слова (SEO)</Label>
                              <Input
                                id="meta-keywords"
                                defaultValue="аренда мотоциклов, прокат мотоциклов, Москва, мотоциклы, прокат байков"
                              />
                              <p className="text-xs text-gray-500">Разделяйте ключевые слова запятыми</p>
                            </div>
                            
                            <Separator />
                            
                            <div className="flex items-center justify-between">
                              <div className="space-y-0.5">
                                <Label htmlFor="maintenance-mode">Режим обслуживания</Label>
                                <p className="text-sm text-gray-500">Временно закрыть сайт для пользователей</p>
                              </div>
                              <Switch id="maintenance-mode" />
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <div className="space-y-0.5">
                                <Label htmlFor="bookings-enabled">Бронирования</Label>
                                <p className="text-sm text-gray-500">Разрешить пользователям бронировать мотоциклы</p>
                              </div>
                              <Switch id="bookings-enabled" defaultChecked />
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <div className="space-y-0.5">
                                <Label htmlFor="reviews-moderation">Модерация отзывов</Label>
                                <p className="text-sm text-gray-500">Требовать одобрения администратора для отзывов</p>
                              </div>
                              <Switch id="reviews-moderation" defaultChecked />
                            </div>
                            
                            <Button type="button">
                              <Icon name="Save" className="mr-2 h-4 w-4" />
                              Сохранить настройки
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className="border-none shadow-sm mt-6">
                        <CardHeader>
                          <CardTitle>Настройки бронирования</CardTitle>
                          <CardDescription>
                            Управление параметрами бронирования мотоциклов
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="min-rental-period">Минимальный период аренды (дней)</Label>
                                <Input id="min-rental-period" type="number" defaultValue="1" min="1" />
                              </div>
                              
                              <div className="space-y-2">
                                <Label htmlFor="max-rental-period">Максимальный период аренды (дней)</Label>
                                <Input id="max-rental-period" type="number" defaultValue="30" min="1" />
                              </div>
                              
                              <div className="space-y-2">
                                <Label htmlFor="advance-booking-days">Предварительное бронирование (дней)</Label>
                                <Input id="advance-booking-days" type="number" defaultValue="60" min="1" />
                                <p className="text-xs text-gray-500">За сколько дней вперед можно бронировать</p>
                              </div>
                              
                              <div className="space-y-2">
                                <Label htmlFor="cancellation-period">Период отмены бронирования (часов)</Label>
                                <Input id="cancellation-period" type="number" defaultValue="24" min="1" />
                                <p className="text-xs text-gray-500">За сколько часов до начала можно отменить</p>
                              </div>
                            </div>
                            
                            <Separator />
                            
                            <div className="space-y-2">
                              <Label htmlFor="deposit-amount">Размер залога (% от стоимости)</Label>
                              <Input id="deposit-amount" type="number" defaultValue="20" min="0" max="100" />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="discount-long-term">Скидка при длительной аренде (%)</Label>
                              <div className="grid grid-cols-3 gap-4">
                                <div className="space-y-1">
                                  <Label htmlFor="discount-3-days" className="text-xs">От 3 дней</Label>
                                  <Input id="discount-3-days" type="number" defaultValue="5" min="0" max="100" />
                                </div>
                                <div className="space-y-1">
                                  <Label htmlFor="discount-7-days" className="text-xs">От 7 дней</Label>
                                  <Input id="discount-7-days" type="number" defaultValue="10" min="0" max="100" />
                                </div>
                                <div className="space-y-1">
                                  <Label htmlFor="discount-14-days" className="text-xs">От 14 дней</Label>
                                  <Input id="discount-14-days" type="number" defaultValue="15" min="0" max="100" />
                                </div>
                              </div>
                            </div>
                            
                            <Button type="button">
                              <Icon name="Save" className="mr-2 h-4 w-4" />
                              Сохранить настройки
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div className="space-y-6">
                      <Card className="border-none shadow-sm">
                        <CardHeader>
                          <CardTitle>Внешний вид</CardTitle>
                          <CardDescription>
                            Настройки темы оформления
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-6">
                            <div className="space-y-2">
                              <Label htmlFor="theme">Тема оформления</Label>
                              <Select defaultValue="light">
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
                            
                            <div className="space-y-2">
                              <Label htmlFor="primary-color">Основной цвет</Label>
                              <div className="grid grid-cols-5 gap-2">
                                {["#9b87f5", "#10b981", "#3b82f6", "#f43f5e", "#f97316"].map((color) => (
                                  <div 
                                    key={color}
                                    className={`w-full aspect-square rounded-md cursor-pointer border-2 ${
                                      color === "#9b87f5" ? "border-black" : "border-transparent"
                                    }`}
                                    style={{ backgroundColor: color }}
                                  />
                                ))}
                              </div>
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="font">Шрифт</Label>
                              <Select defaultValue="inter">
                                <SelectTrigger id="font">
                                  <SelectValue placeholder="Выберите шрифт" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="inter">Inter</SelectItem>
                                  <SelectItem value="roboto">Roboto</SelectItem>
                                  <SelectItem value="open-sans">Open Sans</SelectItem>
                                  <SelectItem value="montserrat">Montserrat</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            
                            <Button type="button">Применить</Button>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className="border-none shadow-sm">
                        <CardHeader>
                          <CardTitle>Уведомления</CardTitle>
                          <CardDescription>
                            Настройки уведомлений системы
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div className="space-y-0.5">
                                <Label>Email-уведомления</Label>
                                <p className="text-xs text-gray-500">Отправка email о новых бронированиях</p>
                              </div>
                              <Switch defaultChecked />
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <div className="space-y-0.5">
                                <Label>SMS-уведомления</Label>
                                <p className="text-xs text-gray-500">Отправка SMS о статусе бронирования</p>
                              </div>
                              <Switch />
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <div className="space-y-0.5">
                                <Label>Уведомления в браузере</Label>
                                <p className="text-xs text-gray-500">Всплывающие уведомления в админ-панели</p>
                              </div>
                              <Switch defaultChecked />
                            </div>
                            
                            <Separator />
                            
                            <div className="space-y-2">
                              <Label htmlFor="admin-email">Email для уведомлений</Label>
                              <Input id="admin-email" type="email" defaultValue="admin@motoprokat.ru" />
                            </div>
                            
                            <Button type="button" size="sm">Сохранить настройки</Button>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className="border-none shadow-sm">
                        <CardHeader>
                          <CardTitle>Версия системы</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-gray-500">Текущая версия: <span className="font-medium">1.2.3</span></p>
                          <p className="text-xs text-gray-400 mt-1">Последнее обновление: 25 апреля 2025</p>
                          
                          <div className="mt-4 space-y-2">
                            <p className="text-xs text-gray-500">История обновлений:</p>
                            <ul className="text-xs text-gray-500 space-y-1 pl-5 list-disc">
                              <li>1.2.3 - Исправлены ошибки в системе бронирования</li>
                              <li>1.2.2 - Добавлена аналитика и отчеты</li>
                              <li>1.2.1 - Улучшен пользовательский интерфейс</li>
                            </ul>
                          </div>
                          
                          <Button variant="outline" size="sm" className="mt-4 w-full">
                            <Icon name="RefreshCw" className="mr-2 h-4 w-4" />
                            Проверить обновления
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      {/* Диалог редактирования мотоцикла */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>
              {currentMotorcycle?.id === Math.max(...motorcyclesList.map(m => m.id)) + 1 
                ? "Добавить новый мотоцикл" 
                : "Редактировать мотоцикл"}
            </DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-6 py-4">
            <Tabs defaultValue="basic">
              <TabsList className="mb-4">
                <TabsTrigger value="basic">Основная информация</TabsTrigger>
                <TabsTrigger value="details">Детали</TabsTrigger>
                <TabsTrigger value="features">Характеристики</TabsTrigger>
              </TabsList>
              
              <TabsContent value="basic" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Название мотоцикла <span className="text-red-500">*</span></Label>
                      <Input
                        id="name"
                        value={formData.name || ""}
                        onChange={(e) => updateFormField("name", e.target.value)}
                        placeholder="Harley-Davidson Fat Boy"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="price">Цена в день (₽) <span className="text-red-500">*</span></Label>
                      <Input
                        id="price"
                        type="number"
                        value={formData.price || ""}
                        onChange={(e) => updateFormField("price", Number(e.target.value))}
                        placeholder="5000"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="category">Категория</Label>
                      <Select
                        value={formData.category || ""}
                        onValueChange={(value) => updateFormField("category", value)}
                      >
                        <SelectTrigger id="category">
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
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="power">Мощность</Label>
                        <Input
                          id="power"
                          value={formData.power || ""}
                          onChange={(e) => updateFormField("power", e.target.value)}
                          placeholder="150 л.с."
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="year">Год выпуска</Label>
                        <Input
                          id="year"
                          type="number"
                          value={formData.year || ""}
                          onChange={(e) => updateFormField("year", Number(e.target.value))}
                          placeholder={new Date().getFullYear().toString()}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="availability">Доступность</Label>
                        <Switch 
                          id="availability" 
                          checked={formData.availability} 
                          onCheckedChange={(checked) => updateFormField("availability", checked)}
                        />
                      </div>
                      <p className="text-xs text-gray-500">
                        Установите переключатель в положение "включено", если мотоцикл доступен для аренды
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="image">URL изображения</Label>
                      <Input
                        id="image"
                        value={formData.image || ""}
                        onChange={(e) => updateFormField("image", e.target.value)}
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="description">Описание</Label>
                      <Textarea
                        id="description"
                        value={formData.description || ""}
                        onChange={(e) => updateFormField("description", e.target.value)}
                        placeholder="Описание мотоцикла..."
                        rows={4}
                      />
                    </div>
                    
                    <div className="bg-gray-50 rounded-md p-3 border">
                      <p className="text-sm font-medium mb-2">Предпросмотр изображения</p>
                      {imagePreview ? (
                        <div className="aspect-video rounded-md overflow-hidden bg-gray-100">
                          <img 
                            src={imagePreview} 
                            alt="Предпросмотр" 
                            className="w-full h-full object-cover"
                            onError={() => setImagePreview("")}
                          />
                        </div>
                      ) : (
                        <div className="aspect-video rounded-md bg-gray-200 flex items-center justify-center">
                          <Icon name="Image" className="h-8 w-8 text-gray-400" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="details" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="color">Цвет</Label>
                      <Input
                        id="color"
                        value={formData.color || ""}
                        onChange={(e) => updateFormField("color", e.target.value)}
                        placeholder="Черный"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="engine">Двигатель</Label>
                      <Input
                        id="engine"
                        value={formData.engine || ""}
                        onChange={(e) => updateFormField("engine", e.target.value)}
                        placeholder="4-цилиндровый, 1000 куб. см"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="weight">Вес</Label>
                      <Input
                        id="weight"
                        value={formData.weight || ""}
                        onChange={(e) => updateFormField("weight", e.target.value)}
                        placeholder="210 кг"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="fuelCapacity">Емкость бака</Label>
                      <Input
                        id="fuelCapacity"
                        value={formData.fuelCapacity || ""}
                        onChange={(e) => updateFormField("fuelCapacity", e.target.value)}
                        placeholder="16 л"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="maxSpeed">Максимальная скорость</Label>
                      <Input
                        id="maxSpeed"
                        value={formData.maxSpeed || ""}
                        onChange={(e) => updateFormField("maxSpeed", e.target.value)}
                        placeholder="250 км/ч"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="discount">Скидка (%)</Label>
                      <Input
                        id="discount"
                        type="number"
                        value={formData.discount || "0"}
                        onChange={(e) => updateFormField("discount", Number(e.target.value))}
                        placeholder="0"
                        min="0"
                        max="100"
                      />
                      <p className="text-xs text-gray-500">
                        Установите скидку на аренду мотоцикла (в процентах)
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="features" className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-md">
                  <h3 className="text-sm font-medium mb-3">Особенности мотоцикла</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {["ABS", "Круиз-контроль", "LED-фары", "USB-порт", "Подогрев ручек", "Bluetooth", "Навигация", "Защита двигателя"].map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`feature-${index}`} 
                          checked={(formData.features || []).includes(feature)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              updateFormField("features", [...(formData.features || []), feature]);
                            } else {
                              updateFormField(
                                "features", 
                                (formData.features || []).filter(f => f !== feature)
                              );
                            }
                          }}
                        />
                        <label
                          htmlFor={`feature-${index}`}
                          className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {feature}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="rentCount">Количество аренд</Label>
                  <Input
                    id="rentCount"
                    type="number"
                    value={formData.rentCount || "0"}
                    onChange={(e) => updateFormField("rentCount", Number(e.target.value))}
                    placeholder="0"
                    min="0"
                  />
                  <p className="text-xs text-gray-500">
                    Статистический показатель для отслеживания популярности мотоцикла
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="lastRented">Дата последней аренды</Label>
                  <Input
                    id="lastRented"
                    type="date"
                    value={formData.lastRented || ""}
                    onChange={(e) => updateFormField("lastRented", e.target.value)}
                  />
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Отмена</Button>
            <Button onClick={confirmEdit}>
              {currentMotorcycle?.id === Math.max(...motorcyclesList.map(m => m.id)) + 1 
                ? "Добавить мотоцикл" 
                : "Сохранить изменения"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Диалог удаления мотоцикла */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle className="text-red-600">Удалить мотоцикл</DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            <div className="flex items-center space-x-4 mb-4">
              <div className="h-16 w-16 rounded-md overflow-hidden bg-gray-100">
                <img 
                  src={currentMotorcycle?.image} 
                  alt={currentMotorcycle?.name} 
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-medium">{currentMotorcycle?.name}</h4>
                <p className="text-sm text-gray-500">{currentMotorcycle?.category}, {currentMotorcycle?.year} г.</p>
              </div>
            </div>
            
            <Alert variant="destructive" className="mb-4">
              <Icon name="AlertTriangle" className="h-4 w-4" />
              <AlertTitle>Внимание!</AlertTitle>
              <AlertDescription>
                Это действие нельзя будет отменить. Мотоцикл будет удален из каталога.
              </AlertDescription>
            </Alert>
            
            <p className="text-sm text-gray-600">
              Вы уверены, что хотите удалить мотоцикл "{currentMotorcycle?.name}"?
            </p>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Отмена</Button>
            <Button variant="destructive" onClick={confirmDelete}>
              <Icon name="Trash2" className="mr-2 h-4 w-4" />
              Удалить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Диалог просмотра бронирования */}
      <Dialog open={isViewBookingDialogOpen} onOpenChange={setIsViewBookingDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Информация о бронировании №{currentBooking?.id}</DialogTitle>
          </DialogHeader>
          
          {currentBooking && (
            <div className="py-4">
              <div className="bg-gray-50 rounded-md p-4 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">Статус бронирования</h3>
                  {currentBooking.status === "pending" && (
                    <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                      Ожидает подтверждения
                    </Badge>
                  )}
                  {currentBooking.status === "confirmed" && (
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      Подтверждено
                    </Badge>
                  )}
                  {currentBooking.status === "completed" && (
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      Завершено
                    </Badge>
                  )}
                  {currentBooking.status === "cancelled" && (
                    <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                      Отменено
                    </Badge>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Создано:</span>
                    <span className="ml-1">{formatDate(currentBooking.createdAt)}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Номер бронирования:</span>
                    <span className="ml-1 font-medium">B-{currentBooking.id.toString().padStart(5, '0')}</span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="font-medium mb-3">Информация о клиенте</h3>
                  <div className="bg-white rounded-md border p-4 space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                        <Icon name="User" className="h-5 w-5 text-gray-500" />
                      </div>
                      <div>
                        <p className="font-medium">{currentBooking.customerName}</p>
                        <p className="text-sm text-gray-500">Клиент #C-{1000 + currentBooking.id}</p>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center">
                        <Icon name="Mail" className="h-4 w-4 mr-2 text-gray-400" />
                        <span>{currentBooking.email}</span>
                      </li>
                      <li className="flex items-center">
                        <Icon name="Phone" className="h-4 w-4 mr-2 text-gray-400" />
                        <span>{currentBooking.phone}</span>
                      </li>
                      <li className="flex items-center">
                        <Icon name="Calendar" className="h-4 w-4 mr-2 text-gray-400" />
                        <span>Клиент с {new Date(currentBooking.createdAt).toLocaleDateString('ru-RU')}</span>
                      </li>
                    </ul>
                    
                    <Button variant="outline" size="sm" className="w-full">
                      <Icon name="UserSearch" className="mr-2 h-4 w-4" />
                      Просмотреть профиль
                    </Button>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-3">Детали аренды</h3>
                  <div className="bg-white rounded-md border p-4 space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-10 h-10 rounded-md bg-gray-100 flex items-center justify-center flex-shrink-0 overflow-hidden">
                        <img 
                          src={motorcyclesList.find(m => m.id === currentBooking.motorcycleId)?.image || ""}
                          alt={currentBooking.motorcycleName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium">{currentBooking.motorcycleName}</p>
                        <p className="text-sm text-gray-500">ID: {currentBooking.motorcycleId}</p>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="text-gray-500">Дата начала:</p>
                        <p className="font-medium">{formatDate(currentBooking.startDate)}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Дата окончания:</p>
                        <p className="font-medium">{formatDate(currentBooking.endDate)}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Всего дней:</p>
                        <p className="font-medium">{currentBooking.rentalDays}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Статус оплаты:</p>
                        <p className="font-medium">
                          {currentBooking.paymentStatus === "paid" 
                            ? "Оплачено" 
                            : currentBooking.paymentStatus === "pending" 
                              ? "Ожидает оплаты" 
                              : "Возвращено"}
                        </p>
                      </div>
                    </div>
                    
                    <Button variant="outline" size="sm" className="w-full">
                      <Icon name="Bike" className="mr-2 h-4 w-4" />
                      Перейти к мотоциклу
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="font-medium mb-3">Оплата и финансы</h3>
                  <div className="bg-white rounded-md border p-4 space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Стоимость за день:</span>
                      <span className="text-sm font-medium">{(currentBooking.totalPrice / currentBooking.rentalDays!).toLocaleString()} ₽</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Количество дней:</span>
                      <span className="text-sm font-medium">{currentBooking.rentalDays}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Способ оплаты:</span>
                      <span className="text-sm font-medium">{currentBooking.paymentMethod}</span>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex justify-between font-medium">
                      <span>Итого к оплате:</span>
                      <span>{currentBooking.totalPrice.toLocaleString()} ₽</span>
                    </div>
                    
                    <div className="pt-2">
                      <Badge
                        className={`${
                          currentBooking.paymentStatus === "paid" 
                            ? "bg-green-100 text-green-700 border-green-200" 
                            : currentBooking.paymentStatus === "pending" 
                              ? "bg-yellow-100 text-yellow-700 border-yellow-200" 
                              : "bg-blue-100 text-blue-700 border-blue-200"
                        }`}
                      >
                        {currentBooking.paymentStatus === "paid" 
                          ? "Оплачено полностью" 
                          : currentBooking.paymentStatus === "pending" 
                            ? "Ожидает оплаты" 
                            : "Возвращено"}
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-3">Комментарии и дополнительно</h3>
                  <div className="bg-white rounded-md border p-4 h-[calc(100%-22px)] flex flex-col">
                    <div className="flex-grow">
                      {currentBooking.comment ? (
                        <p className="text-sm">{currentBooking.comment}</p>
                      ) : (
                        <p className="text-sm text-gray-500 italic">Комментариев нет</p>
                      )}
                    </div>
                    
                    <Separator className="my-3" />
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Дополнительные документы:</span>
                      <span>
                        {currentBooking.documents && currentBooking.documents.length > 0 
                          ? currentBooking.documents.length 
                          : "Нет"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-md mb-6">
                <h3 className="font-medium mb-3">История статусов</h3>
                <div className="relative pl-6 space-y-3">
                  <div className="absolute top-0 bottom-0 left-2.5 w-px bg-gray-200"></div>
                  
                  <div className="relative">
                    <div className="absolute left-[-24px] rounded-full bg-blue-100 p-1">
                      <Icon name="CheckCircle" className="h-4 w-4 text-blue-500" />
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Создано</span>
                      <span className="text-gray-500 ml-2">{formatDate(currentBooking.createdAt)} в 10:15</span>
                    </div>
                  </div>
                  
                  {currentBooking.status !== "pending" && (
                    <div className="relative">
                      <div className="absolute left-[-24px] rounded-full bg-green-100 p-1">
                        <Icon name="Check" className="h-4 w-4 text-green-500" />
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">Подтверждено</span>
                        <span className="text-gray-500 ml-2">{formatDate(currentBooking.startDate)} в 12:30</span>
                      </div>
                    </div>
                  )}
                  
                  {currentBooking.status === "completed" && (
                    <div className="relative">
                      <div className="absolute left-[-24px] rounded-full bg-blue-100 p-1">
                        <Icon name="CheckCheck" className="h-4 w-4 text-blue-500" />
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">Завершено</span>
                        <span className="text-gray-500 ml-2">{formatDate(currentBooking.endDate)} в 18:45</span>
                      </div>
                    </div>
                  )}
                  
                  {currentBooking.status === "cancelled" && (
                    <div className="relative">
                      <div className="absolute left-[-24px] rounded-full bg-red-100 p-1">
                        <Icon name="X" className="h-4 w-4 text-red-500" />
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">Отменено</span>
                        <span className="text-gray-500 ml-2">{formatDate(currentBooking.createdAt)} в 15:20</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {currentBooking.status === "pending" && (
                <div className="flex space-x-2">
                  <Button 
                    className="flex-1"
                    onClick={() => updateBookingStatus(currentBooking.id, "confirmed")}
                  >
                    <Icon name="Check" className="mr-2 h-4 w-4" />
                    Подтвердить
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => updateBookingStatus(currentBooking.id, "cancelled")}
                  >
                    <Icon name="X" className="mr-2 h-4 w-4" />
                    Отменить
                  </Button>
                </div>
              )}
              
              {currentBooking.status === "confirmed" && (
                <div className="flex space-x-2">
                  <Button 
                    className="flex-1"
                    onClick={() => updateBookingStatus(currentBooking.id, "completed")}
                  >
                    <Icon name="CheckCheck" className="mr-2 h-4 w-4" />
                    Завершить
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => updateBookingStatus(currentBooking.id, "cancelled")}
                  >
                    <Icon name="X" className="mr-2 h-4 w-4" />
                    Отменить
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Диалог просмотра пользователя */}
      <Dialog open={isViewUserDialogOpen} onOpenChange={setIsViewUserDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Информация о пользователе</DialogTitle>
          </DialogHeader>
          
          {currentUser && (
            <div className="py-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
                <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                  {currentUser.avatar ? (
                    <img 
                      src={currentUser.avatar} 
                      alt={currentUser.name} 
                      className="w-full h-full object-cover" 
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary text-xl font-medium">
                      {currentUser.name.charAt(0)}
                    </div>
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center">
                    <h3 className="text-xl font-bold">{currentUser.name}</h3>
                    {currentUser.verified && (
                      <Badge className="ml-2 bg-blue-100 text-blue-700">Verified</Badge>
                    )}
                  </div>
                  <p className="text-gray-500">
                    {currentUser.role === "admin" 
                      ? "Администратор" 
                      : currentUser.role === "manager" 
                        ? "Менеджер" 
                        : "Пользователь"}
                  </p>
                  <div className="flex items-center mt-1">
                    <Badge
                      className={`${
                        currentUser.status === "active" 
                          ? "bg-green-100 text-green-700" 
                          : currentUser.status === "blocked" 
                            ? "bg-red-100 text-red-700" 
                            : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {currentUser.status === "active" 
                        ? "Активен" 
                        : currentUser.status === "blocked" 
                          ? "Заблокирован" 
                          : "Ожидает активации"}
                    </Badge>
                    <span className="text-sm text-gray-500 ml-2">ID: {currentUser.id}</span>
                  </div>
                </div>
                
                <div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Icon name="Settings" className="mr-2 h-4 w-4" />
                        Действия
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Icon name="Mail" className="mr-2 h-4 w-4" />
                        <span>Отправить сообщение</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Icon name="FileText" className="mr-2 h-4 w-4" />
                        <span>История бронирований</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      {currentUser.status === "active" && (
                        <DropdownMenuItem onClick={() => updateUserStatus(currentUser.id, "blocked")}>
                          <Icon name="Ban" className="mr-2 h-4 w-4 text-red-500" />
                          <span>Заблокировать</span>
                        </DropdownMenuItem>
                      )}
                      {currentUser.status === "blocked" && (
                        <DropdownMenuItem onClick={() => updateUserStatus(currentUser.id, "active")}>
                          <Icon name="Unlock" className="mr-2 h-4 w-4 text-green-500" />
                          <span>Разблокировать</span>
                        </DropdownMenuItem>
                      )}
                      {currentUser.status === "pending" && (
                        <DropdownMenuItem onClick={() => updateUserStatus(currentUser.id, "active")}>
                          <Icon name="CheckCircle" className="mr-2 h-4 w-4 text-green-500" />
                          <span>Активировать</span>
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              
              <Tabs defaultValue="info">
                <TabsList className="w-full">
                  <TabsTrigger value="info" className="flex-1">Информация</TabsTrigger>
                  <TabsTrigger value="bookings" className="flex-1">Бронирования</TabsTrigger>
                  <TabsTrigger value="activity" className="flex-1">Активность</TabsTrigger>
                </TabsList>
                
                <TabsContent value="info" className="pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="bg-gray-50 p-4 rounded-md">
                        <h4 className="font-medium mb-3">Контактная информация</h4>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start">
                            <Icon name="Mail" className="h-4 w-4 mr-2 text-gray-400 mt-0.5" />
                            <div>
                              <p className="text-gray-500">Email</p>
                              <p className="font-medium">{currentUser.email}</p>
                            </div>
                          </li>
                          <li className="flex items-start">
                            <Icon name="Phone" className="h-4 w-4 mr-2 text-gray-400 mt-0.5" />
                            <div>
                              <p className="text-gray-500">Телефон</p>
                              <p className="font-medium">{currentUser.phone}</p>
                            </div>
                          </li>
                          <li className="flex items-start">
                            <Icon name="MapPin" className="h-4 w-4 mr-2 text-gray-400 mt-0.5" />
                            <div>
                              <p className="text-gray-500">Адрес</p>
                              <p className="font-medium">{currentUser.address || "Не указан"}</p>
                            </div>
                          </li>
                        </ul>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-md">
                        <h4 className="font-medium mb-3">Личные данные</h4>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start">
                            <Icon name="CreditCard" className="h-4 w-4 mr-2 text-gray-400 mt-0.5" />
                            <div>
                              <p className="text-gray-500">Номер водительского удостоверения</p>
                              <p className="font-medium">{currentUser.licenseNumber || "Не указан"}</p>
                            </div>
                          </li>
                          <li className="flex items-start">
                            <Icon name="Calendar" className="h-4 w-4 mr-2 text-gray-400 mt-0.5" />
                            <div>
                              <p className="text-gray-500">Дата рождения</p>
                              <p className="font-medium">{currentUser.birthDate || "Не указана"}</p>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="bg-gray-50 p-4 rounded-md">
                        <h4 className="font-medium mb-3">Статистика</h4>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-white p-3 rounded-md">
                            <p className="text-sm text-gray-500">Дата регистрации</p>
                            <p className="font-medium">{formatDate(currentUser.registeredAt)}</p>
                          </div>
                          <div className="bg-white p-3 rounded-md">
                            <p className="text-sm text-gray-500">Последний вход</p>
                            <p className="font-medium">{currentUser.lastLogin ? formatDate(currentUser.lastLogin) : "Не было"}</p>
                          </div>
                          <div className="bg-white p-3 rounded-md">
                            <p className="text-sm text-gray-500">Количество бронирований</p>
                            <p className="font-medium">{currentUser.bookingsCount}</p>
                          </div>
                          <div className="bg-white p-3 rounded-md">
                            <p className="text-sm text-gray-500">Избранных мотоциклов</p>
                            <p className="font-medium">{currentUser.favoriteMotorcycles?.length || 0}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-md">
                        <h4 className="font-medium mb-3">Избранные мотоциклы</h4>
                        {currentUser.favoriteMotorcycles && currentUser.favoriteMotorcycles.length > 0 ? (
                          <div className="space-y-2">
                            {currentUser.favoriteMotorcycles.map((id) => {
                              const motorcycle = motorcyclesList.find(m => m.id === id);
                              return motorcycle ? (
                                <div key={id} className="flex items-center gap-3 bg-white p-2 rounded-md">
                                  <div className="w-10 h-10 rounded bg-gray-100 overflow-hidden flex-shrink-0">
                                    <img 
                                      src={motorcycle.image} 
                                      alt={motorcycle.name} 
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                  <div className="min-w-0">
                                    <p className="font-medium text-sm truncate">{motorcycle.name}</p>
                                    <p className="text-xs text-gray-500">{motorcycle.category}</p>
                                  </div>
                                </div>
                              ) : null;
                            })}
                          </div>
                        ) : (
                          <p className="text-sm text-gray-500 italic">Нет избранных мотоциклов</p>
                        )}
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="bookings" className="pt-4">
                  {currentUser.bookingsCount > 0 ? (
                    <div className="bg-white border rounded-md overflow-hidden">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>№</TableHead>
                            <TableHead>Мотоцикл</TableHead>
                            <TableHead>Даты</TableHead>
                            <TableHead className="text-right">Сумма</TableHead>
                            <TableHead>Статус</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {bookings
                            .filter(b => b.customerName === currentUser.name)
                            .map((booking) => (
                              <TableRow key={booking.id}>
                                <TableCell className="font-medium">{booking.id}</TableCell>
                                <TableCell>{booking.motorcycleName}</TableCell>
                                <TableCell>
                                  <div className="text-xs">
                                    <div>{formatDate(booking.startDate)}</div>
                                    <div>{formatDate(booking.endDate)}</div>
                                  </div>
                                </TableCell>
                                <TableCell className="text-right">{booking.totalPrice.toLocaleString()} ₽</TableCell>
                                <TableCell>
                                  {booking.status === "pending" && (
                                    <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                                      Ожидает
                                    </Badge>
                                  )}
                                  {booking.status === "confirmed" && (
                                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                      Подтверждено
                                    </Badge>
                                  )}
                                  {booking.status === "completed" && (
                                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                      Завершено
                                    </Badge>
                                  )}
                                  {booking.status === "cancelled" && (
                                    <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                                      Отменено
                                    </Badge>
                                  )}
                                </TableCell>
                              </TableRow>
                            ))
                          }
                        </TableBody>
                      </Table>
                    </div>
                  ) : (
                    <div className="bg-gray-50 p-8 rounded-md text-center">
                      <Icon name="Calendar" className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                      <h4 className="font-medium mb-1">Нет бронирований</h4>
                      <p className="text-sm text-gray-500">Пользователь еще не совершал бронирований</p>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="activity" className="pt-4">
                  <div className="bg-white border rounded-md p-4">
                    <h4 className="font-medium mb-3">История активности</h4>
                    <div className="relative pl-6 space-y-4">
                      <div className="absolute top-0 bottom-0 left-2.5 w-px bg-gray-200"></div>
                      
                      <div className="relative">
                        <div className="absolute left-[-24px] rounded-full bg-blue-100 p-1">
                          <Icon name="LogIn" className="h-4 w-4 text-blue-500" />
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">Последний вход в систему</span>
                          <span className="text-gray-500 ml-2">{currentUser.lastLogin ? formatDate(currentUser.lastLogin) : "Не было"}</span>
                        </div>
                      </div>
                      
                      {currentUser.bookingsCount > 0 && (
                        <div className="relative">
                          <div className="absolute left-[-24px] rounded-full bg-green-100 p-1">
                            <Icon name="CalendarCheck" className="h-4 w-4 text-green-500" />
                          </div>
                          <div className="text-sm">
                            <span className="font-medium">Последнее бронирование</span>
                            <span className="text-gray-500 ml-2">{bookings
                              .filter(b => b.customerName === currentUser.name)
                              .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0]?.createdAt 
                                ? formatDate(bookings
                                  .filter(b => b.customerName === currentUser.name)
                                  .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0].createdAt)
                                : "Не было"}
                            </span>
                          </div>
                        </div>
                      )}
                      
                      <div className="relative">
                        <div className="absolute left-[-24px] rounded-full bg-purple-100 p-1">
                          <Icon name="UserPlus" className="h-4 w-4 text-purple-500" />
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">Регистрация в системе</span>
                          <span className="text-gray-500 ml-2">{formatDate(currentUser.registeredAt)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}
          
          <DialogFooter>
            <div className="flex justify-between w-full">
              <Button
                variant={currentUser?.status === "blocked" ? "default" : "destructive"}
                size="sm"
                onClick={() => {
                  if (currentUser) {
                    updateUserStatus(
                      currentUser.id, 
                      currentUser.status === "blocked" ? "active" : "blocked"
                    );
                  }
                }}
              >
                {currentUser?.status === "blocked" ? (
                  <>
                    <Icon name="Unlock" className="mr-2 h-4 w-4" />
                    Разблокировать
                  </>
                ) : (
                  <>
                    <Icon name="Ban" className="mr-2 h-4 w-4" />
                    Заблокировать
                  </>
                )}
              </Button>
              
              <Button variant="outline" onClick={() => setIsViewUserDialogOpen(false)}>
                Закрыть
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Диалог для создания отчета */}
      <Dialog open={isCreateReportDialogOpen} onOpenChange={setIsCreateReportDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Создание отчета</DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="report-title">Название отчета <span className="text-red-500">*</span></Label>
              <Input
                id="report-title"
                value={reportFormData.title || ""}
                onChange={(e) => updateReportField("title", e.target.value)}
                placeholder="Отчет по бронированиям"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="report-description">Описание</Label>
              <Textarea
                id="report-description"
                value={reportFormData.description || ""}
                onChange={(e) => updateReportField("description", e.target.value)}
                placeholder="Описание отчета..."
                rows={3}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="report-type">Периодичность</Label>
                <Select
                  value={reportFormData.type || "weekly"}
                  onValueChange={(value: "daily" | "weekly" | "monthly" | "custom") => updateReportField("type", value)}
                >
                  <SelectTrigger id="report-type">
                    <SelectValue placeholder="Выберите периодичность" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Ежедневно</SelectItem>
                    <SelectItem value="weekly">Еженедельно</SelectItem>
                    <SelectItem value="monthly">Ежемесячно</SelectItem>
                    <SelectItem value="custom">Пользовательский</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="report-format">Формат</Label>
                <Select
                  value={reportFormData.format || "pdf"}
                  onValueChange={(value: "pdf" | "excel" | "csv") => updateReportField("format", value)}
                >
                  <SelectTrigger id="report-format">
                    <SelectValue placeholder="Выберите формат" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="excel">Excel</SelectItem>
                    <SelectItem value="csv">CSV</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="report-email">Email для отправки</Label>
              <Input
                id="report-email"
                type="email"
                value={(reportFormData.recipients || [])[0] || ""}
                onChange={(e) => updateReportField("recipients", [e.target.value])}
                placeholder="admin@example.com"
              />
              <p className="text-xs text-gray-500">
                Отчет будет автоматически отправляться на указанный email
              </p>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="report-active"
                checked={reportFormData.status === "active"}
                onCheckedChange={(checked) => updateReportField("status", checked ? "active" : "paused")}
              />
              <label
                htmlFor="report-active"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Активировать отчет
              </label>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateReportDialogOpen(false)}>Отмена</Button>
            <Button onClick={confirmCreateReport}>Создать отчет</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Диалог для экспорта данных */}
      <Dialog open={isExportDialogOpen} onOpenChange={setIsExportDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Экспорт данных</DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="export-section">Раздел для экспорта</Label>
              <Select
                value={exportOptions.section || "motorcycles"}
                onValueChange={(value: "motorcycles" | "bookings" | "users" | "analytics") => 
                  setExportOptions({...exportOptions, section: value})
                }
              >
                <SelectTrigger id="export-section">
                  <SelectValue placeholder="Выберите раздел" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="motorcycles">Мотоциклы</SelectItem>
                  <SelectItem value="bookings">Бронирования</SelectItem>
                  <SelectItem value="users">Пользователи</SelectItem>
                  <SelectItem value="analytics">Аналитика</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="export-format">Формат экспорта</Label>
              <div className="grid grid-cols-4 gap-2">
                <Button 
                  variant={exportOptions.type === "excel" ? "default" : "outline"}
                  size="sm"
                  className="flex flex-col items-center justify-center h-20 p-2"
                  onClick={() => setExportOptions({...exportOptions, type: "excel"})}
                >
                  <Icon name="FileSpreadsheet" className="h-6 w-6 mb-1" />
                  <span className="text-xs">Excel</span>
                </Button>
                <Button 
                  variant={exportOptions.type === "csv" ? "default" : "outline"}
                  size="sm"
                  className="flex flex-col items-center justify-center h-20 p-2"
                  onClick={() => setExportOptions({...exportOptions, type: "csv"})}
                >
                  <Icon name="FileText" className="h-6 w-6 mb-1" />
                  <span className="text-xs">CSV</span>
                </Button>
                <Button 
                  variant={exportOptions.type === "pdf" ? "default" : "outline"}
                  size="sm"
                  className="flex flex-col items-center justify-center h-20 p-2"
                  onClick={() => setExportOptions({...exportOptions, type: "pdf"})}
                >
                  <Icon name="FilePdf" className="h-6 w-6 mb-1" />
                  <span className="text-xs">PDF</span>
                </Button>
                <Button 
                  variant={exportOptions.type === "json" ? "default" : "outline"}
                  size="sm"
                  className="flex flex-col items-center justify-center h-20 p-2"
                  onClick={() => setExportOptions({...exportOptions, type: "json"})}
                >
                  <Icon name="FileJson" className="h-6 w-6 mb-1" />
                  <span className="text-xs">JSON</span>
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Параметры фильтрации</Label>
              <div className="bg-gray-50 p-3 rounded-md">
                {exportOptions.section === "motorcycles" && (
                  <div className="grid grid-cols-2 gap-2">
                    <Select defaultValue="all">
                      <SelectTrigger id="export-filter-category">
                        <SelectValue placeholder="Категория" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Все категории</SelectItem>
                        {categoryOptions.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select defaultValue="all">
                      <SelectTrigger id="export-filter-availability">
                        <SelectValue placeholder="Доступность" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Все мотоциклы</SelectItem>
                        <SelectItem value="available">Только доступные</SelectItem>
                        <SelectItem value="unavailable">Только недоступные</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
                
                {exportOptions.section === "bookings" && (
                  <div className="space-y-2">
                    <Select defaultValue="all">
                      <SelectTrigger id="export-filter-booking-status">
                        <SelectValue placeholder="Статус" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Все статусы</SelectItem>
                        <SelectItem value="pending">Ожидает</SelectItem>
                        <SelectItem value="confirmed">Подтверждено</SelectItem>
                        <SelectItem value="completed">Завершено</SelectItem>
                        <SelectItem value="cancelled">Отменено</SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <Label htmlFor="export-date-from" className="text-xs">Дата с</Label>
                        <Input
                          id="export-date-from"
                          type="date"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="export-date-to" className="text-xs">Дата по</Label>
                        <Input
                          id="export-date-to"
                          type="date"
                          defaultValue={currentDate}
                        />
                      </div>
                    </div>
                  </div>
                )}
                
                {exportOptions.section === "users" && (
                  <Select defaultValue="all">
                    <SelectTrigger id="export-filter-user-status">
                      <SelectValue placeholder="Статус" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Все пользователи</SelectItem>
                      <SelectItem value="active">Активные</SelectItem>
                      <SelectItem value="blocked">Заблокированные</SelectItem>
                      <SelectItem value="pending">Ожидающие</SelectItem>
                    </SelectContent>
                  </Select>
                )}
                
                {exportOptions.section === "analytics" && (
                  <div className="grid grid-cols-2 gap-2">
                    <Select defaultValue="all">
                      <SelectTrigger id="export-filter-analytics-type">
                        <SelectValue placeholder="Тип данных" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Все данные</SelectItem>
                        <SelectItem value="bookings">Бронирования</SelectItem>
                        <SelectItem value="revenue">Доходы</SelectItem>
                        <SelectItem value="users">Пользователи</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select defaultValue="month">
                      <SelectTrigger id="export-filter-analytics-period">
                        <SelectValue placeholder="Период" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="week">Неделя</SelectItem>
                        <SelectItem value="month">Месяц</SelectItem>
                        <SelectItem value="quarter">Квартал</SelectItem>
                        <SelectItem value="year">Год</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsExportDialogOpen(false)}>Отмена</Button>
            <Button onClick={confirmExport}>
              <Icon name="Download" className="mr-2 h-4 w-4" />
              Экспортировать
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminPanel;

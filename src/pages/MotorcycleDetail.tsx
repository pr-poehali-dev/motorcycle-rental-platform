
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { motorcycles } from "@/data/motorcycles";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Icon from "@/components/ui/Icon";
import { useToast } from "@/components/ui/use-toast";

// Отзывы пользователей (в реальном проекте будут загружаться с сервера)
const demoReviews = [
  {
    id: 1,
    userName: "Александр К.",
    rating: 5,
    comment: "Отличный мотоцикл! Аренда прошла гладко, состояние техники идеальное. Рекомендую всем любителям двухколесных.",
    date: "2025-05-02"
  },
  {
    id: 2,
    userName: "Мария Л.",
    rating: 4,
    comment: "Брала на выходные, осталась очень довольна. Мотоцикл в отличном состоянии, персонал приветливый иЯ расширю профессиональный.", административную панель управ
    date: "ления, добавив2025-04- новые функ15"
  },циональные возможности
  {
    id: 3, и улучшив п
    userName: "ользовательский интерфейс.Ирина С

<pp.",
    rating:-write 5,
    comment: filepath="src/pages/ "Великолепный мотAdmin.tsxоцикл,">
import { useState, useEffect управление на } from "react"; высоте!
import { use Буду арNavigate } from "ендовать снreact-router-domова, когда при";
import { Buttonеду в город. } from "@/components/ Рекомендую!",
    date:ui/button "2025-04";
import { Input-10"
   } from "@/components}
];

///ui/input"; Д
import { Label } from "@/componentsополнительные из/ui/label";ображения м
import {отоциклов
const  Tabs,demoImages = { TabsContent
  1: [, TabsList, Tab
    "https://images.unsplash.com/sTrigger } fromphoto-1558 "@/components/ui/tabs";
import { 981806
  Table,-ec 
  TableBody527fa84, 
  TableCell, 
  c39TableHead, ?ixlib=rb-4
  TableHeader, 
  TableRow .0.3
} from "@/&auto=format&fit=components/ui/tablecrop&w=1";
import { 200&h
  Dialog,=800",
  DialogContent,
    "https://
  DialogHeader,images.unsplash
  DialogTitle,.com/photo-
  DialogFoot1558er,
} from "@/components/980664ui/dialog";-3
import { Select, SelectContent, SelectItema031cf, SelectTrigger, SelectValue } from "@/components/ui67ea8?ixlib/select";
import=rb-4.0.3&auto=format&fit= { Badge } from "@/componentscrop&w=1/ui/badge";200&h=800
import { Car",
    "httpsd, CardContent, CardDescription://images.unspl, CardHeader, Carash.com/photodTitle,-1558981852 CardFooter } from "@/-426ccomponents/ui/card";
import { Alert, AlertDescription, Alert6c22Title } from "@/components/ui/alerta060";
import {?ixlib= Textarearb-4.0 } from "@/components.3&auto=/ui/textarea";format&fit=crop
import { Switch&w=1200 } from "@/components&h=800"/ui/switch";
  ],
  
import { Checkbox2: [
     } from "@/components/ui/checkbox";
import { Tooltip, TooltipContent,"https://images. TooltipProvider,unsplash.com/photo-1571646750 TooltipTrigger } from "@/134-91components/ui/tooltip";
import { d27a
  DropdownMenu,
  DropdownMenuContent,50fffa
  Dropdown?ixlib=MenuItem,
  Droprb-4.0downMenuLabel.3&auto=,
  Dropformat&fit=cropdownMenuSeparator&w=1200,
  Drop&h=800",downMenuTrigger
    "https://,
} from "@images.unsplash/components/ui/.com/photo-dropdown-menu";1631
import {
  906616043Popover,
  Pop-009boverContent,
  PopoverTca0360rigger,
}eb?ixlib from "@/components/=rb-4.ui/popover";0.3&auto
import {=format&fit=
  crop&w=1200&h=800ContextMenu,
  ",
    "httpsContextMenuContent,://images.unspl
  ContextMenuItem,ash.com/photo
  ContextMenu-1671Trigger,
} from "@/components177711/ui/context-menu";
import {516-3
  HoverCard,
  Hdb5f2c9overCardContent,
  HoverCardT952e?ixlibrigger,
}=rb-4. from "@/components/0.3&autoui/hover-car=format&fit=d";
import Iconcrop&w=1 from "@/components/200&h=800ui/Icon"
  ],";
import Header
  3: [ from "@/components/
    "https://imagesHeader";
import {.unsplash.com/photo-1 Separator } from "@/components/ui/separator";606420187
import { motorcycles } from "@/477-7953data/motorcycles";
import { MotorcycleProps }cd73dc90?ixlib from "@/components/=rb-4.Motorcycle0.3&autoCard";
import {=format&fit=crop&w=1 useToast } from "@/200&h=800components/ui/use",
    "https-toast";

const://images.unsplash.com/photo categoryOptions = ["-1626Круизер", "Спортб275320676айк", "Нейкед", "Энду-160faро", "Ч833e8оппер", "d8?ixСкlib=rb-4.0.3&рэмauto=format&fitблер"];=crop&w=1200&h=

// Расширен800",
    "https://images.unsный тип для мplash.com/отоциклаphoto-1615 с дополнительными204317943 полями
interface Ext-9ed38bc16535?ixlib=rb-4.0endedMotorcyc.3&auto=leProps extends MotorcycleProps {
  description?: string;
  format&fit=cropfeatures?: string[];
  &w=1200&h=800"
  ]
};availability?: boolean;
  

// ТrentCount?: number;
  ип для бронирования
interfacelastRented?: string;
   BookingFormData {
  firstName: string;
  discount?: number;
  lastName: string;color?: string;
  
  email: string;
  phone: string;
  addressengine?: string;
  Line1: string;weight?: string
  dateRange: {
    from;
  fuelCapacity?: string;?: Date;
    to
  max?: Date;
  Speed?: string;};
}

const Motorcycle
}

//Detail = () => { Тип для бронирования
  const { i
interface BookingProps {
  d } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToid: number;
  ast();
  motorcycleId: number
  const [date;
  motorcRange, setDateRangeycleName: string;] = useState<{
  customer
    from?: DateName: string;;
    to?: Date;
  
  email: string;
  }>({});
  phone: string;const [total
  startDate: string;
  endDateDays, setTotal: string;
  Days] = useStatestatus: "pending" | "confirme(0);
  constd" | "complete [totalPrice, setTotalPrice] =d" | "cancelle useState(0);d";
  
  const [reviews, setReviewstotalPrice: number;] = useState(
  demoReviews);
  const [usercreatedAt: string;
  Rating, setUserRpaymentMethod?:ating] = useState( string;
  pay0);
  constmentStatus?: " [isLoading,pending" | "pai setIsLoading]d" | "ref = useState(trueunded";
  );
  const [isBookingDialcomment?: string;ogOpen, setIsBookingDialogOpen
  documents] = useState(false);
  const [?: string[];
  isReviewDialogrentalDOpen, setIsReays?: number;viewDialogOpen] = useState(false);
}

//
  const [is Тип для пImageDialogOpen, setIsImageDialogользователя
interface UserPropsOpen] = useState( {
  id:false);
  const number;
  name: string;
   [selectedImage, setSelectedImage] = useState("");email: string;
  const [book
  phone: string;ingFormData, set
  registereBookingFormData]dAt: string; = useState<BookingFormData>({
  bookings
    firstName: "",Count: number;
    lastName: "",
    email: "",
    phone: "",
    addressLine1:
  status: "active" | "",
    dateRange "blocked" | "pending";
  avatar: {}
  });?: string;
  
  constrole?: " [reviewFormData, setReuser" | "adminviewFormData] =" | "manager useState({
    rating: 5";
  verifie,
    comment:d?: boolean;
   ""
  });
  
  // СимlastLogin?: string;
  уляция загрузки данныхaddress?: string;
  
  useEffect(() => {
    constlicenseNumber?: string; timer = setTimeout(() => {
  birthDate?:
      setIsLo string;
  favorading(false);iteMotorcycles?:
    }, 800);
     number[];
}

//
    return () => clear Тип для аTimeout(timer);
  }, []);налитики
interface 

  // НайAnalyticsProps {ти мотоц
  totalRevикл по ienue: number;d
  const motorcycle =
  bookingsTh motorcycles.find(m => m.iisMonth: number;d === Number
  activeUsers:(id));
   number;
  popular
  // ПолучMotorcycles: {id: number, name:аем д string, rentополнительные изображCount: number}[];ения для
  re мотоцикла
  const additvenueByionalImages = motorcycleMonth: {month ? (: string, revenue:demoImages[motorcycle. number}[];
  id as keyof typeof demobookingsByStatus: {Images] || [])status: string, count : [];: number}[];
  userG
  const allrowth: {monthImages = motorcycle: string, users ? [: number}[];motorcycle.image, ...
}

//additionalImages] : Расширенные [];

  // Если мотоцикл не найден, демо-данные мотоциклов показываем с
const extendeообщение
  dMotorcycles: Extif (!motorcycle &&endedMotorcyc !isLoading)leProps[] = motorc {
    return (ycles.map(
      <div classNamemotorcycle => ({
  ...motorcycle,
  ="flex flexdescription: `${motorcycle.name}-col min-h-screen">
        <Header /> - отличный выбор
        <main className для любителей м="flex-growотоциклов container mx-auto px-. Ст4 py-12ильный дизай">
          <divн, мощный className="text двигатель и-center py отличная управляемость делают его-12  идеальным дляbg-white rounded-lg городских поездок и путешествий.`,
  features: [" shadow-md">
            <Icon name="AlertCircle" className="mx-auto h-16 w-16ABS", "Кру text-red-500 из-контроmb-4" />ль", "LED-фары", "
            <h2 className="text-USB-пор2xl font-bold mb-2т"],
  availability: Math">М.random() > отоцикл не найден</h0.2,
  rentCount2>
            : Math.floor(<p className="text-Math.random() *gray-600 mb 30),
  lastR-6 ented: new Date(max-w-mDate.now() -d mx-auto"> Math.floor(Math
              Изв.random() * ините, мотоцикл30) * 24 * с указанным ID 60 *  не существует или60 * 1000).toI был удален.
            SOString().</p>
            <Button onClicksplit('T')[0],={() => navigate("/catalog
  discount: Math.")}>
              random() ><Icon name="Arrow 0.7 ? MathLeft" className="mr-.floor(Math.2 h-4random() * 20 w-4") : 0, />
              В
  color: ["ернуться в каталог
            </Button>
          Черный", "Крас</div>
        ный", "Син</main>
        ий", "Сер<Footer />
      </div>
    );ебристый"][Math.floor(Math
  }

  .random() * // Обнов4)],
  ляем расengine: motorcycle.category === "Спортбайкчеты при" ? "4 изменении дат
  const updateCalcul-цилиндровыйations = (, 998range: { from?: Date куб.; to?: Date }) => {
    if см" : "2-цилинд (range.from && rangeровый, 650.to && куб. см motorcycle) {
      ",
  weight:const start = new Date(range `${180.from);
       + Math.floorconst end = new Date(Math.random()(range.to); * 70
      const)} кг`,
   days = Math.ceilfuelCapacity:((end.getTime() - start.get `${12Time()) / (1 + Math.floor000 * 60(Math.random() * 60  * 10)} л* 24))`,
  maxSpee + 1;d: `${180 
      setTotalD+ Math.floor(ays(days);Math.random() *
      setTotalPrice(days 120)} км/ч * motorcycle.price);
    } else {`,
}));

//
      setTotalDays(0); Демо-данные б
      setTotalронирований
constPrice(0); demoBookings: Book
    }
  };ingProps[] = [

  // Об
  {
    работчик измененияid: 1,
    motorcycle дат
  const handleId: 1,
    motorcycleNameDateChange = (range: {: "Harley from?: Date; to-Davidson Road King",?: Date }) => {
    customerName:
    set "DateRange(range);Иван Пет
    updateCalculationsров",
    email(range);
    : "ivan@example.com",
    setBookingFormData({phone: "+7 
      ...bookingFormData,
      date(900) 123-45Range: range
    -67",
    });
  };startDate: "2

  // Обработчик изменения025-05-05 формы бронир",
    endDateования
  const handle: "2025-BookingFormChange =05-07",
    status: (field: keyof Booking "confirmed",
    FormData, value:totalPrice: 15 string) => {
    set000,
    creBookingFormData(atedAt: "2prev => ({
      ...025-05-01prev,
      [",
    paymentfield]: value
    Method: "Кар}));
  };та",
    pay

  // ОбmentStatus: "paiработчик отправd",
    renки формы бронtalDays: ирования
  const handleBookingSubmit = ()3
  },
  { => {
    //
    id:  Проверка2,
    motorc формы
    ifycleId:  (!bookingFormData3,
    motorcycl.firstName || !bookeName: "DucingFormData.lastNameati Monster",
    customerName: " || !bookingFormАнна СмData.email || 
        !bookingFormData.phone || !bookingFormDataирнова",.dateRange.from || !
    email: "annabookingFormData.@example.com",dateRange.to)
    phone: "+ {
      toast({7 (900)
        variant 987-65-: "destructive",43",
    startDate: "2025
        title: "-05-10",Ошибка",
    endDate:
        description: " "2025-05Пожалу-12",
    йста, заполstatus: "pending",ните все об
    totalPrice:язательные поля 13000,
    cre",
      });
      return;atedAt: "2
    }025-05-02
    
    // В",
    payment реальном приMethod: "Наложении здесьличные",
    paymentStatus: "pending",
    ren будет APItalDays: 2
  },
  {
    i запрос
    setd: 3,IsBookingDialog
    motorcycleIOpen(false);d: 2,
    motorcycl
    
    toasteName: "BMW S({
      title1000RR",: "Бронирование успешно!",
      description:
    customerName: "Алексей Иванов",
    email: `Мотоцикл "alex@example.com",
    phone: "+ ${motorcycle?.name} заб7 (900)ронирован с 111-22-33", ${bookingFormData.date
    startDate: "2025-05Range.from?.-03toLocaleDateString(",
    endDate)} по ${booking: "2025-FormData.dateRange05-09.to?.toLocal",
    status:eDateString()}`, "complete
    });
    d",
    totalPrice
    // Оч: 54истка формы
    000,
    createdAt: "2setBookingFormData({
      firstName:025-04-25 "",
      lastName:",
    payment "",
      email:Method: "Кар "",
      phone:та",
    pay "",
      addressLinementStatus: "pai1: "",
      d",
    commentdateRange: {}: "Кл
    });
    иент запросил доставкуsetDateRange({});
    setTotalDays мотоцикла(0);
    setTotalPrice(",
    ren0);
  };talDays: 

  // Об6
  },работчик отправ
  {
    id: 4,ки отзыва
  
    motorcycleIconst handleReviewSubmd: 5,it = () => {
    motorcycleName:
    if (!reviewFormData. "Triumph Street Triple",
    customerName: "Марияcomment || review Козлова",
    FormData.rating ===email: "maria@ 0) {example.com",
      toast({
        
    phone: "+7variant: "destructive (900) ",
        title: "Ошиб444-55ка",
        description-66",
    : "Пожалуйста, укажите оценкуstartDate: "2 и напишите комментар025-05-15",
    endDate: "2025-05-18ий",
      });",
    status:
      return; "cancelled",
    
    }
    totalPrice: 18
    //000,
    cre Добавляем новatedAt: "2ый отзыв025-05-04
    const newRe",
    paymentview = {
      Method: "Карid: reviews.lengthта",
    pay + 1,mentStatus: "refunded",
    comment: "Отмена
      userName: "Вы по ин",
      rating:ициативе кли reviewFormData.ratingента",
    ren,
      comment:talDays:  reviewFormData.comment3
  },,
      date:
  {
    id: 5,
    motorcycleId: 4, new Date().toI
    motorcycleName:SOString().split "Kawasaki('T')[0]
    };
     Ninja 650",
    setReviews
    customerName: "Д([newReview, ...reviewsмитрий]);
    setIsReviewDialogOpen Соколов",
    (false);
    email: "dmitry
    toast@example.com",({
      title:
    phone: "+ "Сп7 (900)асибо за отзыв!", 777-88-99",
      description: "
    startDate:Ваш от "2025-05зыв усп-20ешно доб",
    endDateавлен",: "2025-
    });
    05-25
    // Очист",
    status:ка формы
     "confirmesetReviewFormDatad",
    totalPrice({
      rating:: 25 5,
      000,
    crecomment: ""
    atedAt: "2});
  };025-05-10

  // Откр",
    paymentMethod: "Онытие изображения в полнолайн-экранном режиме
  constперевод",
    paymentStatus: " openImageDialog = (imagepaid",
    ren: string) => {talDays: 
    setSelectedImage5
  }(image);
    
];

//setIsImageDialog Демо-данныеOpen(true); пользователей
  };

  //
const demoUsers: UserProps[] = [ Общий р
  {
    id: 1,ейтинг на
    name: " основе отзывИван Петов
  const averров",
    emailageRating = reviews: "ivan@example.length.com",
     > 0 phone: "+7 (900) 123
    ? (reviews.reduce((acc-45-67",, review) => acc + review.rating,
    registeredAt 0) / reviews: "2025.length).toFixe-04-15",
    bookingsd(1)
    : "Count: 20.0";,
    status: "active",
    

  // Рендavatar: "https://еринг звimages.unsplash.com/photo-езд рейтин1500648767791га
  const render-00dcc994a43e?Stars = (ixlib=rb-rating: number,4.0.3&ixid=MnwxM interactive = falsejA3fDB) => {
    8MHxwareturn (G90by1w
      <div classNameYWdlfH="flex">x8fGV
        {[1ufDB8fH, 2, x8&auto=3, 4,format&fit=crop 5].map((&w=256&q=80",star) => (
          
    role: "user",
    verified: true,
    <button
            key={starlastLogin: "2}
            type={025-05-03interactive ? "button"",
    licenseNumber: "AB : undefined}
            className={123456",
    interactive ? "cursorfavoriteMotorcycles:-pointer focus [1, 3:outline-none"]
  }, : undefined}
            
  {
    id: 2,onClick={interactive ? () => set
    name: "UserRating(starАнна Смир) : undefined}нова",
    email: "anna@
            aria-label={interactiveexample.com", ? `Оцен
    phone: "+7 (900) ить на ${star} из987-65-43 5` : undefine",
    registered}
          >dAt: "2025
            <Icon -04-20",
              name="
    bookingsCountStar" 
              : 1,className={`h-
    status: "active5 w-5",
    avatar: ${ "https://images.
                star <= (unsplash.com/photo-1494interactive ? userRating :790108377-be9c29b29330?ixlib rating) 
                  ?=rb-4. "text-yellow-0.3&ixid=MnwxMjA400 fill3fDB8M-yellow-400"HxwaG90 
                  :by1wYW "text-gray-dlfHx8fGVufDB300"
              }`}8fHx8 
            />&auto=format&
          </button>
        ))}
      </div>
    );
  };fit=crop&w

  // Если=256&q=80",
    role: "user",
    verified: true,
    lastLogin: "2025- загрузка е05-02",
    licenseще идет, показNumber: "CD789012",
    favoriteMotorcycles:ываем скел [2]
  },
  {етон
  if (
    id: 3isLoading) {,
    name:
    return ( "Алексей
      <div className=" Иванов",flex flex-col min
    email: "-h-screen">alex@example.com
        <Header />",
    phone:
         "+7 (900
        <main className=") 111-22flex-grow">-33",
    
          <div classNameregisteredAt: "="container mx-auto2025-03 px-4 py-10",
    bookings-8">
            <divCount: 3, className="animate
    status: "active",
    avatar-pulse">
              <div className: "https://images="h.unsplash.com/photo-1-8 bg599566150163-29-gray-200 rounded w-1/3 mb-2194dcaa"></div>
              d36?ixlib<div className="h=rb-4.-6 bg-gray-0.3&200 rounded w-ixid=Mn2/3 wxMjAmb-83fDB8M"></div>
              HxwaG90by1wYW
              <div className="dlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=grid grid-cols-180",
    role: "user", lg:grid-cols-2 gap-8">
                <div className="bg-gray-200 rounded-
    verified: true,
    lastLogin:lg aspect-[ "2025-054/3]-04",
    licenseNumber: ""></div>
                EF345678",<div className="space
    favoriteMot-y-4">orcycles: [4
                  <div, 5, className="h-10 6]
   bg-gray-},
  {200 rounded w-
    id: 43/4"></div,
    name:>
                   "Мария<div className="h- Козлова",6 bg-gray-
    email: "maria200 rounded w-@example.com",
    phone: "+1/2"></div>7 (900)
                  <div 444-55- className="h-866",
    regist bg-gray-eredAt: "2200 rounded w-025-04-05",
    1/3"></divbookingsCount: >
                  <div className="gri1,
    status:d grid-cols-3 "blocked",
     gap-4">avatar: "https://
                    <divimages.unsplash className="h-20.com/photo- bg-gray-1580200 rounded"></div>
                    489944761<div className="h-15-20 bg-a19gray-200 rounded654956?d"></div>
                ixlib=rb-    <div className="4.0.3h-20 bg-gray-200 rounded"></div>&ixid=
                  </div>MnwxMjA3fDB8MHxwaG90by1w
                  <div className="hYWdlfH-40 bg-gray-x8fGV200 rounded"></divufDB8fHx8&auto=>
                  <div className="hformat&fit=crop&w=256&-12 bg-gray-q=80",
    role: "user200 rounded"></div>
                ",
    verified: false,
    last</div>
              Login: "2025</div>
            -04</div>
          </div>
        -20",
    license</main>
        
        <Footer />Number: "GH
      </div>901234",
    favor
    );
  }iteMotorcycles:

  return (
    <div className=" []
  },
  flex flex-col min{
    id:-h-screen"> 5,
    
      <Header />name: "Д
      
      митрий<main className="flex- Соколов",
    email: "dmitgrow">
        {ry@example.com/* Хл",
    phone:ебные крошки "+7 (900 */}
        ) 777-88-99",
    <div className="bgregisteredAt: "2025-05-gray-100 py-01",
    bookingsCount: 1,
    status:-4">
          <div "pending",
     className="container mx-avatar: "https://auto px-4">images.unsplash
            <div.com/photo- className="flex items-1507center text-sm003211169-0a1dd7228f2d? text-gray-600">ixlib=rb-
              <a href4.0.3="/" className="hover&ixid=:text-primaryMnwxMjA3fDB8MHxwa transition-colors">G90by1wГлавная</a>YWdlfH
              <Icon namex8fGV="ChevronRight" classNameufDB8fHx8&auto=="h-4 w-format&fit=crop4 mx-1&w=256&" />
              q=80",<a href="/catalog"
    role: "user className="hover:text",
    verified:-primary transition-colors false,
    lastLogin">Каталог: "2025-</a>
              05-01<Icon name="Ch",
    licenseevronRight" classNameNumber: "IJ="h-4 567890",
    w-4 mxfavoriteMotorcycles-1" />
              <span className: [1]
  }="text-gray-900
];

// Демо-данные для font-medium">{ аналитикиmotorcycle?.name}</span>
            </div
const demoAnalytics:>
          </div AnalyticsProps>
        </div = {
  total>
        
        Revenue: 125{/* Основная000,
  bookingsThisMonth: информация о мотоцикле */} 12,
  activeUsers
        <section: 42 className="container mx-,
  popularMotauto px-4 orcycles: [py-8">
    {id:
          <div className=" 1, name:grid grid-cols- "Harley-1 lg:griDavidson Road King", rentCount: 15},
    {id: 2, named-cols-2 : "BMW S1gap-8">
            {/* Галерея ф000RR", rentотографий */}Count: 12
            <div className},
    {id: 3, name="space-y-4">: "Ducati Monster", rentCount: 10}
              <div className="bg
  ],
  revenueByMonth-gray-100 rounded-: [
    {lg overflow-hidden cursormonth: "Январ-pointer" onClick={()ь", revenue:  => openImageDialog(45000},
    {month: "Февmotorcycle!.image)}>раль", revenue:
                <Asp 52000},
    {ectRatio ratio={month: "Март4/3}>
                ", revenue: 60  <img 000},
    {
                    src={motorcyclemonth: "Ап!.image} рель", revenue:
                    alt={motorcycle!.name} 75000},
    { 
                    classNamemonth: "Май="w-full h", revenue: 125-full object-cover000}
  ],
  bookingsByStatus: [ transition-transform hover
    {status::scale-105 "Зав duration-300ершено", count: 35" 
                  />},
    {status
                </Aspect: "ПодRatio>
              тверждено",</div>
               count: 12},
    {status
              {additionalImages.length >: " 0 && (Ожидает",
                <div className="grid grid-cols count: 8},
    {status-3 gap-: "Отмен4">
                  ено", count: {additionalImages.5}
  ],map((img, index
  userGrow) => (
                th: [
        <div {month: "
                      key={Январь", users:index} 
                 15},
    {month      className="bg: "Февра-gray-100 rounded-lg overflow-ль", users: hidden cursor-pointer"
                      onClick={()22},
    {month => openImageDialog(: "Март",img)}
                     users: 30},>
                      
    {month:<AspectRatio ratio "Апрель", users: 38},
    {month={1}>
                        <img: "Май", 
                          src users: 45={img} }
  ]
                          alt={`
};

// Компонент для отображ${motorcycle!.name}ения мини-граф - фото ${index + ика2}`} 
                 (без          className="w- внешfull h-full objectних зависимост-cover transition-transformей)
const hover:scale-105 MiniChart = ({ duration-300" data, 
                        /> type
                      </AspectRatio> = "line
                    </div>",
                  ))}
                </div> height = 40
              )}
             }: { data</div>
            : number[], type?:
            {/* Информация и "line" | "bar бронирование */", height?: number })}
            <div => {
  const>
              <div className max = Math.max(...data);
  const="flex flex-wrap items-center justify-between min = Math.min(... gap-2 mb-2data);
  const range = max - min">
                <h || 1;
  1 className="text-3xl font-
  return (
    <div style={{ heightbold">{motorcycle!.name}</h1: `>
                <Badge${height}px` className="bg-primary }} className="flex items- text-white">{motorcycle!.category}end justify-between</Badge>
              </div>
               w-full gap
              <div className="-1">
      {flex itemstype === "line"-center text ? (
        <svg-yellow-500 mb-4">
                { viewBox={renderStars(parse`0 0 Float(averageRating))}
                ${data.length -<span className="ml 1} -2 text-1`} className="wgray-600">{aver-full hageRating}-full overflow-visible ({reviews.length} от">
          <polyзывов)</span>
              </divline
            points={data.>
              
              map((value, i) => `${i/(data.length-1<p className="text)},-2xl font-bold text-primary mb-4 ${1 - (value - min) / range}` flex).join(' ')} items-baseline">
                {motorcycle!.price.toLocaleString()} ₽
                
            fill<span className="text="none"
            -sm text-graystroke="-500 mlcurrentColor"
            -1strokeWidth="">/день</span>0.05
              </p>"
            
              
              className="text<div className="gri-primaryd grid-cols-2"
          />
        </svg> sm:grid-cols-
      ) : (
        data3 gap-4 mb-.map((value, i) => (6">
                <div
          <div
            key={i}
            className="bg className="bg-gray-100 -primary/p-380 rounded-sm rounded-lg">
                  <div className="flex items- flex-1center">
                    <Icon name="Tag"
            style={{" className="mr
              height: `-2 h-${Math.max5 w-5 text-gray(10, (-500value - min) /" />
                     range * <span className="text100)}%`,-sm text-gray-600
            }}
          />">Катег
        ))
      )}ория
    </div></span>
                  
  );
};</div>
                  <p className="

const AdminPanelfont-medium" = () => {
  >{motorcycle!.category}</p>
                const navigate</div>
                 = useNavigate();<div className="bg
  const {-gray-100 p-3 rounde toast } = useToastd-lg">
                ();
    <div className="flex items-center">
  const [isAuthent
                    <Iconicated, setIsAuthent name="Zicated] = useState(ap" className="mrfalse);
  const-2 h- [username5 w-5, setUsername] = text-gray- useState("");500" />
                
  const [passwor    <span className="d, setPassword] =text-sm text- useState("");
  const [logingray-600">Error, setLoginErrorМощность</span>
                  ] = useState("");</div>
                  <p className="font-medium">{motorcycle
  const [is!.power}Loading, setIsLoading] = useState</p>
                (false);
  </div>
                const [rem<div className="bg-emberMe, setRemgray-100 pemberMe] = useState-3 rounded-(false);
  lg">
                  
  const [<div className="flex items-center">
                    <Icon namemotorcyclesList, setMotorcyc="Calendar" className="mr-lesList] = useState2 h-5<Ext w-5 endedMotorcyctext-gray-500leProps[]>(" />
                    <span className="textextendedMotorcycles-sm text-gray);
  const [-600">ГодisEdit выпуска</span>
                  DialogOpen</div>
                  , setIsEditDial<p className="fontogOpen] = useState-medium">{motorcycle(false);
  const [is!.year} г.</p>
                DeleteDialogOpen, set</div>
              IsDeleteDialogOpen</div>
              ] = useState(false);
  const [
              <Separator className="myisView-6" />
              BookingDialogOpen,
              { setIsViewBooking/* БDialogOpen] =ронирование */} useState(false);
              <h
  const [isViewUserDialogOpen,2 className="text- setIsViewUserDialogOpen] = useStatexl font-bold mb-(false);
  4">Бронconst [currentирование</h2>
              
              Motorcycle, setCurrent<div className="bgMotorcycle] = useState<Extende-white borderdMotorcycleProps rounded-lg p- | null>(null);4 mb-6
  const [currentBooking, setCurrentBooking] = useState<BookingProps | null>(null);
   shadow-sm">
                <label className="block text-sm font-medium text-gray-700 mbconst [currentUser,-2">
                 setCurrentUser] = useState<UserProps | null>(null);  Выберите да
  const [formты аренды
                Data, setFormData</label>
                ] = useState
                <Calendar<Partial<ExtendedMotorcyc
                  modeleProps>>({});="range"
                
  
  const [filter  selected={dateRange}
                  onSelect={Status, setFilterStatus]handleDateChange} = useState("
                  disableall");
  const [searchd={{ before: new Date() }}Term, setSearchT
                  classNameerm] = useState("");
  const [book="rounded-mings, setBookings]d mx-auto" = useState<Booking
                />
              Props[]>(demo</div>
              Bookings);
  
              {const [users, setUsers] = useStatetotalDays > 0<UserProps[]>( && (
                demoUsers);
  const [analytics<Card className="mb-6, setAnalytics] = useState bg-gray<AnalyticsProps>(-50 shadow-demoAnalyticssm">
                  );
  const [avail<CardContentabilityFilter, setAvailabil className="p-4">ityFilter] = useState
                    <h3 className="font<"all" | "available-sem" | "unavibold mbailable">("all");
  const [category-2">Детали бронированияFilter, setCategoryFilter]</h3> = useState<string>("
                    <div className="spaceall");
  const [-y-1userStatusFilter, setUserStatus text-sm">
                Filter] = useState      <div className="<"all" | "active" | "blockeflex justify-between">
                        <spand" | "pending">("all");
  >Ст
  //оимость в Для загрузки прев день:</span>
                        ью изображения<span>{motorcycle!
  const [image.price.toLocPreview, setImagealeString()} Preview] = useState₽</span>
                      </div("");
  const [active>
                      <div className="flex justifyTab, setActiveTab]-between">
                 = useState("dashboar        <span>Количество дней:</spand"); // dashboard, motorcycles, book>
                        ings, users, settings<span>{totalDays
  
  //}</span>
                 Получение      </div>
                       текущей<Separator className="my- даты в2" />
                 формате YYYY      <div className="-MM-DDflex justify-between font
  const currentDate = new Date().toISOString().-bold text-basesplit('T')[0">
                        ];
  
  <span>Итого// Стат к оплате:</spanистика>
                        <span>{total
  const totalMotPrice.toLocaleorcycles = motorcycString()} lesList.length;₽</span>
                      </div>
                    </div
  const totalCateg>
                  ories = new Set(motorcyclesList.map(m</CardContent>
                 => m.category)).</Card>
              size;
  const)}
              
               averagePrice = Math.round(motorcyc<div className="flex flexlesList.reduce((-col sm:flex-row gapacc, m) => acc-3 + m.price,"> 0) / total
                <ButtonMotorcycles); 
                  className
  const totalBook="flexings = bookings.-1"length;
  const 
                  size="lg pendingBookings = book"ings.filter(b
                  onClick={() => b.status === => setIsBooking "pending").length;DialogOpen(true
  const total)}
                  Revenue = bookdisabled={!ings.reduce((acc, b) => acc + b.totalPrice, 0);dateRange.from ||
  const avail !dateRange.to}
                >
                  <Icon name="CalableMotorcycles =endarCheck" className="mr-2 h motorcyclesList.-5 w-filter(m => m5".availability). />
                  length;Забронировать

  // Про
                </Button>верка сох
                <Button 
                  variantраненного="outline"  сост
                  sizeояния ав="lg"
                торизации при  className="flex-1" загрузке
                  onClick={()
  useEffect(() => => navigate(`/catalog {
    const save`)}
                >
                  <Icon namedAuth = localStorage.getItem="ArrowLeft" className="mr-2('admin h-5 Auth');
    ifw-5" /> (savedAuth ===
                  Наз 'true') {
      setIsAuthentад в каталог
                icated(true);</Button>
              
    }
    </div>
            
    // Заг</div>
          рузка м</div>
        отоциклов</section>
         из localStorage
        {/* Дополнительная информ, если ониация */}
         там ес<section className="containerть
    const mx-auto px- savedMotorcycles =4 py-8 localStorage.getItem('">
          adminMotorcycles');
    if (save<Tabs defaultdMotorcycles) {
      tryValue="description {
        set" className="wMotorcyclesList-full">(JSON.parse(
            <divsavedMotorcycles)); className="border
      } catch (-b">
              <TabsListe) {
        console className="w-full m.error("d:w-autoОшибка при justify-start загрузке дан mbных мотоци-0клов:", e);
      }
     bg}
  }, [-transparent p-0">
                ]);

  // Пред<TabварsTrigger ительный
                  value=" просмотр изdescription" 
                ображения
  use  className="dataEffect(() => {-[state=active
    if (formData.image) {]:border-b-2 
      setdata-[state=ImagePreview(formactive]:border-primaryData.image); data-[state=active]:text-primary data-[state=active
    }
  }, [formData.image]);

  //]:shadow-none Функция аутентификации
  const handle rounded-none pxLogin = (-4e: React.Form py-2"Event)
                >
                 => {
    e  Описание.preventDefault();
    
                </TabsTrigsetIsLoading(ger>
                true);
    <TabsTrigger 
    // Имит
                  value="ация задspecifications" 
                  ержки запросаclassName="data-[ к API
    setTimeout(()state=active]:border => {
      //-b-2 data-[state= Простая проверка (active]:border-primaryв реальном при data-[state=ложении здactive]:text-primaryесь буд data-[state=ет API запactive]:shadow-noneрос)
       rounded-none px-if (username === "4 py-2admin" && password ==="
                > "admin123
                  Характ") {
        setеристики
                IsAuthenticated(true</TabsTrigger);
        set>
                <TabLoginError("");
        ifsTrigger  (rememberMe)
                  value="requirements {
          localStorage." 
                  setItem('adminAuthclassName="data-[', 'true');state=active]:border
        }
        -b-2 data-[state=toast({active]:border-primary
          title: " data-[state=active]:text-primaryУспешный data-[state= вход",active]:shadow-none
          description rounded-none px-: "Доб4 py-2ро пожалов"
                >ать в пан
                  Требованияель администратора",
                </TabsTrigger>
                
          variant<TabsTrigger: "default 
                  value",
        });
      } else="reviews"  {
        setLogin
                  className="dataError("Невер-[state=activeное имя польз]:border-b-ователя или паро2 data-[ль");
        toaststate=active]:border({
          variant-primary data-[: "destructive",state=active]:text
          title: "-primary data-[Ошибкаstate=active]:shadow-none rounded-none входа",
          description px-4 py: "Не-2"
                верное имя п>
                  ользователя или пОтзывы ({ароль",
        reviews.length})});
      }
                </TabsTrig
      setIsLoadingger>
              (false);
    </TabsList>
            }, 800</div>
            );
  };
            <Tabs

  // Обработчик выContent value="description" className="хода
  constmt-6 handleLogout = () => {
    set space-y-IsAuthenticated(false4">
              <div);
    setUsername className="bg("");
    setPasswor-white rounded-lgd("");
    localStorage.removeItem('adminAuth');
    toast shadow-sm({
      title: p-6 "Вы">
                <hход выполнен",3 className="text-
      description: "xl font-semibВы успешноold mb-4"> вышли из системы",
    О мотоц});
  };икле {

  // Редmotorcycle?.актирование мотname}</h3>оцикла
                
  const handleEdit
                <div className=" = (motorcycle: Extprose prose-grayendedMotorcycleProps) => { max-w-none">
    setCurrentMot
                  orcycle(motorcycle);<p>
                    
    setForm{motorcycle?.nameData({ ...motorcycle });
    } — это высsetImagePreview(motorcycle.окопроизводimage);
    setительный мотоIsEditDialogOpenцикл,(true);
   который обеспечивает невероятные впечатления от вождения. };

  //
                    О Дублирование мотоцикла
  снащенconst handleDuplicate мощным двиг = (motorcycle: ExtendedMotorcycleProps) => {ателем и передовы
    const newми технологиямиId = Math.max(...motorcyclesList, этот мотоц.map(m => m.id)) +икл предлагает ид 1;
    const newMotorcycleеальный баланс : ExtendedMotorc
                    мощности,ycleProps = {
      ...motorcycle,
      id: newId,
      name: `${motorcycle. управляемости и комname} (копияфорта.
                  </p>
                  
                  <p>)`,
      rent
                    БлагCount: 0,одаря а
      lastэродинамическRented: "",ому дизайну и современ
    };
    ным технологиям
    setMotorcyc, {motorcycle?.name} обlesList([...motorcеспечиваетyclesList, newMotorcycle]); превосходное с
    localStorage.setItem('adminMotorcycles', JSONцепление с дор.stringify([...motorcогой yclesList, new
                    и маMotorcycle]));невренность в люб
    
    toastых условиях.({
      title: "М Эргономичнаяотоцикл посадка и продуманное дублирован",
      description: ` расположение органов управСоздления 
                    ана копия мотоделают длцикла "${motorcycle.name}"`,ительные поездки комфорт
    });
  };

  //ными и приятными.
                  </p> Изменение до
                  
                ступности мото  <p>цикла
  
                    Независconst toggleимо от того, планируете ли вы городскую поездку илиAvailability = ( длительное путешествmotorcycle: ExtendedMotorcycleProps) => {
    const updatedList = motorcyclesList.map(m => 
      m.iие по живописным d === motorcycle.id ?
                    ма { ...m, availabilityршрутам,: !m.availability {motorcycle?.name} } : m
     обеспечит в);
    setMotorcyclesList(ам незабываемые впupdatedList);ечатления от
    localStorage.setItem вождения.('adminMotorcycles
                  </p>', JSON.stringify(
                </div>updatedList));
                
                <div className
    
    toast({="mt-6 
      title: motorcycle.availability ? "Мgrid grid-cols-1отоцикл sm:grid- недоступен" :cols-2 gap "Мото-4">
                цикл доступ  <div className="ен",
      description: `flex items-center pСтатус мот-3 bg-оцикла "${gray-50 roundemotorcycle.name}" изd-lg">менен`,
                    <Icon
    });
   name="Thumbs};

  //Up" className="h Подтверждение редактирования-8 w-8 
  const confirmtext-primaryEdit = () => { mr-3" />
                    <div>
                      
    if<h4 className=" (!formData.name || !formData.pricefont-medium) {
      toast({
        variant text-gray-900: "destructive",">Комфор
        title: "т и эОшибкаргономика</h4>
                       валидации",
        <p className="textdescription: "Заполните все обяз-sm text-gray-600ательные поля",">Прод
      });
      уманная посадreturn;
    }ка для
    
    if длительных поезд (currentMotorcycle &&ок</p>
                     formData)</div>
                 {
      let  </div>
                  
                   updatedList;<div className="flex
      
      if items-center p-3 bg-gray (currentMotorcycle.i-50 rounded-lg">
                    <Icon name="d === Math.max(...motorcyclesList.map(Gauge" className="h-m => m.i8 w-8d)) + 1) text-primary mr {
        //-3" />
                    <div> Это новый мото
                      <hцикл
        4 className="fontupdatedList = [...-medium text-graymotorcyclesList,-900">Производ formData asительность</h4 ExtendedMotorc>
                      ycleProps];<p className="text-sm text-gray-
        toast({
          title600">Мощ: "Мотный двигательоцикл добавлен", и отличная управляемость</p>
          description: `
                    </div>Мотоцик
                  </divл "${formData.name}" усп>
                  ешно добавл
                  <div className="flex items-centerен в ка p-3 bgталог`,
        -gray-50 });
      } elserounded-lg"> {
        //
                    <Icon name Обновление существующего="ShieldCheck мотоцикла
        update" className="h-dList = motorcycle8 w-8sList.map(m text-primary mr => 
          m-3" />.id === currentMot
                    <div>orcycle.id ?
                      <h4 className="font { ...m, ...form-medium text-grayData } : m-900">Без
        );
        toastопасность</h({
          title:4>
                       "Мото<p className="textцикл обнов-sm text-grayлен",
          -600">Современdescription: `Мные системы активотоциклной без "${formопасности</pData.name}" усп>
                    ешно обновл</div>
                  ен`,
        });</div>
                
      }
        
                  
      setMotorc<div className="flex itemsyclesList(up-center p-3datedList);
       bg-gray-setIsEditDialogOpen50 rounded-lg(false);
      ">
                    <Icon name="Wr
      // Вench" className="h реальном прилож-8 w-ении здесь буд8 text-primaryет API mr-3" /> запрос
                    <div
      localStorage>
                      <h4 className=".setItem('adminfont-medium text-Motorcycles', JSONgray-900">.stringify(updateТехническое состdList));
    }ояние</h4
  };

  >
                      // Удаление<p className="text- мотоцикsm text-gray-ла
  const handle600">РегулDelete = (motorcycle:ярное об ExtendedMotorcслуживание иycleProps) => проверка {
    set</p>
                    </div>
                CurrentMotorcycle(motorcycle  </div>);
    setIs
                </div>DeleteDialogOpen(
              </div>true);
  };

  // Под
            </TabsContent>тверждение уд
            
            аления
  const<TabsContent value="specifications" className="mt-6">
              <div className="bg-white rounded-lg shadow-sm p-6"> confirmDelete = () =>
                <h3  {
    if (currentMotorcycle) {
      const updatedList = motorcyclesList.filter(m => m.iclassName="text-xld !== currentMotorcycle font-semibol.id);
      d mb-4">setMotorcyclesList(updatedList);
      setIsТехнические характеристикиDeleteDialogOpen(false);
      </h3>
                
      toast
                <div className({
        title:="grid grid-cols "Мото-1 mцикл удаленd:grid-cols-",
        description:2 gap-6 `Мото">
                  цикл "${current<div classNameMotorcycle.name="bg-gray-}" успешно удален из50 p-4 rounded- каталога`,
      });
      md">
                    
      // В реаль<h4 className="ном приложении здfont-mediumесь будет API запрос
       mb-4localStorage.setItem('adminMotorcycles', JSON.stringify(updatedList));
     flex items-center">}
  };
                      <Icon name

  // Добавление нового м="Engine" className="mrотоцикла-2 h-
  const handleAd5 w-5 text-primarydNew = () => {" />
                      Двигатель
    const newId = Math.
                    </hmax(...motorcycle4>
                    sList.map(m<ul => m.id)) + 1; className="space-y-2 
    const newMotorcdivide-y divide-grayycle: Extende-200">
                dMotorcycleProps      <li className=" = {
      id: newId,flex justify-between py-2
      name: "",
      price">
                        <span: 0, className="text-gray
      image: "-600">Тhttps://images.unsplash.com/ип:</span>
                        photo-1558<span>9804-т394-актныйdbb977</span>
                      </li>
                      <li className="039a2flex justify-between py-2">
                e?ixlib=        <span className="rb-4.0text-gray-600.3">М&autoощность:</span>=format&fit=
                        <spancrop&w=800>{motorcycle?.power}</span>
                      &h=500",</li>
                
      category      <li className=": "flex justify-between pyКруизер-2">
                ",
      power        <span className="text-gray-600: "0 л.с.",
      year: new Date().getFullYear">Объем(),
      availability: true:</span>
                        <span>1000 куб. см</span>
                      </li>,
      rentCount
                      <li className: 0,="flex justify-between
      description py-2">: "",
      features
                        <span className: [],
      color="text-gray-: "600">КоличЧерество цилиндный",
      engineров:</span>: "4
                        <span>-т4</span>актный",
      
                      </li>
                      <liweight: " className="flex justify-between py-2">200 кг",
                        <span className="text-gray
      fuelCap-600">Системаacity: "15 охлаждения:</span>
                         л",
      <span>maxSpeed: "200Жидкостная км/ч</span>
                      </li>"
    };
    
                    </ul>
    setCurrent
                  </div>
                  
                  <div className="bg-gray-Motorcycle(new50 p-4Motorcycle);
    setFormData({
      ...newMotorcycle, rounded-md"> 
      description
                    <h: "4 className="fontОпис-medium mb-4ание мотоц flex items-centerикла..."">
                      
    });
    <Icon name="CsetImagePreview(newMotog" className="mrorcycle.image);-2 h-
    setIsEdit5 w-5DialogOpen(true text-primary");
  }; />
                      

  // ОбновХодовая частьление форм
                    </hы4>
                    
  const update<ul className="space-y-2 divide-y divide-FormField = (field: stringgray-200">, value: any)
                      <li className => {
    set="flex justify-betweenFormData( py-2">prev => ({ ...prev,
                        <span className [field]: value }="text-gray-));
  };600">Прив

  // Обод:</span>
                        <span>работчик просЦмотра бепь</span>ронирования
  
                      </liconst handleViewBooking>
                       = (booking: Book<li className="flex justifyingProps) => {-between py-2">
                        
    setCurrentBook<span className="text-ing(booking);gray-600">
    setIsViewBookПередниеingDialogOpen( тормоза:true);
  };</span>
                        <span>Д
  
  //исковые</span Обработчик прос>
                      мотра польз</li>
                      ователя
  const<li className="flex handleViewUser = ( justify-between py-user: UserProps)2">
                         => {
    set<span className="textCurrentUser(user);-gray-600">
    setIsViewЗадние тормUserDialogOpen(оза:</span>true);
  };
                        <span

  // Об>Дисковновление статуса бые</span>ронирования
  
                      </li>const updateBookingStatus
                      <li = (i className="flex justify-d: number, status:between py-2">
                        <span BookingProps className="text-gray-600">Перед['status']) => {няя подве
    const updatedBookска:</span>
                        <span>ings = bookings.Телескопическmap(booking => ая вилка
      booking.i</span>
                      d === id ? { ...</li>
                booking, status } :      <li className=" booking
    );flex justify-between py
    setBookings(-2">
                updatedBookings);        <span className="
    
    iftext-gray-600 (currentBooking && currentBook">Задняяing.id === i подвеска:</span>
                        d) {
      set<span>МаCurrentBooking({ ...ятниковая сcurrentBooking, status моноамортиз });
    }атором</span>
    
    toast({
                      </li
      title: ">
                    Статус об</ul>
                  новлен",</div>
                
      description: `  
                  Статус бронир<div className="bg-ования №gray-50 p${id} изменен на "${status}"`,
    });
    
    // В реальном приложении-4 rounded- здесь будетmd">
                    <h4 className="font-medium mb-4 flex items-center">
                      <Icon name=" API запросRuler
  " className="mr-};
  
  //2 h-5 w-5  Обновление статуtext-primary" />са пользователя
                      Разм
  const updateUserеры и массаStatus = (id:
                    </h number, status: User4>
                    Props['status<ul className="space']) => {
    -y-2 const updatedUsers =divide-y divide- users.map(usergray-200"> => 
      user
                      <li className.id === id ?="flex justify-between { ...user, status py-2"> } : user
    
                        <span className);
    setUsers="text-gray-(updatedUsers);600">Длина
    
    if:</span>
                         (currentUser && current<span>User.id === id) {
      setCurrentUser({ ...current2100 мм</spanUser, status });>
                      
    }
    </li>
                      
    toast({
      <li className="flextitle: "Стат justify-between py-ус пользователя обнов2">
                        <span className="textлен",
      -gray-600">description: `СтатШирина:ус пользователя</span>
                        <span>800 ID: мм</span${id} измен>
                      ен на "${status}"</li>
                      `,
    });<li className="flex
    
    // В justify-between py- реальном прилож2">
                        ении здесь буд<span className="textет API запрос-gray-600">
  };

  Высота:</span// Ф>
                        ильтрация б<span>1150ронирований по стат мм</spanусу
  const>
                       filt</li>
                      eredBookings = book<li className="flexings.filter(booking justify-between py- => {2">
                        
    if<span className="text (filterStatus === "-gray-600">all") return true;Колес
    return booking.ная база:</span>status === filterStatus;
  });
                        <span
  
  //>1450 Фильтрация мм</span пользователей по>
                       статусу
  </li>
                      const filteredUsers =<li className="flex justify-between py- users.filter(user2">
                         => {
    if<span className="text (userStatusFilter === "all-gray-600">") return true;С
    return user.statusухая масса: === userStatusFilter;</span>
                        
  });<span>210
  
  // кг</span Фильтрация>
                       мотоцикл</li>
                    ов по на</ul>
                личию и  </div> категории
  const
                  
                   filteredMotorcycles<div className="bg = motorcyclesList-gray-50 .filter(motorcycle =>p-4 rounde {
    //d-md">
                 Ф    <h4 className="font-mediumильтр mb-4 flex по доступности items-center">
    const
                      <Icon name match="Fuel" className="mr-esAvailability =2 h-5 
      availability w-5 Filter === "alltext-primary" />" || 
      
                      Пр(availabilityFilter === "очие характеристики
                available" && motorcycle.    </h4>availability) ||
      
                    <ul(availabilityFilter className="space-y === "unavailable"-2 divide- && !motorcycle.availabilityy divide-gray-);
    
    200">
                      // Фильт<li className="flexр по категории justify-between py-2">
                        <span className="text
    const matchesCategory-gray-600"> = 
      categoryFilter === "all" || 
      motorcycleЕмкость б.category === categoryFilterака:</span>
                ;
    
            <span>18// Фильтр по поис л</span>ковому запросу
                      </li
    const matches>
                      Search = 
      <li className="flex justifysearchTerm === "" || 
      motorcycle-between py-2.name.toLowerCase().">
                        includes(searchTerm<span className="text-.toLowerCase()) ||gray-600">
      motorcycle.categoryРасход топлива:.toLowerCase().includes(</span>
                        searchTerm.toLowerCase<span>5.());
    
    return2 л/100  matchesAvailabilityкм</span> && matchesCategory &&
                      </li> matchesSearch;
                      <li
  });

  // className="flex justify- Форbetween py-2">матирование да
                        <spanты
  const format className="text-grayDate = (date-600">МаксString: string) =>имальная скорость:</span> {
    return
                        <span> new Date(dateString).toLocaleDateString250 км/ч('ru-RU',</span>
                 {
      day:      </li> '2-digit',
                      <li className
      month: '="flex justify-between2-digit', py-2">
      year: '
                        <span classNamenumeric'
    });="text-gray-
  };

  600">Разг// Еслион  п0-100 кмользователь не а/ч:</spanутентифицир>
                        ован, показ<span>3ываем фор.5му входа
  if (! сisAuthenticated) {</span>
                
    return (      </li>
      <div className="
                      <li className="flex justify-between py-flex flex2">
                        -col min<span className="text-h-screen">-gray-600">
        <Header />
        Годовой пробег
        <main className=":</span>
                flex-grow        <span>& flex itemslt; 5-center justify-center000 км</span>
                       bg-gray-50</li>
                    ">
          <Car</ul>
                d className="w-[  </div>400px] shadow
                </div>-lg
              </div>">
            <Car
            </TabsContentdHeader className="space>
            
            -y<TabsContent value="requirements" className="-1">mt-6">
              <div
              <div className=" className="flexbg-white rounded- items-center justify-lg shadow-sm p-6">
                center mb-2<h3 className">
                <div="text-xl font className="h-semibold mb-4">Треб-12 w-12 ования к арендатору</hbg-primary3>
                /10 flex items
                <div className="-center justify-centergrid grid-cols- rounded-full">1 md:gri
                  <Icond-cols-2  name="Shgap-6">ieldCheck" className
                  <div className="bg-gray-="h-650 p-5 w-6  rounded-lg">text-primary" />
                    <h
                </div>4 className="font
              -medium mb-4</div>
               flex items-center">
                      <CardTitle className<Icon name="File="text-2Check" className="mr-2 h-5xl text-center">В w-5 ход в админtext-primary" />
                      Необ-ходимые документыпанель</CardTitle
                    </h>
              4>
                    <CardDescription<ul className="space className="text-center-y-3">
                Введите уч">
                      <liетные className="flex items- данные администstart">
                        ратора для<Icon name="CheckCircle доступа к" className="h- панели управления5 w-5
              </CardDescription> text-green
            </CardHeader-500 mr->
            2 flex-shrink-<CardContent>0 
              <formmt-0 onSubmit={handle.5" />Login} className="space
                        <span>-y-4">Паспорт
                {loginError && ( гражданина РФ
                  <Alert</span>
                      </li> variant="destructive">
                      <li
                    <Icon className="flex items- name="Alertstart">
                        Circle" className="<Icon name="CheckCircle" className="h-4h-5 w w-4"-5 text- />
                    green-500 mr-2 flex-<AlertTitle>Ошshrink-0 ибка входаmt-0.5</AlertTitle>
                " />
                            <AlertDescription>{<span>ВодloginError}</AlertDescriptionительское удосто>
                  верение катег</Alert>
                )}ории "
                
                <div classNameA"="space-y-2">
                   со стажем от<Label 2 htmlFor="username"> лет</spanИмя польз>
                      </li>
                      ователя</Label><li className="flex
                  <div items-start"> className="relative">
                        <Icon name
                    <Icon="CheckCircle" name="User" className className="h-5="absolute left-3 top-1 w-5 /2 transformtext-green-500 -translate-y- mr-2 1/2 hflex-shrink--40 mt-0 w-4 .5" />text-gray-400
                        <span>" />
                    Второ<Inputй документ,
                      id="username удостоверяющ"
                      typeий личность (заг="text"
                ранпаспорт, ИНН,      value={username} СНИЛС)</span
                      onChange={(e) => setUsername(e.target.value)}
                      >
                      className="pl-10"</li>
                    
                      placeholder="</ul>
                  </div>admin"
                      
                  
                  required
                    /><div className="bg
                  </div-gray-50 >
                p-5 rounde</div>
                d-lg">
                
                <div className="    <h4 space-y-2className="font-medium">
                   mb-4 flex items-center"><div className="flex justify-
                      <Icon name="ShieldCheck" className="between items-center">
                mr-2 h    <Label htmlFor-5 w-="password">П5 text-primaryароль</Label>" />
                      
                    Требования и ограничения
                    </h4><a href="#" className="
                    <ultext-xs text-primary hover:underline">
                      Забыли пароль? className="space-y
                    </a>-3">
                
                  </div      <li className=">
                  flex items-start"><div className="relative">
                        <Icon
                    <Icon name="CheckCircle name="Lock" className" className="h-="absolute left-35 w-5 top-1/ text-green-2 transform -translate500 mr-2-y-1/ flex-shrink2 h-4 w-4 -0 mt-text-gray-4000.5" />" />
                    
                        <span<Input
                      >Возрастid="password" от 21 года</span>
                      type="passwor
                      </lid"
                      value>
                      ={password}
                <li className="flex items      onChange={(e)-start">
                 => setPassword(e        <Icon name=".target.value)}CheckCircle" className
                      className="="h-5 pl-10"w-5 text
                      placeholder="••-green-500 ••••••"mr-2 flex
                      required-shrink-0
                    />
                 mt-0.  </div>5" />
                
                </div>        <span>
                
                <divСтаж вожд className="flex items-ения мотоциклаcenter space-x-2"> от 2 лет
                  </span>
                <Checkbox 
                    id="remember" 
                    checked={rememberMe}
                    on      </li>CheckedChange={(checke
                      <li className="flex items-start">
                        <Icon name="XCircle" className="d) => setRememberh-5 wMe(checked as-5 text- boolean)}
                  red-500 mr/>
                  <label-2 flex-shrink-0 
                    htmlFor="mt-0.5remember"
                    " />
                        className="text-sm<span>Зап fontрет на вы-medium leadingезд за п-none peerределы реги-disabled:cursor-она безnot-allowed peer- предварительного согdisabled:opacityласования</span>-70"
                  >
                    
                      </liЗапомнить>
                     меня
                  </ul>
                </label>
                  </div>
                  
                  </div>
                <div className="bg
                <Button-gray-50  type="submit" className="p-5 rounded-lg">
                w-full"    <h4  disabled={isLoading}>className="font-medium
                  { mb-4 flexisLoading ? ( items-center">
                    <>
                      <Icon name
                      <Icon="Wallet name="Loader2" className="mr-" className="mr-2 h-52 h-4 w-5  w-4 text-primary" />animate-spin" />
                      Фин
                      Вансовые условия
                    </hход...
                    </>4>
                    <ul className="space
                  ) :-y-3"> (
                    <>
                      <li
                      <Icon className="flex items- name="Logstart">
                        In" className="mr<Icon name="Info" className="h--2 h-5 w-54 w-4 text-blue-" />
                      500 mr-2Вой flex-shrinkти
                    -0 mt-</>
                  )}
                </Button>0.5" />
              </form>
                        <span
            </CardContent>
            >Зал<CardFooter classNameог в размере ="flex flex-col">
              <p className="text-xs text-center text20 000 -gray-500 ₽ (возвращается при возврате мотоцикла в исходmt-2">
                Дляном состоянии демо)</span>
                      </li>
                      <li className="flex items-start-версии используй">
                        те:<Icon name="Info" <br />
                 className="h-5Лог w-5 text-blue-500 mr-2 flex-shrink-0 mt-0ин: <span.5" /> className="font
                        <span>-medium">admin</span>, Пароль: <span className="font-medium">admin123Пред</span>
              оплата </p>
            100% ст</CardFooter>оимости а
          </Card>ренды</span>
        </main>
                      </li
      </div>>
                      
    );
  }<li className="flex items

  return-start">
                 (
    <div        <Icon name=" className="flex flex-Info" className="hcol min-h--5 w-screen">
      5 text-blue<Header />
      -500 mr-
      <main className="2 flex-shrflex-grow bgink-0 mt-gray-50 -0.5"pb-12 />
                        ">
        {<span>Страховка:/* За ОСАГО (головок панвключена в стоимели сость)</span>
                      </li> градиентом */}
                    </ul
        <div className>
                  ="bg</div>
                  -gradient-to-
                  <divr from-primary/ className="bg-gray-50 p-90 to-primary text5 rounded-lg-white py">
                    -6<h4 className=" mbfont-medium mb--8 shadow4 flex items--mcenter">
                      d"><Icon name="H
          <div classNameelpCircle" className="container mx-auto="mr-2  px-4">h-5 w
            <div-5 text- className="flex flexprimary" />
                -col m      Дополнd:flex-row justify-between items-startительная информация
                     md:items-center</h4>">
              <div
                    <ul className>
                <h1="space-y- className="text-3">
                      <li className="flex3xl font-bold"> items-start">Административ
                        <Icon nameная панель</h="Alert1>
                Triangle" className="h<p className="text-5 w--white5 text-amber/80-500 mr- mt-12 flex-shr">Управлениеink-0 mt-0.5" сайтом про />
                        <span>ката мотоциклОтветственность за штов</p>рафы
              </div> ГИБДД л
              <div className="ежит на арендflex items-center mt-4аторе</span md:mt->
                      0 </li>
                      space-x-4<li className="flex">
                 items-start">
                        <Icon name<DropdownMenu="Truck" className="h->
                  5 w-5<DropdownMenuTrig text-grayger as-500 mr-Child>
                    2 flex-shr<Button variant="ghostink-0 mt" size="sm"-0.5" className="text-white />
                        <span>Возмож hover:bg-whiteна до/20ставка мото">
                      цикла (<div className="flex items-оплачивается отcenter">
                        дельно)</span>
                      <div className="w</li>
                      -8 h-<li className="flex8 rounded-full items-start"> bg-white/20
                        <Icon name flex items-center justify-center mr="Clock" className="h--2">
                5 w-5          <Icon name=" text-gray-User500 mr-2" className="h flex-shrink-0 mt--4 w-4"0.5" /> />
                        
                        <span</div>
                        >Время<span className="font выдачи/-medium mrвозврата: с-1">admin 9</span>
                :00 до 21:00</span>
                      </li>
                    </ul>
                  </div>
                        <Icon name="ChevronDown"</div>
                 className="h-4 w-4" />
                      </div>
                    </Button>
                
                <div className="mt-6   </DropdownMenuTrigger>
                  p-4<DropdownMenuContent align="end" border border className="w-56-amber">
                    -200<DropdownMenu bg-amber-50 Label>Аккаrounded-lg">унт админист
                  <divратора</Drop className="flex items-downMenuLabel>
                    <Dropstart">
                    downMenu<Icon name="AlertSeparator />
                    <DropTriangle" className="hdownMenuItem>-5 w-
                      <Icon5 text-amber name="User" className-500 mr-="mr2 flex-shr-2 h-ink-0 mt4 w-4-0.5"" />
                       />
                    <span>Проф<p className="text-amberиль</span>
                    -800 text</DropdownMenuItem>
                    <Drop-sm">
                      downMenuItem>
                      <Icon name="<span className="font-semSettings" className="mr-ibold">Важ2 h-4 w-4"но:</span> При />
                      <span>Настрой бронировании мки</span>отоцикла
                    </Drop необходимо предdownMenuItem>
                оставить о    <DropdownMenuItem>
                      ригиналы вс<Icon name="Bellех документов." className="mr-2 h-4 
                      В w-4" случае пов />
                      реждения тех<span>Уведники или номления</span>арушения правил
                      <Badge className="ml аренды зал-auto bg-primaryог может быть удержан text-white">5</Badge>
                 полностью или    </Dropdown частично.
                MenuItem>
                        </p><DropdownMenu
                  </div>Separator />
                </div>
                    <Drop
              </div>downMenuItem onClick
            </Tabs={handleLogout}>Content>
            
                      <Icon name
            <TabsContent="LogOut" className value="reviews" className="mr-2 ="mt-6">h-4 w
              <div className-4" />="bg-white rounde
                      <span>d-lg shadow-smВыйти p-6"></span>
                    
                <div className="flex</DropdownMenuItem>
                   flex-col m</DropdownMenuContentd:flex-row justify>
                -between items-start</DropdownMenu> md:items-center
              </div>
            </div> mb-6">
                
          </div>  <h3 
        </div>className="text-xl
        
        <div className="container mx font-semibol-auto px-4d">Отзывы">
          <div className="flex flex-col lg:flex-row gap клиентов</h3>
                  <Button onClick={() => setIs-8">ReviewDial
            {/*ogOpen(true) Боковая навигация */}}>
                    
            <aside<Icon name="Message className="lg:w-64Square" className="mr mb-6-2 h- lg:mb-4 w-4"0">
              <Card className="overflow />
                    -hidden borderОставить отзыв
                  </Button>
                -none shadow-sm</div>
                 sticky top-24
                {">
                <div className="p-4/* Общ bg-white">
                  <navая стат className="space-yистика от-1зывов */}">
                    
                <div className="bg-gray-50 <Button
                      variantp-4 rounded-={activeTab === "dashboard" ? "defaultlg mb" : "ghost"}-6">
                
                      className  <div className="={`flex flex-col md:flexw-full justify-row items-center-start ${activeTab === "dashboard" gap-6 ? """>
                     : "hover:bg-gray<div className="text-100"}`}-center">
                      onClick={()
                      <div => setActiveTab(" className="text-4dashboard")}
                xl font-bold text    >
                      -primary mb-1<Icon name="">{averLayoutDashboard" classNameageRating}</div="mr>
                      -2 h-<div className="flex5 w-5" justify-center">
                 />
                              {renderStДашборд
                ars(parse    </Button>Float(averageR
                    
                    ating))}
                <Button
                            </div>variant={activeTab ===
                      <p "motorc className="text-smycles" ? "default text-gray-600" : "ghost"} mt-1
                      className={`w-full justify">{reviews.length}-start ${activeTab отзывов === "motorcycles"</p>
                     ? "" : "hover</div>
                :bg-gray-100"}`}    
                      onClick={() =>
                    <div className setActiveTab("motorc="flex-1 ycles")}
                space-y-2    >
                      ">
                      <Icon name="<div className="flexBike" className="mr- items-center gap-2 h-52"> w-5"
                        <div />
                       className="flex">Мотоцикл
                          {ы
                      <Badge className="ml-[1, 2,auto bg-primary/ 3, 410 text-primary, 5].map">{total(starMotorcycles}</Badge => (
                            >
                    <Icon key={star</Button>
                    } name="Star"
                    <Button className="
                      variant={h-4activeTab === "book w-4 ings" ? "defaulttext-yellow-400" : "ghost"}
                      className={ fill-yellow`w-full justify-400" />-start ${activeTab
                          ))} === "bookings"
                        </div> ? "" : "hover:bg-gray-
                        <div className="relative100"}`}
                      onClick={() => flex-1  setActiveTab("bookings")}
                    >
                      h-2 bg-<Icon name="CalendarCheck" className="gray-200 rounded-full overflowmr-2 h-hidden">
                -5 w-          <div 5" />
                
                            className="      Бabsolute topронирования
                -0 left-      {0 h-full bg-yellow-400 rounded-full"
                            pendingBookings > style={{ width: `0 && (
                        <Badge className="ml-auto bg${reviews-amber-500 text-.filterwhite">{pending(r => r.Bookings}</Badge>rating === 5).
                      )}length / reviews.length
                    </Button> * 100}%
                    
                ` }}
                              <Button
                ></div>      variant={activeTab
                        </div> === "users" ?
                         "default" : "<spanghost"}
                       className="text-smclassName={`w-">{reviews.filter(full justify-start ${r => r.ratingactiveTab === "users === 5).length" ? "" : "}</span>
                      hover:bg-gray</div>
                -100"}`}      
                      
                      onClick={()<div className="flex items => setActiveTab("-center gap-2users")}
                ">
                            >
                      <div className="flex"><Icon name="Users" className="mr-
                          {[2 h-51, 2, w-5" 3, 4 />
                      ].map(star =>Пользователи (
                            
                    </Button>
                <Icon key={star}    
                     name="Star" className<Button
                      variant="h-4 ={activeTab === "w-4 text-yellow-400 analytics" ? "default"fill-yellow-400 : "ghost"}" />
                          ))}
                          
                      className={`<Icon name="Star"w-full justify- className="h-4start ${activeTab === w-4  "analytics" ? ""text-gray : "hover:bg-300-gray-100"}`}
                      " />
                        onClick={() => setActiveTab("analytics")}</div>
                        
                    ><div className="relative
                      <Icon name flex-1 h="-2 bg-BarChart3" className="mr-2 h-5 w-5" />
                      Аналитикаgray-200 rounded-full overflow-hidden">
                          <div 
                            className="absolute top-0 left-0
                    </Button> h-full bg
                    
                -yellow-400     <Button
                rounded-full"      variant={activeTab
                            style={{ width === "settings" ? "default" : ": `${reviews.ghost"}
                      filter(r => rclassName={`w-.rating === 4full justify-start ${).length / reviews.activeTab === "settingslength * 100}" ? "" : "%` }}
                          ></div>hover:bg-gray
                        </div-100"}`}>
                        
                      onClick={()<span className="text- => setActiveTab("sm">{reviews.settings")}
                filter(r => r    >
                      .rating === 4<Icon name="Settings).length}</span>" className="mr-
                      </div2 h-5>
                       w-5"
                      <div className />
                      ="flex items-centerНастройки
                 gap-2">    </Button>
                        <div className
                  </nav>="flex">
                
                </div>          {[1,
                
                 2, 3].map(star => (
                            <Separator />
                
                <Icon key={star}<div className="p name="Star" className-4 bg-="h-4 w-4 textgray-50">
                -yellow-400   <div className="fill-yellow-400" />
                          text-sm))}
                           font-medium text-{[4gray-500 mb, 5].map-2">(star => (
                            <Icon keyБыстрые действ={star} name="ия</div>
                  <div classNameStar" className="h="space-y--4 w-4 text-gray2">
                    -300" /><Button 
                          ))}
                      variant="
                        </div>outline"
                        <div 
                      size className="relative flex-="sm" 1 h-2
                      className="w bg-gray--full justify200 rounded-full-start" overflow-hidden">
                      onClick={
                          <div 
                            className="handleAddNew}
                    absolute top-0 >
                      left-0 h<Icon name="P-full bg-yellowlusCircle" className-400 rounded-="mr-2 full"
                            h-4 wstyle={{ width: `-4" />${reviews.filter(
                      Добавr => r.ratingить м === 3).lengthотоцикл / reviews.length *
                    </Button 100}%`>
                     }}
                          <Button 
                      ></div>
                variant="outline"         </div>
                      size="
                        <span classNamesm" 
                ="text-sm"      className="w->{reviews.filter(full justify-start"r => r.rating
                      onClick={() === 3).length => {}</span>
                
                        setActive      </div>Tab("book
                      
                      ings");
                        <div className="flexsetFilter items-center gap-Status("pending2">
                        ");
                      }}
                    ><div className="flex
                      <Icon name">
                          {[1, 2="Clip].map(star => (
                            boardCheck" className="<Icon key={star}mr-2 h-4 w-4" />
                      Проверить бронирования
                     name="Star" className</Button>
                  ="h-4 w-4 text-yellow-400 fill-yellow-400" />
                          </div>
                ))}
                          </div>
              {[3, </Card>
              4, 5].
              {map(star => (
                            <Icon/* Кар key={star} nameточка="Star" className="h-4 w-4 text-gray-300" /> системной информации */}
                          ))}
              <Card className="
                        </div>
                        mt-4<div className="relative flex border-none shadow-sm-1 h-2 bg-gray overflow-hidden">
                -200 rounded-<CardHeaderfull overflow-hidden"> className="bg
                          <div 
                            className="absolute top-0-white pb-2 left-0 ">
                  h-full bg-yellow-400 rounde<CardTitle className="text-d-full"
                            style={{ width: `${reviews.filter(r => r.rating === 2).sm font-medium">length / reviews.lengthИнформация о системе</CardTitle> * 100}%
                </CardHeader` }}
                          >
                <CardContent className="pt-2 ></div>pb-4">
                        </div>
                        <span
                  <div className className="text-sm="text-xs">{reviews.filter(r => r. space-y-2 rating === 2).length}</span>text-gray-500">
                      </div>
                    <div
                      
                      <div className=" className="flex justifyflex items-center gap-between">
                -2">
                      <span        <div className=">Версflex">
                          ия:<Icon name="Star"</span>
                       className="h-4<span>1. w-4 text-yellow-4002.3</span> fill-yellow-
                    </div400" />
                >
                    <div className="flex justify          {[2-between">
                , 3,       <span>4, 5].Последнее обновmap(star => (ление:</span>
                            <Icon
                      <span> key={star} name="Star" className="h-4 w25.04.2025-4 text-</span>
                gray-300" />    </div>
                          ))}
                    <div className
                        </div="flex justify-between>
                        ">
                      <div className="relative flex<span>Статус-1 h- системы:</span>2 bg-gray
                      <span-200 rounded- className="text-greenfull overflow-hidden">-500">Актив
                          <divна</span> 
                            className
                    </div>="absolute top-0
                  </div left-0 >
                </Carh-full bg-dContent>
              yellow-400 rounde</Card>
            d-full"
                </aside>
                        style={{ width:
            {/* Основ `${reviews.filterной контент */}(r => r.rating === 1).
            <div className="length / reviews.lengthflex-1 * 100}%">
              {/*` }}
                           Д></div>ашборд */}
                        </div>
              {activeTab
                        <span === "dashboard" && className="text-sm (
                <div">{reviews.filter(r => r. className="spacerating === 1).-y-6length}</span>">
                  
                      </div>
                    </div<h2 className="text>
                  </div>
                -2xl font-bold mb</div>
                -4">Об
                {/* Список отзывов */зор системы</h2>}
                <div
                   className="space
                  {-y-4">
                  {reviews/* Ключ.map((евые метрикиreview) */}
                   => (
                    <div className="gri<div key={reviewd grid-cols-1.id} className=" md:grid-cols-2 xl:grid-cols-border rounded-lg p-4 hover4 gap-4">
                    <Car:shadow-smd className="border transition-shadow-none shadow-sm">
                      <div className="flex items hover:shadow-md transition-center mb-shadow">
                      <CardHeader className-2">
                ="flex        <div className="h-10 w- flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">10 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                          <Icon name="UserБронирования</Car" className="h-dTitle>
                        6 w-6<div className="p text-gray--2 bg500" />
                        -blue</div>
                -100 rounded-        <div>full">
                          
                          <h<Icon name="Calendar4 className="font" className="h--medium">{review.userName4 w-4 }</h4>text-blue-500
                          <div" />
                        </div>
                      </CardHeader> className="flex">
                      <Car
                            {renderStars(review.rating)}
                dContent>
                        <div          </div> className="text-2
                        </div>xl font-bold"
                        >{totalBookings}<span className="ml-auto</div>
                         text-sm text-<div className="flexgray-500 items-center mt">
                          {-1">
                          new Date(review.date).toLocaleDateString<span className="text-('ru-RUxs text-gray-500 mr-2">')}
                        </span>
                      </div>
                За месяц</span>      <p className="
                          <Badgetext-gray-700 className="bg-green">{review.comment}-100 text-</p>
                    green-700</div>
                  ))}
                 text-xs"></div>
              
                            <Icon</div>
            </TabsContent> name="TrendingUp" className
          ="h-3 </Tabs>w-3 mr
        </section-1" />>
        
        
                            +12{/* Р%
                          </Badge>
                        екомендации */}</div>
                
        <section className        <div className="mt="bg-gray-100-3">
                          <M py-12">
          <diviniChart data className="container={[ mx-auto px8, 12-4">
            , 10<h2 className, 14="text-2xl, 16 font-bold mb-8">Вам также может понравиться, 12, </h2>15]} />
                        </div>
                      </CardContent>
                    </Car
            
            d>
                    <Carousel className
                    <Card className="w="border-none shadow-full">-sm hover:shadow
              <Car-md transition-shadowouselContent">
                      >
                {<CardHeader className="flexmotorcycles flex-row items-
                  .filter(center justify-between pbm => m.i-2">
                        <CardTitle className="text-sm font-medium">Выd !== motorcycle!.id)
                ручка</CardTitle  .slice(0>
                        , 4)<div className="p-
                  .map(2 bg-green-100 rounded-m => (
                    full">
                          <Car<Icon name="DouselItem key={ollarSign" classNamem.id}="h-4  className="mw-4 textd:basis-green-500"-1/2 />
                         lg:basis-</div>
                      1/3"></CardHeader>
                      <div
                      <CardContent className="bg>
                        <div className="text--white rounded-lg2xl font-bol overflow-hidden shadowd">{totalRevenue. hover:shadow-md transitiontoLocaleString(-shadow p-4 )} ₽</div>
                        m-1<div className="flex items-center mt-1">
                           h-full flex<span className="text- flex-col">xs text-gray-
                        <div500 mr-2 className="rounde">За месяц</span>
                d-md overflow-hidden mb          <Badge className="-4">
                bg-green-100          <Asp text-green-ectRatio ratio={700 text-xs16/9}>">
                            
                            <img src<Icon name="Tren={m.imagedingUp" className="} alt={m.h-3 wname} className="w-3 mr--full h-full1" />
                 object-cover" />            +23
                          </Asp%
                          ectRatio></Badge>
                        
                        </div></div>
                
                        <h        <div className="3 className="fontmt-3">
                          <Mini-bold text-lgChart data={[25 mb-2">{m000, 35.name}</h3000, 30000>
                        , 40000,<p className="text- 45000, gray-600 mb-240000, 50000]} />
                         text-sm flex</div>
                 items-center">
                          <Icon name      </CardContent>="Tag" className="h-
                    </Card>
                    
                    <Card className="border-none shadow4 w-4-sm hover:shadow mr-1" />
                          {m.category}-md transition-shadow
                        </p>">
                      <CardHeader className="flex flex-row items-
                        <divcenter justify-between pb className="mt-2">
                -auto">
                        <CardTitle className="text-sm font          <div className="-medium">Пflex justify-between items-centerользователи</Car">
                            dTitle>
                        <div className="p<span className="font-2 bg--bold text-primarypurple-100 rounde">{m.priced-full">
                          <Icon name=".toLocaleString(Users" className="h)} ₽-4 w-
                              <span4 text-purple className="text-sm-500" /> text-gray-500
                        </div>">/день</span>
                      </Car
                            </spandHeader>
                      >
                            <CardContent><Button variant="outline
                        <div className" size="sm"="text-2xl asChild>
                              <a href={`/motorcycle/${m.id}` font-bold">{users.length}</div>
                        <div className="flex items-center mt-1">
                          <span}>Под className="text-xsробнее text-gray-500</a>
                             mr-2"></Button>
                          Активных</span></div>
                
                          <Badge        </div> className="bg-green
                      </div>-100 text-
                    </Cargreen-700 textouselItem>-xs">
                
                  ))
                }
                          <span>{</CarouselContentusers.filter(u>
               => u.status === "active").length}<div</span>
                          </Badge>
                 className="hidden        </div> sm:flex">
                        <div className
                <Carou="mt-3">selP
                          <MiniChart data={[10, 15revious />, 18
                <Carou, 22, selNext />
              25, 28</div>
            , 30]} type</Carousel>="bar" />
                        
          </div></div>
                
        </section>      </CardContent>
      </main>
      
      
                    </Card>
                    
                    <Card className<Footer />
      
      ="border-none shadow-sm hover:shadow-md transition-shadow{/* Ди">
                      <CardHeader className="flexалог б flex-row items-ронирования */}center justify-between pb
      <Dialog-2">
                        <CardTitle className open={isBook="text-sm fontingDialogOpen}-medium">М onOpenChange={setIsBookотоциклыingDialogOpen}></CardTitle>
        <DialogContent
                        <div className="p-2  className="smbg-primary:max-w-/10 rounded-full">
                          [600px]<Icon name="Bike">
          <Dialog" className="h-Header>
            4 w-4 text-primary"<DialogTitle>Брон />
                        ирование мото</div>
                      цикла</Dialog</CardHeader>Title>
            
                      <CardContent>
                        <DialogDescription>
              За<div className="text-2xl font-bolполните форму бd">{totalронирования дляMotorcycles}</div>
                         мотоцикла<div className="flex items-center mt-1 {motorcycle?.">
                          name}
            <span className="text-</DialogDescription>
          xs text-gray-</DialogHeader>500 mr-2
          
          <div">Доступно</span>
                          <Badge className="bg-blue-100 text-blue-700 text className="grid gap-xs">
                -6 py-4">
            <div className            <span>{avail="grid grid-colsableMotorcycles}-1 md:</span>
                          grid-cols-2</Badge>
                 gap-4">
              <div        </div>
                        <div className="mt-3"> className="space
                          <div-y-2 className="w">
                <Label-full bg htmlFor="firstName-gray-100 ">Имя rounded-full h-<span className="text-red-500">*2">
                            <div</span></Label>
                <Input 
                              className="
                  id="firstNamebg-primary"
                  value={bookingForm h-2 rounded-Data.firstName}full" 
                
                  onChange={(              style={{ width:e) => handle `${(availableMotorcycles / totalBookingFormChange('Motorcycles) *firstName', e. 100}%`target.value)} }}
                            
                  required
                ></div>
                />
              </div          </div>>
              
                          
              <div className="<div className="flexspace-y-2">
                <Label justify-between mt-1 htmlFor="lastName">Фамилия text-xs text- <span className="textgray-500">-red-500">
                            <span>*</span></LabelНедоступно>
                <Input: {totalMotorcycles
                  id=" - availableMotorclastName"
                  ycles}</span>value={bookingForm
                            <span>Data.lastName}До
                  onChange={(eступно: {avail) => handleBookingableMotorcycles}FormChange('lastName',</span>
                           e.target.value</div>
                )}
                  require        </div>d
                />
              
                      </CardContent</div>
            >
                    </div>
            </Card>
                  
            <div className</div>
                ="grid grid-cols-1 md:grid-  
                  {/*cols-2 gap-4">
               Последние бронирования<div className="space и попул-y-2">
                <Label htmlярные мотоFor="email">Emailциклы */}
                  <div className="gri <span className="textd grid-cols-1-red-500">*</span></Label>
                <Input lg
                  id=":grid-cols-email"
                  2 gaptype="email"-6">
                  value={book
                    <CaringFormData.emaild className="border-none}
                  onChange shadow-sm">={(e) => handle
                      <CarBookingFormChange('dHeader className="flex flex-row items-centeremail', e.target justify-between">.value)}
                
                        <div  required
                />
              </div>>
                          <Car
              
              <div className="space-dTitle>Последние бронy-2">ирования</CardTitle
                <Label htmlFor>
                          ="phone">Телефон <span className="text-red-500">*</span<CardDescription>></Label>
                
                            Нед<Input
                  авние бронирid="phone"ования мотоци
                  type="telклов
                          "
                  value</CardDescription>={bookingFormData
                        </div>.phone}
                
                        <Button  onChange={(e) variant="outline" size => handleBookingForm="sm"Change('phone', e onClick={().target.value)} => setActiveTab("
                  requiredbookings")}>
                />
              
                          </div>
            Все бронирования</div>
            
                        </Button
            <div className=">
                      space-y-2"></CardHeader>
                
              <Label html      <CardContent>For="address
                        <divLine1">Ад className="spaceрес-y-4</Label>
              "><Input
                id="
                          {bookaddressLine1"ings.slice
                value={booking(0, 3FormData.addressLine1}
                onChange={(e) => handleBookingFormChange('addressLine1', e.target.value)}).map((booking)
              />
             => (
                            <div key={booking.id} className="flex items-center gap-4">
                              <div className="</div>
            
            <div classNamew-10="space-y- h-10 2">
              rounded-full bg-<Label>gray-100 flex items-center justify-Выcenter flexб-shrink-0ран">
                                ные<Icon name="User даты а" className="h-ренды 5 w-5<span className="text-red-500">* text-gray-</span></Label>
              {500" />
                              dateRange</div>
                              <div className="flex-1.from min-w-0"> && dateRange.to ? (
                <div className="p-3
                                <div bg-gray- className="flex50 rounded-m justify-between">
                d">
                  <div className="flex                  <p className="text-sm font-medium trunc justify-between textate">{booking.customer-sm">
                    <divName}</p>>
                      <span
                                  <p className="text-xs className="text text-gray-500-gray-500">С:">{format</span>Date(booking.cre {dateRange.fromatedAt)}</p.toLocaleDateString>
                                ('ru-RU</div>
                                ')}
                    <p</div>
                 className="text-sm    <div> text-gray-500
                      <span className="text-gray- truncate"500">По:</span>{booking.motorc> {dateRange.ycleName}</p>to.toLocaleDate
                              String('ru-R</div>
                U')}
                              <Badge    </div>
                                className={
                    <div>
                `${      <span className="
                                  booking.text-gray-500status === "pending"">Д ? "bg-yellowней:</span> {-100 text-yellow-800totalDays}
                " :     </div>
                                  booking
                  </div>.status === "confirme
                </div>d" ? "bg-
              ) : (green-100 text
                <div className-green-800"="p-3  : 
                                bg-amber  booking.status ===-50 border "complete border-amber-200d" ? "bg- rounded-md textblue-100 text--amber-800 blue-800" : 
                                  text-sm">
                "bg-red-100  Выберите даты text-red- аренды в800"
                                 календаре пер}`ед продолжением}
                              > бронирования
                
                                {booking</div>
              .status ===)}
            </div "pending" ? ">
            
            <div className="pОжидает" : 
                                booking.status === "confirmed" ? "Подтверждено" : 
                                booking.status === "-4 bg-gray-completed" ? "50 rounded-md">
              <h4 className="font-medium mb-2">Детали бронированияЗавершено" :</h4> 
                                "
              <div className="Отменspace-y-1ено"}
                              </Badge>
                            </div> text-sm">
                          ))}
                <div className="
                        </div>flex justify
                      </Car-between">dContent>
                    
                  <span</Card>
                    
                    >Мотоц<Card className="border-икл:</span>none shadow-sm">
                  <span
                      <Car className="font-medium"dHeader className="flex flex>{motorcycle?.name}-row items-center</span>
                 justify-between"></div>
                
                        <div>
                          <Car<div className="flex justifydTitle>Популяр-between">
                ные мотоци  <span>клы</CardTitle>
                          Стоимость в<CardDescription>
                            Мото день:</span>
                циклы с на  <span>{ибольшим количmotorcycle?.price.toеством аLocaleString()}ренд
                           ₽</span</CardDescription>>
                </div
                        </div>>
                <div
                        <Button className="flex justify- variant="outline" sizebetween">
                  ="sm" onClick={()<span>Колич => setActiveTab("ество дней:</spanmotorcycles")}>>
                  
                          Все м<span>{totalDaysотоциклы}</span>
                
                        </Button</div>
                >
                      </CardHeader>
                <Separator className="my-2      <CardContent>
                        <div" />
                 className="space-y<div className="flex justify-4">
                          {motorcyc-between fontlesList-bold">
                  <span>Итого
                            .sort((a, b) к оплате:</span => (b.rentCount>
                  <span>{totalPrice.toLocaleString( || 0) - ()} ₽a.rentCount ||</span>
                 0))
                </div>
                          .slice(0</div>
            , 3)</div>
          
                            .map((</div>
          motorcycle) => (
          <Dialog
                              <div keyFooter>
            ={motorcycle.id}<Button variant="outline" onClick={() => setIsBookingDialogOpen(false)}>Отмена</Button className="flex items->
            <Buttoncenter gap-4">
                                <div className="w-14 h-10 rounded bg-gray-100  onClick={handleBookingSubmoverflowit}>-hidden flex-shrink-0">
              <Icon name="
                                  <img 
                                CalendarCheck    src={motorcycle." className="mr-image} 
                                    alt={motorcycle2 h-4.name}  w-4"
                                    className=" />
              Забw-full h-ронировать
            full object-cover"</Button>
          
                                  /></DialogFooter>
                                </div
        </DialogContent>
                                >
      </Dialog<div className="flex->
      1 min-w
      {/*-0">
                 Диалог от                  <div classNameзыва */}="flex justify-between
      <Dialog open">
                                    ={isReviewDial<p className="textogOpen} onOpen-sm font-mediumChange={setIsRe truncate">{motorcycleviewDialogOpen}>.name}</p>
        <DialogContent
                                     className="sm:max<p className="text--w-[500sm fontpx]">
          -medium text-primary<DialogHeader>
            <DialogTitle>">{motorcycle.priceОставить отзыв.toLocaleString(</DialogTitle>
            )} ₽<DialogDescription></p>
                                
              По  </div>делитесь сво
                                  <divим оп className="flexытом использования мотоц justify-between">икла {
                                    motorcycle?.name}
            </DialogDescription><p className="text-xs
          </DialogHeader text-gray-500>
          
          <div className="gri">Категория: {motorcycle.d gap-6 pycategory}</p>-4">
            
                                    <p<div className="space-y-2"> className="text-xs
              <Label> text-gray-500">АВаша оценкаренд: {motorcycle <span className="text.rentCount}</p-red-500">>
                                  *</span></Label</div>
                >
              <div                </div> className="flex">
                                
                {[1<Button 
                , 2,                   variant="ghost3, 4," 
                                 5].map((  size="sm"star) 
                                  className="p-0 h => (
                  -8<button
                    key={star}
                     w-8"type="button"
                                  onClick
                    className="={() => navigatecursor-pointer focus:outline-none"
                    onClick={()(`/motorcycle => {
                      setUser/${motorcycle.id}`)}
                                >
                                  <Icon name="ExternalLink" className="h-4Rating(star); w-4"
                      setRe />
                                viewFormData({...</Button>
                              reviewFormData, rating</div>
                : star});
                            ))}
                    }}
                          </div>>
                    
                      </CardContent<Icon >
                    
                      name="</Card>
                  Star" 
                </div>
                      className={`h  
                  {/* Деят-8 w-8 ельность и${
                        star задачи */} <= userRating 
                  <div className
                          ? "="grid grid-colstext-yellow-400-1 lg: fill-yellow-grid-cols-2400" 
                 gap-6">          : "text-
                    <Cargray-300"d className="border-none
                      }`} shadow-sm"> 
                    />
                      <CardHeader
                  </button>
                ))}>
                        <CardTitle>Недавняя активность</CardTitle>
                      
              </div></CardHeader>
            </div>
            
            <div className="space-y-2">
              <Label html
                      <CardContent>
                        <divFor="comment"> className="relativeВаш отзыв <span className="text-red-500 pl-6">*</span> space-y-6">
                          </Label>
              <div className="absolute<Textarea
                id="comment"
                value top-0 bottom={reviewFormData.-0 left-comment}
                onChange={(e) => setReviewFormData({2.5 w-px...reviewFormData, comment: e.target bg-gray-200.value})}"></div>
                          
                placeholder="Рас
                          скажите о в<div className="relativeашем опыте">
                            <div использования мото className="absoluteцикла..."
                rows left-[-={4}
                required
              />24px] rounde
            </div>d-full bg-blue
          </div>-100 p-
          
          <DialogFooter>
            1">
                              <Button variant="outline<Icon name="Circ" onClick={() => setleCheck" className="IsReviewDialogh-4 wOpen(false)}>Отмена-4 text-</Button>
            blue-500" /><Button onClick={handleRe
                            </divviewSubmit}>>
                            
              <Icon name="<div className="mb-1Send" className="mr-2 h-4">
                              <span w-4" className="font />
              От-medium">править отНовзыв
            ое б</Button>
          ронирование</span</DialogFooter>>
                              
        </DialogContent<span className="text->
      </Dialogxs text-gray->
      500 ml-2
      {/*">2 Диалог с часа назад</span>
                             полноэкранным из</div>
                            ображением */}<p
      <Dialog open={ className="text-smisImage text-gray-600DialogOpen} on">
                              OpenChange={setIsImageDialogOpen}>По
        <DialogContentступило новое бронирование от className="sm:max-w- пользователя Д[80митрий Сvw] max.
                            -h</p>
                          -[90</div>
                vh]          
                          <div className="relative"> p-0 
                            <div className="absolute left-border-none[-24px] rounded-full bg-green bg-black/-100 p-901">
                              ">
          <div<Icon name="User className="relative h-fullCheck" className="h-4 w-4 flex items text-green--center justify-center500" />
                ">
            <Button            </div>
                            <div className 
              variant="ghost="mb-1">" 
              size
                              <span="icon className="font-medium">Новый пользователь</span>
                              <span className="text-xs text-" 
              className="absolute top-2 right-2 text-white bg-blackgray-500 ml/20 hover-2">5:bg-black/40 z часов назад</span>
                -10"
                          </div>onClick={() => setIs
                            <p classNameImageDialogOpen(="text-sm textfalse)}
            >-gray-600">
              <Icon name
                              З="X" className="h-арегистрировался новый польз5 w-5"ователь Ек />
            </Button>
            
            <Carousel className="w-атерина В.
                            </p>
                          </div>
                          
                          <div className="relative">full">
              
                            <div<CarouselContent className="absolute left-[-24px] rounde>
                {d-full bg-yellowallImages.map((image-100 p-1">
                              , index) => (<Icon name="Alert
                  <CarouselItem key={indexTriangle" className="h} className="flex-4 w-4 text-yellow items-center justify-center-500" />">
                    
                            </div><img 
                            <div
                      src={ className="mb-1image} 
                ">
                                    alt={`<span className="font-medium">Воз${motorcycle?.name} -врат м фото ${index + отоцикла1}`} </span>
                
                      className="max              <span className="-h-[80text-xs text-gray-500 mlvh] max-w-full-2">в object-containчера</span>" 
                    
                            </div/>
                  >
                            </CarouselItem><p className="text-
                ))}sm text-gray-
              </Carousel600">
                              Content>
              Требуется про<CarouselPreviousверка className="left мотоцикла-4" />
              <Car BMW S1000RR послеouselNext className=" возвратаright-4" />
                            </p>
            </Carousel
                          </div>
          </div>
                        >
        </Dialog</div>
                Content>
            </CardContent></Dialog>
    
                    </Car</div>
  );d>
                    
};

export default
                    <Card className="border-none shadow MotorcycleDetail-sm">
                ;
</pp      <CardHeader className="flex flex-row-write items-center justify->

<pp-between">
                        write filepath<CardTitle>="src/dataЗадачи на/motorcycles.ts сегодня">
export</CardTitle>
                 interface Motorcycle {        <Button variant
  id: number="ghost;
  name:" size="sm"> string;
  price
                          : number;
  <Icon name="Plus" className="h-image: string;
  4 w-4category: string;
  power" />
                        : string</Button>
                ;
  year:      </CardHeader>
                      <Car number;
  description?:dContent>
                         string;
}<div className="space-y-4

export const">
                           motorcycles: Motorcycle<div className="flex items[] = [
  -center">{
    id:
                             1,
    <Checkbox id="task-name: "1" />
                Har            <labelley-Davidson Fat Boy",
    price
                              htmlFor=": 5task-1"000,
    image
                              className="ml: "-2 text-https://imagessm font-medium leading.unsplash.-none peercom/photo-1-disable558980d:cursor-not-allowed peer-disabled:394-opacity-70"
                            >
                              Подdbb977039твердить бронa2ированияe?ixlib=rb-4.0.3 (2)
                            &auto</label>
                            =format&fit=<Badge className="mlcrop&w=1-auto bg-red-100 text-200&hred-700">=800",
    category: "Срочно</BadgeКру>
                          изер</div>
                          ",
    power:
                          <div className "160 л.с.",="flex items-center
    year: ">
                            <Checkbox id="task-2" />
                            <label
                              htmlFor="2023,
    task-2"description: "Легендарный круизер с непревзойденным стилем и м
                              className="ml-2 text-ощностью. Идеаленsm font-medium leading для город-none peer-disabled:cursor-not-ских поездок иallowed peer-disabled: длительных путешopacity-70"ествий."
  
                            >
                },
  {              Об
    id: 2новить ц,
    name:ены на мотоциклы
                 "BMW R 1            </label>250 GS",
                            
    price: <Badge className="ml-auto bg-yellow4500,
    image-100 text-: "https://imagesyellow-700">.unsplash.com/photo-1Средний</Badge>
                          571646</div>
                          
                          <div className="flex items750134-91-center">
                            <Checkbox id="task-3"d27a50ff defaultChecked />
                            <label
                              htmlFor="taskfa?ixlib=-3"
                rb-4.0              className="ml-.3&auto=2 text-smformat&fit=crop font-medium leading-&w=1200none line-through text&h=800",-gray-500
    category: ""
                            >
                              ПроЭндуро",верить тех
    power: "136 л.с.",ническое состояние
    year:  Honda Africa2022,
     Twin
                            description: "Универ</label>
                          сальный мот</div>
                оцикл для любых дорог и бездорожья. Комфортная посадка и          
                           передовые<div className="flex items-center">
                            <Checkbox id="task-4" />
                            <label
                              htmlFor="task-4 технологии.""
                              className
  },
  ="ml-2 {
    id:text-sm font- 3,
    medium leading-none peername: "-disabled:cursor-Kawasaki Ninja Znot-allowed peer-disabled:opacity-70X-10R","
                            >
    price: 
                              Связаться с клиентом по по4000,
    imageводу возврата: "https://images зал.unsplash.ога
                            com/photo-1</label>
                            <Badge className="ml606420187-auto bg-blue-100 text-477-7blue-700">Низкий</Badge>
                          953cd73</div>
                        dc90</div>
                ?ixlib=      </CardContent>rb-4.0
                    </Car.3&auto=d>
                  format&fit=crop</div>
                &w=1200</div>
              )}&h=800",
              
              {/*
    category: "Спорт Вкладка мбайк",отоциклов
    power: "203 */}
              { л.с.",activeTab === "motorc
    year: ycles" && (
                <div className="2023,
    description:space-y-6"> "Мощный
                  <div спортив className="flexный мотоцикл с аг flex-col smрессивным д:flex-row justifyизайном и перед-between itemsовыми технолог-start smиями. Пред:items-center gapназначен для ск-4">
                    <hорости."
  },
  2 className="text{
    id:-2xl font- 4,
    name: "Ducbold">Управление мотоциati Monster",клами</h2
    price: >
                    3800,
    image: "https://<Button onClick={handleAddNew}>images.unsplash
                      <Icon.com/photo-1610553 name="Plus" className="mr-2 h-556003-94 w-4" />
                      Добавить мотоциклb2ae
                    </Button>
                  8ee</div>
                  
                  <Card className="border-noneee11?ixlib= shadow-sm overflowrb-4.0-hidden">
                .3&auto=    <CardHeader classNameformat&fit=crop="bg&w=1200-white flex flex-col&h=800", md:flex-row md:items-center justify-between gap-4">
                      <div
    category: "Нейкед",
    power: "111 л.с.",
    year: >
                        <Car2022,
    description:dTitle>Список м "Культотоциклов</CardTitle>овый итальянский мот
                        <CardDescriptionоцикл с>
                           характерным дизайВсего {ном и отличной управляемfilteredMotorcycles.остью. Идlength} изеален для города {total."
  },Motorcycles} м
  {
    iотоцикловd: 5,
                        </Car
    name: "dDescription>
                      </div>
                Triumph Bonn      <div className="eville",
    priceflex flex: 3500,
    image: "-col smhttps://images.uns:flex-row gap-3">plash.com/
                        <divphoto-1589637 className="relative987415">
                          -4f7<Icon name="Search" className="absolute left-3a78f top-1/1332 transformf5?ix -translate-y-lib=rb-41/2 h.0.3&-4auto=format&fit w-4 =crop&w=text-gray-4001200&h=800",
    category" />
                          : "Ск<Inputрэмбл 
                            placeholderер",
    power="Поиск: "65 л мотоцикл.с.",
    ов..."year: 2021 
                            className,
    description:="pl-10  "Классический sm:wретро-мот-64"оцикл с
                            value современными технологиями={searchT. Сerm}
                            onChange={(e) =>очетание setSearchTerm(e.target.value)}
                          /> стиля и функци
                        </divональности."
  },
  {>
                        
    id: 6
                        <div,
    name: "Honda CB650R className="flex",
    price: 3200, gap-2
    image: "https://images.unsplash.com/photo-1656">
                          252174653<Select 
                            value={avail-abilityFilter} 
                            onValued9bffda8a2Change={(value) => setAvailabilityFilter(c2?ixlib=value asrb-4.0.3&auto= "all" | "availableformat&fit=crop" | "unavailable&w=1200")}
                          &h=800",>
                            
    category: "<SelectTrigger className="w-40Нейкед",">
                              
    power: "94<SelectValue placeholder=" л.с.",Доступность
    year: " />
                            2022</SelectTrigger,
    description: "Над>
                            ежный японский мотоцикл<SelectContent>
                 с отличной управ              <SelectItem valueляемостью и="all">Все современным дизай мотоциклыном. Иде</SelectItem>ален для нов
                              <SelectItemичков и value="available"> опытных мДоступныеотоциклист</SelectItem>
                ов."
  },              <SelectItem value
  {
    ="unavailable">Недоступныеid: 7,</SelectItem>
                
    name: "Yamaha MT-            </SelectContent>
                          </Select09",
    price:>
                           3600
                          <Select ,
    image:
                            value={ "https://images.categoryFilter} unsplash.com
                            onValueChange/photo-1662={(value) => setC046002120-75ategoryFilter(value)}
                          >a6e
                            <SelectTrigger className="w68d57-40">
                              <SelectValue placeholderec?ixlib="Категория"=rb-4. />
                            0.3&auto</SelectTrigger>=format&fit=
                            <Selectcrop&w=1Content>
                              200&h=800<SelectItem value="all",
    category:">Все категории "Н</SelectItem>ейкед",
                              {categories.
    power: "119map( л.с.",category => (
                
    year:                 <SelectItem key2023,
    ={category}description: "Аг value={category}>рессивный д
                                  {categoryизайн и м}
                                ощный</SelectItem>
                 трехцилинд              ))}
                ровый двигат            </SelectContent>ель. Прев
                          </Selectосходная управля>
                        емость и дин</div>
                      амика."
  </div>
                },
  {    </CardHeader>
    id: 8
                    ,
    name:<CardContent className="p "Indian-0">
                 Scout",
    price      <div: 4200, className="overflow-x
    image: "-auto">
                https://images.uns        <Table>plash.com/
                          <TableHeader>
                            photo-1657117<TableRow>
                099              <TableHea865-3c932d className="w-[80px]">ID</TableHead>
                              <TableHead>a9d97Название</TableHeae8?ixlib=rb-4.0.3&auto=format&fit=d>
                              crop&w=1200&h=800<TableHead>Катег",
    category:ория</TableHead>
                              <Table "Круизер",
    power:Head className="text "100 л.с.",-right">Ц
    year: ена/2021,
    description: "Американдень</TableHead>
                              <TableHead>ская классика с современСтатус</Tableными технологиямиHead>
                              . Комфорт<TableHead>ный иАренд</TableHea стильный мотоd>
                              цикл для дл<TableHead classNameительных по="text-right">ездок."
  Действия</TableHead>
                            }
];</TableRow>

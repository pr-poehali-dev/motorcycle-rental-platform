
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Icon from "@/components/ui/Icon";

export interface MotorcycleProps {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  power: string;
  year: number;
}

const MotorcycleCard = ({ id, name, price, image, category, power, year }: MotorcycleProps) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <div className="aspect-[16/10] overflow-hidden">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover transition-transform hover:scale-105 duration-500" 
        />
      </div>
      <CardHeader>
        <CardTitle className="flex justify-between items-start">
          <span>{name}</span>
          <span className="text-xl font-bold">{price} ₽/день</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-2 text-sm mb-4">
          <div className="flex items-center">
            <Icon name="Tag" className="mr-1 h-4 w-4 text-gray-500" />
            <span>{category}</span>
          </div>
          <div className="flex items-center">
            <Icon name="Zap" className="mr-1 h-4 w-4 text-gray-500" />
            <span>{power}</span>
          </div>
          <div className="flex items-center">
            <Icon name="Calendar" className="mr-1 h-4 w-4 text-gray-500" />
            <span>{year} г.</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" asChild>
          <Link to={`/motorcycle/${id}`}>
            Подробнее
          </Link>
        </Button>
        <Button>
          <Icon name="ShoppingCart" className="mr-2 h-4 w-4" />
          В корзину
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MotorcycleCard;

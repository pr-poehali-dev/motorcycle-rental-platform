
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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

const MotorcycleCard: React.FC<MotorcycleProps> = ({
  id,
  name,
  price,
  image,
  category,
  power,
  year,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <div className="aspect-[4/3] relative overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
        />
        <Badge
          className="absolute top-3 left-3 bg-white/80 text-gray-800 backdrop-blur-sm"
          variant="outline"
        >
          {category}
        </Badge>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-1">{name}</h3>
        <div className="flex gap-2 mb-3">
          <Badge variant="outline" className="bg-gray-50">
            {power}
          </Badge>
          <Badge variant="outline" className="bg-gray-50">
            {year} г.
          </Badge>
        </div>
        <div className="flex justify-between items-center mt-4">
          <div className="font-bold text-xl text-primary">
            {price.toLocaleString()} ₽
            <span className="text-sm text-gray-500">/день</span>
          </div>
          <Button asChild>
            <a href={`/motorcycle/${id}`}>
              <Icon name="Info" className="mr-2 h-4 w-4" />
              Подробнее
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MotorcycleCard;

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  price: string;
  oldPrice?: string;
  rating: number;
  reviews: number;
  badge?: string;
  description: string;
  features: string[];
  inStock: boolean;
}

interface ProductInfoProps {
  product: Product;
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    alert(`Добавлено в корзину: ${product.name} (${quantity} шт.)`);
  };

  return (
    <div>
      {product.badge && (
        <Badge className={`mb-4 ${
          product.badge === 'Хит продаж' ? 'bg-red-500' : 
          product.badge === 'Новинка' ? 'bg-green-500' : 'bg-orange-500'
        }`}>
          {product.badge}
        </Badge>
      )}
      
      <h1 className="text-3xl font-bold text-tool-gray mb-4">{product.name}</h1>
      
      <div className="flex items-center space-x-4 mb-6">
        <div className="flex items-center space-x-1">
          {[...Array(5)].map((_, i) => (
            <Icon 
              key={i} 
              name="Star" 
              size={18} 
              className={i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'} 
            />
          ))}
          <span className="text-sm text-gray-600 ml-2">({product.reviews} отзывов)</span>
        </div>
        <Badge variant="outline" className="text-green-600 border-green-600">В наличии</Badge>
      </div>

      <div className="flex items-center space-x-4 mb-6">
        <span className="text-3xl font-bold text-tool-gray">{product.price} ₽</span>
        {product.oldPrice && (
          <span className="text-xl text-gray-500 line-through">{product.oldPrice} ₽</span>
        )}
      </div>

      <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>

      {/* Quantity and Add to Cart */}
      <div className="flex items-center space-x-4 mb-8">
        <div className="flex items-center border border-gray-300 rounded-lg">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="h-10 px-3"
          >
            <Icon name="Minus" size={16} />
          </Button>
          <span className="px-4 py-2 min-w-[3rem] text-center">{quantity}</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setQuantity(quantity + 1)}
            className="h-10 px-3"
          >
            <Icon name="Plus" size={16} />
          </Button>
        </div>
        <Button 
          onClick={handleAddToCart}
          className="flex-1 bg-tool-blue hover:bg-blue-700 h-12 text-lg"
        >
          <Icon name="ShoppingCart" size={20} className="mr-2" />
          Добавить в корзину
        </Button>
      </div>

      {/* Key Features */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Icon name="CheckCircle" size={20} className="text-green-600 mr-2" />
            Основные особенности
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {product.features.map((feature, index) => (
              <li key={index} className="flex items-center space-x-2">
                <Icon name="Check" size={16} className="text-green-600 flex-shrink-0" />
                <span className="text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductInfo;
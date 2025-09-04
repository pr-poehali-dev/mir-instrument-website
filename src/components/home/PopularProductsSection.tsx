import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  price: string;
  oldPrice?: string | null;
  rating: number;
  reviews: number;
  badge?: string | null;
  image: string;
}

interface PopularProductsSectionProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

const PopularProductsSection = ({ products, onAddToCart }: PopularProductsSectionProps) => {
  const navigate = useNavigate();

  return (
    <section className="py-16 bg-tool-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-3xl font-bold text-tool-gray mb-12 text-center">Популярные товары</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-all duration-200 bg-white cursor-pointer">
              <div 
                className="aspect-square bg-gray-100 relative overflow-hidden"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                {product.badge && (
                  <Badge 
                    className={`absolute top-3 left-3 z-10 ${
                      product.badge === 'Хит продаж' ? 'bg-red-500' : 
                      product.badge === 'Новинка' ? 'bg-green-500' : 'bg-orange-500'
                    }`}
                  >
                    {product.badge}
                  </Badge>
                )}
                <img 
                  src={
                    product.id === 1 ? 'https://cdn.poehali.dev/files/3b20f03f-7167-4c9e-aa43-ff159b3d8ab0.png' :
                    product.id === 2 ? 'https://cdn.poehali.dev/files/92b49adc-abed-4f59-9a70-bb3708346eb0.png' :
                    product.id === 3 ? 'https://cdn.poehali.dev/files/88edef3d-943a-4f42-b740-5ffdec0e004b.png' :
                    'https://cdn.poehali.dev/files/de53c7a5-2f2b-4b79-b551-8c5b2973c5bf.png'
                  }
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                />
              </div>
              <CardContent className="p-4">
                <h4 
                  className="font-semibold text-tool-gray mb-2 line-clamp-2 h-12 cursor-pointer hover:text-tool-blue transition-colors"
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  {product.name}
                </h4>
                <div className="flex items-center space-x-1 mb-3">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Icon 
                        key={i} 
                        name="Star" 
                        size={14} 
                        className={i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'} 
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">({product.reviews})</span>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-xl font-bold text-tool-gray">{product.price} ₽</span>
                    {product.oldPrice && (
                      <span className="text-sm text-gray-500 line-through ml-2">{product.oldPrice} ₽</span>
                    )}
                  </div>
                </div>
                <Button 
                  onClick={() => onAddToCart(product)}
                  className="w-full bg-tool-blue hover:bg-blue-700"
                >
                  В корзину
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularProductsSection;
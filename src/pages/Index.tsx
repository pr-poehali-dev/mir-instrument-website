import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import { categories } from '@/data/categories';

interface CartItem {
  id: number;
  name: string;
  price: string;
  image: string;
  quantity: number;
}

const Index = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);



  const popularProducts = [
    {
      id: 1,
      name: 'Дрель-шуруповёрт BOSCH GSR 120-Li',
      price: '12,990',
      oldPrice: '15,990',
      rating: 4.8,
      reviews: 245,
      badge: 'Хит продаж',
      image: '/img/d8bf9f05-0620-4a38-af47-419436884b14.jpg',
    },
    {
      id: 2,
      name: 'Угловая шлифмашина Makita GA9020',
      price: '8,450',
      oldPrice: null,
      rating: 4.7,
      reviews: 189,
      badge: 'Новинка',
      image: '/img/5483ed33-9e5f-4016-b978-6d76a4a6f510.jpg',
    },
    {
      id: 3,
      name: 'Набор ключей гаечных 6-24мм',
      price: '2,890',
      oldPrice: '3,490',
      rating: 4.9,
      reviews: 432,
      badge: 'Скидка',
      image: '/img/97d0eec8-778a-4d7a-a7eb-521e5f50ef54.jpg',
    },
    {
      id: 4,
      name: 'Перфоратор DeWALT D25263K',
      price: '18,990',
      oldPrice: null,
      rating: 4.6,
      reviews: 156,
      badge: null,
      image: '/placeholder.svg',
    },
  ];

  const addToCart = (product: typeof popularProducts[0]) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
      }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity === 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const cartTotal = cart.reduce((total, item) => {
    const price = parseInt(item.price.replace(',', ''));
    return total + (price * item.quantity);
  }, 0);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <img 
                src="https://cdn.poehali.dev/files/84348c6c-4ee0-488e-9635-a3bad0b8e116.png" 
                alt="Мир инструмента" 
                className="h-12 w-auto"
              />
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-tool-gray hover:text-tool-blue transition-colors">Главная</a>
              <a href="/catalog" className="text-tool-gray hover:text-tool-blue transition-colors">Каталог</a>
              <a href="#" className="text-tool-gray hover:text-tool-blue transition-colors">Доставка</a>
              <a href="#about" className="text-tool-gray hover:text-tool-blue transition-colors">О магазине</a>
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Icon name="User" size={20} />
                <span className="hidden md:inline ml-2">Личный кабинет</span>
              </Button>
              <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm" className="relative">
                    <Icon name="ShoppingCart" size={20} />
                    {cartCount > 0 && (
                      <Badge className="absolute -top-2 -right-2 bg-tool-blue text-white text-xs min-w-5 h-5 flex items-center justify-center">
                        {cartCount}
                      </Badge>
                    )}
                    <span className="hidden md:inline ml-2">Корзина</span>
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-full sm:max-w-lg">
                  <SheetHeader>
                    <SheetTitle>Корзина ({cartCount})</SheetTitle>
                  </SheetHeader>
                  <div className="mt-8">
                    {cart.length === 0 ? (
                      <div className="text-center py-8">
                        <Icon name="ShoppingCart" size={48} className="text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500">Корзина пуста</p>
                        <p className="text-sm text-gray-400 mt-2">Добавьте товары для оформления заказа</p>
                      </div>
                    ) : (
                      <>
                        <div className="space-y-4 max-h-96 overflow-y-auto">
                          {cart.map((item) => (
                            <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                              <img 
                                src={item.image} 
                                alt={item.name}
                                className="w-16 h-16 object-cover rounded"
                              />
                              <div className="flex-1 min-w-0">
                                <h4 className="font-medium text-sm">{item.name}</h4>
                                <p className="text-tool-blue font-semibold">{item.price} ₽</p>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="h-8 w-8 p-0"
                                >
                                  <Icon name="Minus" size={14} />
                                </Button>
                                <span className="w-8 text-center text-sm">{item.quantity}</span>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="h-8 w-8 p-0"
                                >
                                  <Icon name="Plus" size={14} />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeFromCart(item.id)}
                                  className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                                >
                                  <Icon name="Trash2" size={14} />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                        <Separator className="my-4" />
                        <div className="space-y-4">
                          <div className="flex justify-between items-center text-lg font-semibold">
                            <span>Итого:</span>
                            <span>{cartTotal.toLocaleString()} ₽</span>
                          </div>
                          <Button className="w-full bg-tool-blue hover:bg-blue-700" size="lg">
                            Оформить заказ
                          </Button>
                          <Button 
                            variant="outline" 
                            className="w-full" 
                            onClick={() => setIsCartOpen(false)}
                          >
                            Продолжить покупки
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-tool-light to-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-tool-gray mb-6">
              Профессиональный инструмент
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Более 400,000 наименований инструментов и оборудования для профессионалов и мастеров
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <Input
                placeholder="Поиск среди 400,000 товаров..."
                className="h-14 text-lg pl-6 pr-16 rounded-xl border-2 border-gray-200 focus:border-tool-blue"
              />
              <Button 
                size="lg" 
                className="absolute right-2 top-2 bg-tool-blue hover:bg-blue-700 rounded-lg"
              >
                <Icon name="Search" size={20} />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-tool-gray mb-12 text-center">Популярные категории</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <a key={index} href="/catalog">
                <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer group border-2 border-gray-100 hover:border-tool-blue">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-tool-light group-hover:bg-tool-blue rounded-lg flex items-center justify-center transition-colors">
                        <Icon name={category.icon as any} size={24} className="text-tool-gray group-hover:text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-tool-gray group-hover:text-tool-blue transition-colors">
                          {category.name}
                        </h4>
                        <p className="text-gray-500 text-sm">{category.tools.length} товаров</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Products */}
      <section className="py-16 bg-tool-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-tool-gray mb-12 text-center">Популярные товары</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-all duration-200 bg-white">
                <div className="aspect-square bg-gray-100 relative overflow-hidden">
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
                      product.id === 1 ? '/img/d8bf9f05-0620-4a38-af47-419436884b14.jpg' :
                      product.id === 2 ? '/img/5483ed33-9e5f-4016-b978-6d76a4a6f510.jpg' :
                      product.id === 3 ? '/img/97d0eec8-778a-4d7a-a7eb-521e5f50ef54.jpg' :
                      '/placeholder.svg'
                    }
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                  />
                </div>
                <CardContent className="p-4">
                  <h4 className="font-semibold text-tool-gray mb-2 line-clamp-2 h-12">
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
                    onClick={() => addToCart(product)}
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

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-tool-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Truck" size={32} className="text-white" />
              </div>
              <h4 className="text-xl font-semibold text-tool-gray mb-2">Быстрая доставка</h4>
              <p className="text-gray-600">Доставим по Москве за 1 день, по России за 2-5 дней</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-tool-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Shield" size={32} className="text-white" />
              </div>
              <h4 className="text-xl font-semibold text-tool-gray mb-2">Гарантия качества</h4>
              <p className="text-gray-600">Официальная гарантия от производителя до 5 лет</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-tool-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Headphones" size={32} className="text-white" />
              </div>
              <h4 className="text-xl font-semibold text-tool-gray mb-2">Поддержка 24/7</h4>
              <p className="text-gray-600">Консультации по выбору и техподдержка круглосуточно</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="about" className="bg-tool-gray text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="mb-4">
                <img 
                  src="https://cdn.poehali.dev/files/84348c6c-4ee0-488e-9635-a3bad0b8e116.png" 
                  alt="Мир инструмента" 
                  className="h-10 w-auto brightness-0 invert"
                />
              </div>
              <p className="text-gray-300">Профессиональный инструмент для мастеров</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Каталог</h4>
              <div className="space-y-2 text-gray-300">
                <p>Электроинструменты</p>
                <p>Ручной инструмент</p>
                <p>Строительные материалы</p>
                <p>Измерительные приборы</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Покупателям</h4>
              <div className="space-y-2 text-gray-300">
                <p>Доставка и оплата</p>
                <p>Возврат товара</p>
                <p>Гарантии</p>
                <p>Контакты</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <div className="space-y-2 text-gray-300">
                <div className="flex items-start space-x-2">
                  <Icon name="Phone" size={16} className="mt-1 flex-shrink-0" />
                  <div>
                    <p>+7 (3462) 22-46-06</p>
                    <p>+7 (3462) 22-90-36</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <Icon name="MapPin" size={16} className="mt-1 flex-shrink-0" />
                  <p>Индустриальная ул., 25/2</p>
                </div>
                <div className="flex items-start space-x-2">
                  <Icon name="Clock" size={16} className="mt-1 flex-shrink-0" />
                  <div>
                    <p>пн-пт: 09:00–19:00</p>
                    <p>сб-вс: 09:00–18:00</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-600 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; 2024 Мир инструмента. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

interface CartItem {
  id: number;
  name: string;
  price: string;
  image: string;
  quantity: number;
}

interface HomeHeaderProps {
  cart: CartItem[];
  cartCount: number;
  cartTotal: number;
  onAuthModalOpen: () => void;
  onAboutModalOpen: () => void;
  onUpdateQuantity: (productId: number, newQuantity: number) => void;
  onRemoveFromCart: (productId: number) => void;
}

const HomeHeader = ({ 
  cart, 
  cartCount, 
  cartTotal, 
  onAuthModalOpen, 
  onAboutModalOpen, 
  onUpdateQuantity, 
  onRemoveFromCart 
}: HomeHeaderProps) => {
  const navigate = useNavigate();
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
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
            <button 
              onClick={onAboutModalOpen}
              className="text-tool-gray hover:text-tool-blue transition-colors"
            >
              О магазине
            </button>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={onAuthModalOpen}
            >
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
                                onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                                className="h-8 w-8 p-0"
                              >
                                <Icon name="Minus" size={14} />
                              </Button>
                              <span className="w-8 text-center text-sm">{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                className="h-8 w-8 p-0"
                              >
                                <Icon name="Plus" size={14} />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => onRemoveFromCart(item.id)}
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
  );
};

export default HomeHeader;
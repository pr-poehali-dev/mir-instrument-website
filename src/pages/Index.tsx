import { useState } from 'react';
import AuthModal from '@/components/AuthModal';
import AboutModal from '@/components/AboutModal';
import PageTransition from '@/components/PageTransition';
import HomeHeader from '@/components/home/HomeHeader';
import HeroSection from '@/components/home/HeroSection';
import CategoriesSection from '@/components/home/CategoriesSection';
import PopularProductsSection from '@/components/home/PopularProductsSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import HomeFooter from '@/components/home/HomeFooter';

interface CartItem {
  id: number;
  name: string;
  price: string;
  image: string;
  quantity: number;
}

const Index = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);

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
      price: '50,000',
      oldPrice: null,
      rating: 4.6,
      reviews: 156,
      badge: null,
      image: 'https://cdn.poehali.dev/files/de53c7a5-2f2b-4b79-b551-8c5b2973c5bf.png',
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
    <PageTransition>
      <div className="min-h-screen bg-white font-sans">
        {/* Header */}
        <HomeHeader
          cart={cart}
          cartCount={cartCount}
          cartTotal={cartTotal}
          onAuthModalOpen={() => setIsAuthModalOpen(true)}
          onAboutModalOpen={() => setIsAboutModalOpen(true)}
          onUpdateQuantity={updateQuantity}
          onRemoveFromCart={removeFromCart}
        />

        {/* Hero Section */}
        <HeroSection />

        {/* Categories */}
        <CategoriesSection />

        {/* Popular Products */}
        <PopularProductsSection 
          products={popularProducts}
          onAddToCart={addToCart}
        />

        {/* Features */}
        <FeaturesSection />

        {/* Footer */}
        <HomeFooter />

        {/* Auth Modal */}
        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
        />

        {/* About Modal */}
        <AboutModal
          isOpen={isAboutModalOpen}
          onClose={() => setIsAboutModalOpen(false)}
        />
      </div>
    </PageTransition>
  );
};

export default Index;
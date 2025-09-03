import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import AuthModal from '@/components/AuthModal';
import AboutModal from '@/components/AboutModal';

interface Product {
  id: number;
  name: string;
  price: string;
  oldPrice?: string;
  rating: number;
  reviews: number;
  badge?: string;
  image: string;
  description: string;
  features: string[];
  specifications: { [key: string]: string };
  inStock: boolean;
  category: string;
}

interface Review {
  id: number;
  author: string;
  rating: number;
  date: string;
  text: string;
  verified: boolean;
}

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [newReview, setNewReview] = useState({ rating: 5, text: '' });
  const [showReviewForm, setShowReviewForm] = useState(false);

  // Данные товаров (в реальном приложении это будет из API/базы)
  const products: { [key: string]: Product } = {
    '1': {
      id: 1,
      name: 'Дрель-шуруповёрт BOSCH GSR 120-Li',
      price: '12,990',
      oldPrice: '15,990',
      rating: 4.8,
      reviews: 245,
      badge: 'Хит продаж',
      image: '/img/d8bf9f05-0620-4a38-af47-419436884b14.jpg',
      category: 'Электроинструмент',
      inStock: true,
      description: 'Профессиональная аккумуляторная дрель-шуруповёрт BOSCH GSR 120-Li - надёжный инструмент для широкого спектра задач. Оснащена мощным двигателем и литий-ионным аккумулятором для длительной работы без подзарядки.',
      features: [
        'Литий-ионный аккумулятор 12В',
        'Максимальный крутящий момент 30 Нм',
        'Светодиодная подсветка рабочей зоны',
        '2-скоростной редуктор',
        'Быстрозажимной патрон',
        'Эргономичная рукоятка'
      ],
      specifications: {
        'Напряжение': '12 В',
        'Тип аккумулятора': 'Li-Ion',
        'Емкость аккумулятора': '2.0 Ач',
        'Максимальный крутящий момент': '30 Нм',
        'Диаметр патрона': '10 мм',
        'Количество скоростей': '2',
        'Вес': '1.0 кг',
        'Гарантия': '3 года'
      }
    },
    '2': {
      id: 2,
      name: 'Угловая шлифмашина Makita GA9020',
      price: '8,450',
      rating: 4.7,
      reviews: 189,
      badge: 'Новинка',
      image: '/img/5483ed33-9e5f-4016-b978-6d76a4a6f510.jpg',
      category: 'Электроинструмент',
      inStock: true,
      description: 'Профессиональная угловая шлифмашина Makita GA9020 с диском 230 мм. Мощный двигатель и надёжная конструкция обеспечивают эффективную работу в тяжёлых условиях.',
      features: [
        'Мощный двигатель 2200 Вт',
        'Диаметр диска 230 мм',
        'Система защиты от перегрузки',
        'Боковая рукоятка',
        'Защитный кожух',
        'Система пылеудаления'
      ],
      specifications: {
        'Мощность': '2200 Вт',
        'Диаметр диска': '230 мм',
        'Число оборотов': '6600 об/мин',
        'Резьба шпинделя': 'M14',
        'Вес': '5.1 кг',
        'Гарантия': '3 года'
      }
    }
  };

  const reviews: Review[] = [
    {
      id: 1,
      author: 'Александр К.',
      rating: 5,
      date: '15.08.2024',
      text: 'Отличная дрель! Использую уже полгода, аккумулятор держит заряд отлично. Очень удобная в работе.',
      verified: true
    },
    {
      id: 2,
      author: 'Михаил П.',
      rating: 4,
      date: '22.07.2024',
      text: 'Хорошая модель, но хотелось бы чуть больше мощности для сложных задач. В целом доволен покупкой.',
      verified: true
    },
    {
      id: 3,
      author: 'Сергей И.',
      rating: 5,
      date: '10.07.2024',
      text: 'Покупал для домашних нужд. Справляется со всеми задачами на ура. Рекомендую!',
      verified: false
    }
  ];

  const product = id ? products[id] : null;

  useEffect(() => {
    if (!product) {
      navigate('/');
    }
  }, [product, navigate]);

  const handleAddToCart = () => {
    // Логика добавления в корзину
    alert(`Добавлено в корзину: ${product?.name} (${quantity} шт.)`);
  };

  const handleSubmitReview = () => {
    if (!newReview.text.trim()) return;
    
    // В реальном приложении отправка отзыва на сервер
    alert('Спасибо за отзыв! Он будет опубликован после модерации.');
    setNewReview({ rating: 5, text: '' });
    setShowReviewForm(false);
  };

  if (!product) return null;

  const images = [product.image, product.image, product.image]; // В реальности разные фото

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <img 
                src="https://cdn.poehali.dev/files/84348c6c-4ee0-488e-9635-a3bad0b8e116.png" 
                alt="Мир инструмента" 
                className="h-12 w-auto cursor-pointer"
                onClick={() => navigate('/')}
              />
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <button onClick={() => navigate('/')} className="text-tool-gray hover:text-tool-blue transition-colors">Главная</button>
              <button onClick={() => navigate('/catalog')} className="text-tool-gray hover:text-tool-blue transition-colors">Каталог</button>
              <button className="text-tool-gray hover:text-tool-blue transition-colors">Доставка</button>
              <button onClick={() => setIsAboutModalOpen(true)} className="text-tool-gray hover:text-tool-blue transition-colors">О магазине</button>
            </nav>
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setIsAuthModalOpen(true)}
              >
                <Icon name="User" size={20} />
                <span className="hidden md:inline ml-2">Личный кабинет</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex space-x-2 text-sm text-gray-500">
          <button onClick={() => navigate('/')} className="hover:text-tool-blue">Главная</button>
          <span>/</span>
          <button onClick={() => navigate('/catalog')} className="hover:text-tool-blue">Каталог</button>
          <span>/</span>
          <span className="hover:text-tool-blue">{product.category}</span>
          <span>/</span>
          <span className="text-tool-gray font-medium">{product.name}</span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <div>
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
              <img 
                src={images[selectedImage]} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex space-x-2">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                    selectedImage === index ? 'border-tool-blue' : 'border-gray-200'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
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
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            <button className="border-b-2 border-tool-blue py-2 px-1 font-medium text-tool-blue">
              Характеристики
            </button>
            <button className="border-b-2 border-transparent py-2 px-1 font-medium text-gray-500 hover:text-gray-700">
              Отзывы ({product.reviews})
            </button>
          </nav>
        </div>

        {/* Specifications */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Технические характеристики</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                  <span className="font-medium text-gray-600">{key}:</span>
                  <span className="text-tool-gray">{value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Reviews */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Отзывы покупателей</CardTitle>
              <Button 
                onClick={() => setShowReviewForm(!showReviewForm)}
                variant="outline"
              >
                <Icon name="MessageSquare" size={16} className="mr-2" />
                Написать отзыв
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {/* Review Form */}
            {showReviewForm && (
              <div className="border border-gray-200 rounded-lg p-6 mb-6 bg-gray-50">
                <h4 className="font-semibold mb-4">Напишите отзыв о товаре</h4>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="rating">Ваша оценка</Label>
                    <div className="flex items-center space-x-1 mt-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => setNewReview({...newReview, rating: star})}
                          className="focus:outline-none"
                        >
                          <Icon 
                            name="Star" 
                            size={24} 
                            className={star <= newReview.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'} 
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="review">Ваш отзыв</Label>
                    <Textarea
                      id="review"
                      placeholder="Поделитесь своим опытом использования товара..."
                      value={newReview.text}
                      onChange={(e) => setNewReview({...newReview, text: e.target.value})}
                      className="mt-1"
                      rows={4}
                    />
                  </div>
                  <div className="flex space-x-4">
                    <Button onClick={handleSubmitReview} className="bg-tool-blue hover:bg-blue-700">
                      Опубликовать отзыв
                    </Button>
                    <Button variant="outline" onClick={() => setShowReviewForm(false)}>
                      Отмена
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Reviews List */}
            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review.id} className="border-b border-gray-100 pb-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-semibold">{review.author}</span>
                        {review.verified && (
                          <Badge variant="outline" className="text-xs text-green-600 border-green-600">
                            <Icon name="ShieldCheck" size={12} className="mr-1" />
                            Проверенная покупка
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Icon 
                              key={i} 
                              name="Star" 
                              size={14} 
                              className={i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'} 
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{review.text}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modals */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
      <AboutModal
        isOpen={isAboutModalOpen}
        onClose={() => setIsAboutModalOpen(false)}
      />
    </div>
  );
};

export default Product;
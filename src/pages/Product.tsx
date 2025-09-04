import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AuthModal from '@/components/AuthModal';
import AboutModal from '@/components/AboutModal';
import ProductHeader from '@/components/product/ProductHeader';
import ProductBreadcrumbs from '@/components/product/ProductBreadcrumbs';
import ProductImageGallery from '@/components/product/ProductImageGallery';
import ProductInfo from '@/components/product/ProductInfo';
import ProductSpecifications from '@/components/product/ProductSpecifications';
import ProductReviews from '@/components/product/ProductReviews';

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
      image: 'https://cdn.poehali.dev/files/3b20f03f-7167-4c9e-aa43-ff159b3d8ab0.png',
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
      image: 'https://cdn.poehali.dev/files/92b49adc-abed-4f59-9a70-bb3708346eb0.png',
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
    },
    '3': {
      id: 3,
      name: 'Набор ключей гаечных 6-24мм',
      price: '2,890',
      oldPrice: '3,490',
      rating: 4.9,
      reviews: 432,
      badge: 'Скидка',
      image: 'https://cdn.poehali.dev/files/88edef3d-943a-4f42-b740-5ffdec0e004b.png',
      category: 'Ручной инструмент',
      inStock: true,
      description: 'Профессиональный набор гаечных ключей из высококачественной хром-ванадиевой стали. Набор включает 12 ключей размерами от 6 до 24 мм с зеркальной полировкой для долговечности и коррозионной стойкости.',
      features: [
        'Хром-ванадиевая сталь',
        '12 ключей в наборе (6-24мм)',
        'Зеркальная полировка',
        'Удобный пластиковый кейс',
        'Метрическая система размеров',
        'Пожизненная гарантия'
      ],
      specifications: {
        'Материал': 'Хром-ванадиевая сталь',
        'Количество ключей': '12 шт.',
        'Размеры': '6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 17, 19, 22, 24 мм',
        'Покрытие': 'Хромированное',
        'Упаковка': 'Пластиковый кейс',
        'Стандарт': 'DIN 3113',
        'Вес набора': '1.2 кг',
        'Гарантия': 'Пожизненная'
      }
    },
    '4': {
      id: 4,
      name: 'Перфоратор DeWALT D25263K',
      price: '50,000',
      rating: 4.6,
      reviews: 156,
      image: 'https://cdn.poehali.dev/files/de53c7a5-2f2b-4b79-b551-8c5b2973c5bf.png',
      category: 'Электроинструмент',
      inStock: true,
      description: 'Мощный профессиональный перфоратор DeWALT D25263K с системой SDS-plus. Идеальный инструмент для сверления отверстий в бетоне, кирпиче и камне. Оснащен системой активного контроля вибрации и мощным двигателем для тяжелых работ.',
      features: [
        'Мощный двигатель 800 Вт',
        'Система SDS-plus',
        'Активный контроль вибрации',
        '3 режима работы',
        'Светодиодная подсветка',
        'Прорезиненная рукоятка'
      ],
      specifications: {
        'Мощность': '800 Вт',
        'Тип патрона': 'SDS-plus',
        'Диаметр сверления в бетоне': 'до 26 мм',
        'Диаметр сверления в дереве': 'до 30 мм',
        'Энергия удара': '2.6 Дж',
        'Частота ударов': '4600 уд/мин',
        'Частота вращения': '0-1100 об/мин',
        'Вес': '2.9 кг',
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

  if (!product) return null;

  const images = [product.image, product.image, product.image]; // В реальности разные фото

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <ProductHeader
        onAuthModalOpen={() => setIsAuthModalOpen(true)}
        onAboutModalOpen={() => setIsAboutModalOpen(true)}
      />

      {/* Breadcrumbs */}
      <ProductBreadcrumbs product={product} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <ProductImageGallery images={images} productName={product.name} />

          {/* Product Info */}
          <ProductInfo product={product} />
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
        <ProductSpecifications product={product} />

        {/* Reviews */}
        <ProductReviews product={product} reviews={reviews} />
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
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { categories } from '@/data/categories';

export default function Catalog() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleBackToCategories = () => {
    setSelectedCategory(null);
  };

  const selectedCategoryData = categories.find(cat => cat.id === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <img 
                src="https://cdn.poehali.dev/files/84348c6c-4ee0-488e-9635-a3bad0b8e116.png" 
                alt="Мир инструмента" 
                className="h-12 w-auto"
              />
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="/" className="text-tool-gray hover:text-tool-blue transition-colors">Главная</a>
              <a href="/catalog" className="text-tool-blue font-medium">Каталог</a>
              <a href="#" className="text-tool-gray hover:text-tool-blue transition-colors">Доставка</a>
              <a href="/#about" className="text-tool-gray hover:text-tool-blue transition-colors">О магазине</a>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!selectedCategory ? (
          <>
            {/* Categories View */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-tool-gray mb-4">Каталог товаров</h1>
              <p className="text-gray-600">Выберите категорию для просмотра ассортимента</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category) => (
                <Card 
                  key={category.id} 
                  className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-tool-blue"
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-tool-blue rounded-lg flex items-center justify-center">
                        <Icon name={category.icon as any} size={24} className="text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-tool-gray">{category.name}</CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600">
                      {category.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        ) : (
          <>
            {/* Tools View */}
            <div className="mb-8">
              <Button 
                variant="ghost" 
                onClick={handleBackToCategories}
                className="mb-4"
              >
                <Icon name="ArrowLeft" size={20} className="mr-2" />
                Назад к категориям
              </Button>
              
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 bg-tool-blue rounded-lg flex items-center justify-center">
                  <Icon name={selectedCategoryData?.icon as any} size={32} className="text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-tool-gray">{selectedCategoryData?.name}</h1>
                  <p className="text-gray-600">{selectedCategoryData?.description}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {selectedCategoryData?.tools.map((tool, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Icon name="Package" size={20} className="text-tool-gray" />
                      </div>
                      <div>
                        <h3 className="font-medium text-tool-gray">{tool}</h3>
                        <p className="text-sm text-gray-500">В наличии</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-tool-gray text-white py-12">
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
                {categories.map((category, index) => (
                  <a 
                    key={index} 
                    href="/catalog" 
                    className="block hover:text-white transition-colors cursor-pointer"
                  >
                    {category.name}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Покупателям</h4>
              <div className="space-y-2 text-gray-300">
                <a href="#" className="block hover:text-white transition-colors">Доставка и оплата</a>
                <a href="#" className="block hover:text-white transition-colors">Возврат товара</a>
                <a href="#" className="block hover:text-white transition-colors">Гарантии</a>
                <a href="#" className="block hover:text-white transition-colors">Контакты</a>
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
}
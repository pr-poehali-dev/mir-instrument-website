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
    </div>
  );
}
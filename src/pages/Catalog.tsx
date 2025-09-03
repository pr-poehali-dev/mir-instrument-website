import React, { useState, useMemo, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { categories } from '@/data/categories';
import AuthModal from '@/components/AuthModal';
import AboutModal from '@/components/AboutModal';

export default function Catalog() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);

  // Проверяем URL параметры при загрузке
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const categoryFromUrl = urlParams.get('category');
    if (categoryFromUrl && categories.find(cat => cat.id === categoryFromUrl)) {
      setSelectedCategory(categoryFromUrl);
    }
  }, []);

  // Создаем плоский список всех товаров для поиска
  const allTools = useMemo(() => {
    return categories.flatMap(category => 
      category.tools.map(tool => ({
        name: tool,
        category: category.name,
        categoryId: category.id,
        icon: category.icon
      }))
    );
  }, []);

  // Фильтруем товары по поисковому запросу
  const searchResults = useMemo(() => {
    if (!searchTerm || searchTerm.length < 2) return [];
    
    return allTools.filter(tool =>
      tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.category.toLowerCase().includes(searchTerm.toLowerCase())
    ).slice(0, 8); // Показываем только первые 8 результатов
  }, [searchTerm, allTools]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setShowSearchResults(value.length >= 2);
  };

  const handleSelectSearchResult = (tool: any) => {
    setSelectedCategory(tool.categoryId);
    setSearchTerm('');
    setShowSearchResults(false);
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
    setSearchTerm('');
    setShowSearchResults(false);
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
              <button 
                onClick={() => setIsAboutModalOpen(true)}
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
                onClick={() => setIsAuthModalOpen(true)}
              >
                <Icon name="User" size={20} />
                <span className="hidden md:inline ml-2">Личный кабинет</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!selectedCategory ? (
          <>
            {/* Categories View */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-tool-gray mb-4">Каталог товаров</h1>
              <p className="text-gray-600 mb-6">Выберите категорию для просмотра ассортимента</p>
              
              {/* Search Bar */}
              <div className="relative max-w-md">
                <div className="relative">
                  <Icon name="Search" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Поиск товаров..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="pl-10 pr-4 py-2"
                    onFocus={() => searchTerm.length >= 2 && setShowSearchResults(true)}
                    onBlur={() => setTimeout(() => setShowSearchResults(false), 150)}
                  />
                </div>
                
                {/* Search Results Dropdown */}
                {showSearchResults && searchResults.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 max-h-80 overflow-y-auto z-50">
                    {searchResults.map((tool, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                        onClick={() => handleSelectSearchResult(tool)}
                      >
                        <div className="w-8 h-8 bg-tool-blue rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon name={tool.icon as any} size={16} className="text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-tool-gray">{tool.name}</h4>
                          <p className="text-sm text-gray-500">{tool.category}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
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
              
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-tool-blue rounded-lg flex items-center justify-center">
                  <Icon name={selectedCategoryData?.icon as any} size={32} className="text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-tool-gray">{selectedCategoryData?.name}</h1>
                  <p className="text-gray-600">{selectedCategoryData?.description}</p>
                </div>
              </div>

              {/* Search in Category */}
              <div className="relative max-w-md mb-6">
                <div className="relative">
                  <Icon name="Search" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Поиск в категории..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="pl-10 pr-4 py-2"
                    onFocus={() => searchTerm.length >= 2 && setShowSearchResults(true)}
                    onBlur={() => setTimeout(() => setShowSearchResults(false), 150)}
                  />
                </div>
                
                {/* Search Results Dropdown for Category */}
                {showSearchResults && searchResults.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 max-h-80 overflow-y-auto z-50">
                    {searchResults.map((tool, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                        onClick={() => handleSelectSearchResult(tool)}
                      >
                        <div className="w-8 h-8 bg-tool-blue rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon name={tool.icon as any} size={16} className="text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-tool-gray">{tool.name}</h4>
                          <p className="text-sm text-gray-500">{tool.category}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
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
  );
}
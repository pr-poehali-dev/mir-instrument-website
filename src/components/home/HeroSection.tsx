import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { categories } from '@/data/categories';

interface HeroSectionProps {
  onSearch?: (searchTerm: string) => void;
}

const HeroSection = ({ onSearch }: HeroSectionProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);

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
    onSearch?.(value);
  };

  const handleSelectSearchResult = (tool: any) => {
    // Переходим в каталог с выбранной категорией
    window.location.href = `/catalog?category=${tool.categoryId}`;
  };

  return (
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
            <div className="relative">
              <Input
                placeholder="Поиск среди 400,000 товаров..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="h-14 text-lg pl-6 pr-16 rounded-xl border-2 border-gray-200 focus:border-tool-blue"
                onFocus={() => searchTerm.length >= 2 && setShowSearchResults(true)}
                onBlur={() => setTimeout(() => setShowSearchResults(false), 150)}
              />
              <Button 
                size="lg" 
                className="absolute right-2 top-2 bg-tool-blue hover:bg-blue-700 rounded-lg"
              >
                <Icon name="Search" size={20} />
              </Button>
            </div>
            
            {/* Search Results Dropdown */}
            {showSearchResults && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl shadow-lg border border-gray-200 max-h-80 overflow-y-auto z-50">
                {searchResults.map((tool, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-4 px-6 py-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0 first:rounded-t-xl last:rounded-b-xl"
                    onClick={() => handleSelectSearchResult(tool)}
                  >
                    <div className="w-10 h-10 bg-tool-blue rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name={tool.icon as any} size={20} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-tool-gray">{tool.name}</h4>
                      <p className="text-sm text-gray-500">{tool.category}</p>
                    </div>
                    <Icon name="ChevronRight" size={16} className="text-gray-400" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
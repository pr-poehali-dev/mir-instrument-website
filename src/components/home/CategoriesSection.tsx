import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { categories } from '@/data/categories';

const CategoriesSection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-3xl font-bold text-tool-gray mb-12 text-center">Популярные категории</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.slice(0, 3).map((category, index) => (
            <div 
              key={index} 
              onClick={() => navigate(`/catalog?category=${category.id}`)}
              className="cursor-pointer"
            >
              <Card className="card-hover group border-2 border-gray-100 hover:border-tool-blue">
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
            </div>
          ))}
        </div>
        
        {/* View All Categories Button */}
        <div className="text-center mt-12">
          <Button 
            onClick={() => navigate('/catalog')}
            variant="outline" 
            className="border-tool-blue text-tool-blue hover:bg-tool-blue hover:text-white"
          >
            Смотреть все категории
            <Icon name="ArrowRight" size={16} className="ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
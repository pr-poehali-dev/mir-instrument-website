import Icon from '@/components/ui/icon';
import { categories } from '@/data/categories';

const HomeFooter = () => {
  return (
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
              {categories.map((category, index) => (
                <a 
                  key={index} 
                  href={`/catalog?category=${category.id}`} 
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
  );
};

export default HomeFooter;
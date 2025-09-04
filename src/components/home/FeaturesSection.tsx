import Icon from '@/components/ui/icon';

const FeaturesSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-tool-blue rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Truck" size={32} className="text-white" />
            </div>
            <h4 className="text-xl font-semibold text-tool-gray mb-2">Быстрая доставка</h4>
            <p className="text-gray-600">Доставим по Сургуту за 1 день, по России за 2-5 дней</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-tool-blue rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Shield" size={32} className="text-white" />
            </div>
            <h4 className="text-xl font-semibold text-tool-gray mb-2">Гарантия качества</h4>
            <p className="text-gray-600">Официальная гарантия от производителя до 5 лет</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-tool-blue rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Headphones" size={32} className="text-white" />
            </div>
            <h4 className="text-xl font-semibold text-tool-gray mb-2">Поддержка 24/7</h4>
            <p className="text-gray-600">Консультации по выбору и техподдержка круглосуточно</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
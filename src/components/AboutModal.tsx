import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AboutModal = ({ isOpen, onClose }: AboutModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-tool-gray flex items-center space-x-3">
            <img 
              src="https://cdn.poehali.dev/files/84348c6c-4ee0-488e-9635-a3bad0b8e116.png" 
              alt="Мир инструмента" 
              className="h-8 w-auto"
            />
            <span>О магазине "Мир инструмента"</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Миссия */}
          <div>
            <h3 className="text-xl font-semibold text-tool-gray mb-3 flex items-center">
              <Icon name="Target" size={24} className="text-tool-blue mr-2" />
              Наша миссия
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Обеспечивать профессионалов и мастеров качественным инструментом, который помогает 
              создавать превосходные результаты. Мы стремимся быть надежным партнером для каждого, 
              кто ценит качество и профессионализм в своей работе.
            </p>
          </div>

          <Separator />

          {/* История */}
          <div>
            <h3 className="text-xl font-semibold text-tool-gray mb-3 flex items-center">
              <Icon name="Clock" size={24} className="text-tool-blue mr-2" />
              История компании
            </h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              С 2010 года мы специализируемся на поставке профессионального инструмента и оборудования. 
              За 14 лет работы мы стали одним из ведущих поставщиков в регионе, обслужив более 50,000 клиентов.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-tool-light rounded-lg">
                <div className="text-2xl font-bold text-tool-blue">14+</div>
                <div className="text-sm text-gray-600">лет опыта</div>
              </div>
              <div className="text-center p-4 bg-tool-light rounded-lg">
                <div className="text-2xl font-bold text-tool-blue">50k+</div>
                <div className="text-sm text-gray-600">клиентов</div>
              </div>
              <div className="text-center p-4 bg-tool-light rounded-lg">
                <div className="text-2xl font-bold text-tool-blue">400k+</div>
                <div className="text-sm text-gray-600">товаров</div>
              </div>
              <div className="text-center p-4 bg-tool-light rounded-lg">
                <div className="text-2xl font-bold text-tool-blue">98%</div>
                <div className="text-sm text-gray-600">довольных клиентов</div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Преимущества */}
          <div>
            <h3 className="text-xl font-semibold text-tool-gray mb-4 flex items-center">
              <Icon name="Star" size={24} className="text-tool-blue mr-2" />
              Наши преимущества
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-tool-blue rounded-full flex items-center justify-center flex-shrink-0">
                  <Icon name="Shield" size={20} className="text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-tool-gray mb-1">Гарантия качества</h4>
                  <p className="text-sm text-gray-600">Только оригинальная продукция от проверенных производителей</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-tool-blue rounded-full flex items-center justify-center flex-shrink-0">
                  <Icon name="Truck" size={20} className="text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-tool-gray mb-1">Быстрая доставка</h4>
                  <p className="text-sm text-gray-600">Доставка по Сургуту за 1 день, по России за 2-5 дней</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-tool-blue rounded-full flex items-center justify-center flex-shrink-0">
                  <Icon name="Users" size={20} className="text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-tool-gray mb-1">Экспертная консультация</h4>
                  <p className="text-sm text-gray-600">Помогаем выбрать подходящий инструмент для любых задач</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-tool-blue rounded-full flex items-center justify-center flex-shrink-0">
                  <Icon name="Headphones" size={20} className="text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-tool-gray mb-1">Поддержка 24/7</h4>
                  <p className="text-sm text-gray-600">Техническая поддержка и консультации в любое время</p>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Партнеры */}
          <div>
            <h3 className="text-xl font-semibold text-tool-gray mb-4 flex items-center">
              <Icon name="Handshake" size={24} className="text-tool-blue mr-2" />
              Наши партнеры
            </h3>
            <div className="flex flex-wrap gap-3">
              <Badge variant="outline" className="px-4 py-2 text-base">BOSCH</Badge>
              <Badge variant="outline" className="px-4 py-2 text-base">Makita</Badge>
              <Badge variant="outline" className="px-4 py-2 text-base">DeWALT</Badge>
              <Badge variant="outline" className="px-4 py-2 text-base">Metabo</Badge>
              <Badge variant="outline" className="px-4 py-2 text-base">Hitachi</Badge>
              <Badge variant="outline" className="px-4 py-2 text-base">Stanley</Badge>
              <Badge variant="outline" className="px-4 py-2 text-base">Festool</Badge>
              <Badge variant="outline" className="px-4 py-2 text-base">Milwaukee</Badge>
            </div>
          </div>

          <Separator />

          {/* Контакты */}
          <div>
            <h3 className="text-xl font-semibold text-tool-gray mb-4 flex items-center">
              <Icon name="MapPin" size={24} className="text-tool-blue mr-2" />
              Контактная информация
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Icon name="Phone" size={20} className="text-tool-blue flex-shrink-0" />
                  <div>
                    <p className="font-medium">+7 (3462) 22-46-06</p>
                    <p className="font-medium">+7 (3462) 22-90-36</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Icon name="MapPin" size={20} className="text-tool-blue flex-shrink-0 mt-0.5" />
                  <p>Индустриальная ул., 25/2<br />Сургут, ХМАО</p>
                </div>
                <div className="flex items-start space-x-3">
                  <Icon name="Clock" size={20} className="text-tool-blue flex-shrink-0 mt-0.5" />
                  <div>
                    <p>пн-пт: 09:00–19:00</p>
                    <p>сб-вс: 09:00–18:00</p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Icon name="Mail" size={20} className="text-tool-blue" />
                  <p>info@mir-tool.ru</p>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="Globe" size={20} className="text-tool-blue" />
                  <p>www.mir-tool.ru</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-6">
          <Button onClick={onClose} className="bg-tool-blue hover:bg-blue-700">
            Закрыть
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AboutModal;
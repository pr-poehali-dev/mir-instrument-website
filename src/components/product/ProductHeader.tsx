import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface ProductHeaderProps {
  onAuthModalOpen: () => void;
  onAboutModalOpen: () => void;
}

const ProductHeader = ({ onAuthModalOpen, onAboutModalOpen }: ProductHeaderProps) => {
  const navigate = useNavigate();

  return (
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
            <button onClick={onAboutModalOpen} className="text-tool-gray hover:text-tool-blue transition-colors">О магазине</button>
          </nav>
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={onAuthModalOpen}
            >
              <Icon name="User" size={20} />
              <span className="hidden md:inline ml-2">Личный кабинет</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ProductHeader;
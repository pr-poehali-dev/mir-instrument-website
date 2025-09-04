import { useNavigate } from 'react-router-dom';

interface Product {
  name: string;
  category: string;
}

interface ProductBreadcrumbsProps {
  product: Product;
}

const ProductBreadcrumbs = ({ product }: ProductBreadcrumbsProps) => {
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <nav className="flex space-x-2 text-sm text-gray-500">
        <button onClick={() => navigate('/')} className="hover:text-tool-blue">Главная</button>
        <span>/</span>
        <button onClick={() => navigate('/catalog')} className="hover:text-tool-blue">Каталог</button>
        <span>/</span>
        <span className="hover:text-tool-blue">{product.category}</span>
        <span>/</span>
        <span className="text-tool-gray font-medium">{product.name}</span>
      </nav>
    </div>
  );
};

export default ProductBreadcrumbs;
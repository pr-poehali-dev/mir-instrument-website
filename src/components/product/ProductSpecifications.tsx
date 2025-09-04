import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Product {
  specifications: { [key: string]: string };
}

interface ProductSpecificationsProps {
  product: Product;
}

const ProductSpecifications = ({ product }: ProductSpecificationsProps) => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Технические характеристики</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(product.specifications).map(([key, value]) => (
            <div key={key} className="flex justify-between py-2 border-b border-gray-100">
              <span className="font-medium text-gray-600">{key}:</span>
              <span className="text-tool-gray">{value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductSpecifications;
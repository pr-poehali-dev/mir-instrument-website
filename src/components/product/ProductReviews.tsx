import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

interface Review {
  id: number;
  author: string;
  rating: number;
  date: string;
  text: string;
  verified: boolean;
}

interface Product {
  reviews: number;
}

interface ProductReviewsProps {
  product: Product;
  reviews: Review[];
}

const ProductReviews = ({ product, reviews }: ProductReviewsProps) => {
  const [newReview, setNewReview] = useState({ rating: 5, text: '' });
  const [showReviewForm, setShowReviewForm] = useState(false);

  const handleSubmitReview = () => {
    if (!newReview.text.trim()) return;
    
    alert('Спасибо за отзыв! Он будет опубликован после модерации.');
    setNewReview({ rating: 5, text: '' });
    setShowReviewForm(false);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Отзывы покупателей</CardTitle>
          <Button 
            onClick={() => setShowReviewForm(!showReviewForm)}
            variant="outline"
          >
            <Icon name="MessageSquare" size={16} className="mr-2" />
            Написать отзыв
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {/* Review Form */}
        {showReviewForm && (
          <div className="border border-gray-200 rounded-lg p-6 mb-6 bg-gray-50">
            <h4 className="font-semibold mb-4">Напишите отзыв о товаре</h4>
            <div className="space-y-4">
              <div>
                <Label htmlFor="rating">Ваша оценка</Label>
                <div className="flex items-center space-x-1 mt-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setNewReview({...newReview, rating: star})}
                      className="focus:outline-none"
                    >
                      <Icon 
                        name="Star" 
                        size={24} 
                        className={star <= newReview.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'} 
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <Label htmlFor="review">Ваш отзыв</Label>
                <Textarea
                  id="review"
                  placeholder="Поделитесь своим опытом использования товара..."
                  value={newReview.text}
                  onChange={(e) => setNewReview({...newReview, text: e.target.value})}
                  className="mt-1"
                  rows={4}
                />
              </div>
              <div className="flex space-x-4">
                <Button onClick={handleSubmitReview} className="bg-tool-blue hover:bg-blue-700">
                  Опубликовать отзыв
                </Button>
                <Button variant="outline" onClick={() => setShowReviewForm(false)}>
                  Отмена
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Reviews List */}
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="border-b border-gray-100 pb-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-semibold">{review.author}</span>
                    {review.verified && (
                      <Badge variant="outline" className="text-xs text-green-600 border-green-600">
                        <Icon name="ShieldCheck" size={12} className="mr-1" />
                        Проверенная покупка
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Icon 
                          key={i} 
                          name="Star" 
                          size={14} 
                          className={i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'} 
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">{review.date}</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">{review.text}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductReviews;
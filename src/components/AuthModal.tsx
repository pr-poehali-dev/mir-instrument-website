import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Здесь будет логика авторизации/регистрации
    console.log(isLogin ? 'Вход' : 'Регистрация', { email, password, name });
    
    // Временно показываем уведомление
    alert(`${isLogin ? 'Вход' : 'Регистрация'} пока не подключен. Следите за обновлениями в Telegram: https://t.me/+QgiLIa1gFRY4Y2Iy`);
    onClose();
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setName('');
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    resetForm();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="absolute right-2 top-2 h-8 w-8 p-0"
          >
            <Icon name="X" size={16} />
          </Button>
          <CardTitle className="text-center">
            {isLogin ? 'Вход в личный кабинет' : 'Регистрация'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="name">Имя</Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Введите ваше имя"
                  required
                />
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Введите email"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Введите пароль"
                required
              />
            </div>
            
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Подтвердите пароль</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Повторите пароль"
                  required
                />
              </div>
            )}
            
            <Button type="submit" className="w-full bg-tool-orange hover:bg-tool-orange/90">
              {isLogin ? 'Войти' : 'Зарегистрироваться'}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {isLogin ? 'Нет аккаунта?' : 'Уже есть аккаунт?'}
            </p>
            <Button
              variant="link"
              onClick={switchMode}
              className="text-tool-orange hover:text-tool-orange/90 p-0 h-auto"
            >
              {isLogin ? 'Зарегистрироваться' : 'Войти'}
            </Button>
          </div>
          
          {isLogin && (
            <div className="mt-4 text-center">
              <Button
                variant="link"
                className="text-sm text-gray-500 hover:text-gray-700 p-0 h-auto"
              >
                Забыли пароль?
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
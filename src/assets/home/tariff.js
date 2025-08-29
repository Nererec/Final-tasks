import lightIcon from './icon_light.svg';
import aimIcon from './icon_aim.svg';
import laptopIcon from './icon_laptop.svg';

export const tariffs = [
    {
      id: 1,
      title: 'Beginner',
      description: 'Для небольшого исследования',
      price: '799 ₽',
      oldPrice: '1 200 ₽',
      monthly: 'или 150 ₽/мес. при рассрочке на 24 мес.',
      benefits: ['Безлимитная история запросов', 'Безопасная сделка', 'Поддержка 24/7'],
      icon: lightIcon,
      color: 'var(--accent-color)',
      button: 'Перейти в личный кабинет',
    },
    {
      id: 2,
      title: 'Pro',
      description: 'Для HR и фрилансеров',
      price: '1 299 ₽',
      oldPrice: '2 600 ₽',
      monthly: 'или 279 ₽/мес. при рассрочке на 24 мес.',
      benefits: [
        'Все пункты тарифа Beginner',
        'Экспорт истории',
        'Рекомендации по приоритетам',
      ],
      icon: aimIcon,
      color: 'var(--secondary-accent-color)',
      button: 'Подробнее',
    },
    {
      id: 3,
      title: 'Business',
      description: 'Для корпоративных клиентов',
      price: '2 379 ₽',
      oldPrice: '3 700 ₽',
      monthly: 'или',
      benefits: [
        'Все пункты тарифа Pro',
        'Безлимитное количество запросов',
        'Приоритетная поддержка',
      ],
      icon: laptopIcon,
      color: 'var(--black-color)',
      button: 'Подробнее',
    },
  ];
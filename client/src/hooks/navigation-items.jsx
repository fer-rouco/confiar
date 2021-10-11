import { useEffect, useState } from 'react';
import { useSession } from '../contexts/session-context';
import useReactPath from './path-name';

const itemList = [
  { id: 'Stores', path: '/Stores', text: 'Tiendas', icon: 'shop' },
  { id: 'Customers', path: '/Customers', text: 'Clientes', icon: 'people' },
  { id: 'Stats', path: '/Stats', text: 'Info de usuarios', icon: 'info-circle' },
  { id: 'Login', path: '/Login', text: 'Login', icon: 'people' },
];

const storesItem = itemList.find((item) => {
  return item.id === 'Stores';
});
const statsItem = itemList.find((item) => {
  return item.id === 'Stats';
});
const loginItem = itemList.find((item) => {
  return item.id === 'Login';
});

export const findActiveItem = (itemList) => {
  return itemList.find((item) => {
    return item.path === window.location.pathname;
  });
};

export const updateActiveItem = (itemList, defaultValue) => {
  const activeItem = findActiveItem(itemList);

  itemList.forEach((itemInLoop) => {
    itemInLoop.active = false;
  });

  if (activeItem) {
    const item = itemList.filter((itemToFilter) => {
      return itemToFilter.id === activeItem.id;
    })[0];
    if (item) {
      item.active = true;
    }
  } else {
    itemList[0].active = true;
  }
};

export default function useNavigationItems(defaultValue) {
  const { session } = useSession();
  const pathname = useReactPath();

  // Conditions
  storesItem.condition = () => {
    return session;
  };
  statsItem.condition = () => {
    return session;
  };
  loginItem.condition = () => {
    return !session;
  };

  const [navigationItems, setNavigationItems] = useState(null);

  if (!navigationItems) {
    setNavigationItems(itemList);
    const currentItem = findActiveItem(itemList);
    updateActiveItem(itemList, currentItem);
  }

  useEffect(() => {
    const currentItem = findActiveItem(navigationItems);
    updateActiveItem(navigationItems, currentItem);
  }, [pathname, navigationItems]);

  return [navigationItems, setNavigationItems];
}

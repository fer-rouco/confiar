import { useEffect, useState } from 'react';
import { useSession } from '../contexts/session-context';
import useReactPath from './path-name';

const itemList = [
  { id: 'Users', path: '/Users', text: 'Usuarios', icon: 'people', condition: 'logged-in' },
  { id: 'Customers', path: '/Customers', text: 'Clientes', icon: 'people', condition: 'logged-in' },
  { id: 'Login', path: '/Login', text: 'Login', icon: 'people', condition: 'not logged-in' },
];

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
  
  itemList.forEach((itemInLoop) => {
    if (itemInLoop.condition.indexOf('logged-in') > -1) {
      const not = itemInLoop.condition.indexOf('not') > -1;
      itemInLoop.conditionFunction = () => {
        return (not) ? !session : session;
      };
    }
  });

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

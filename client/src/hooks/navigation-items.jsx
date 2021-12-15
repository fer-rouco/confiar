import { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import useRoutesResolver from './routes-resolver';
import useReactPath from './path-name';
import { getCurrentSession } from './../services/server/session-service';

const updateActiveItem = (itemList, activeItem) => {
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

export default function useNavigationItems() {
  const { t } = useTranslation('navigation');
  const routesResolver = useRoutesResolver();
  const session = getCurrentSession();
  const pathname = useReactPath();
    
  let navigationItemList = t('items', { returnObjects: true });
  navigationItemList.forEach((navigationItem) => {
    let route = routesResolver.get(navigationItem.id);
    navigationItem.url = route.url;
    navigationItem.children = route.children;

    // set conditionFunction to each item of navigationItemList
    if (navigationItem.condition.indexOf('logged-in') > -1) {
      const not = navigationItem.condition.indexOf('not') > -1;
      navigationItem.conditionFunction = () => {
        return (not) ? !session : session;
      };
    }
  });

  const [navigationItems, setNavigationItems] = useState(null);
  
  if (!navigationItems) {
    setNavigationItems(navigationItemList);
    const activeItem = routesResolver.findActiveUrlItem(navigationItemList);
    updateActiveItem(navigationItemList, activeItem);
  }

  useEffect(() => {
    const activeItem = routesResolver.findActiveUrlItem(navigationItems);
    updateActiveItem(navigationItems, activeItem);
  }, [pathname, navigationItems]);

  useEffect(() => {
    setNavigationItems(navigationItemList);
  }, [pathname, t]);

  return [navigationItems, setNavigationItems];
}

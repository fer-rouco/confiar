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

export default function useNavigationItems(defaultValue) {
  const { t } = useTranslation('navigation');
  const routesResolver = useRoutesResolver();
  const session = getCurrentSession();
  const pathname = useReactPath();
    
  let navigationItemList = [];
  
  // fill navigationItemList
  let navigationTexts = t("texts", {returnObjects: true});
  Object.entries(navigationTexts).forEach((navigationItem) => {
    let key = navigationItem[0];
    let value = navigationItem[1];
    let route = routesResolver.get(key);
    let item = {
      id: key,
      url: route.url,
      text: value,
      icon: t("icons." + key),
      condition: t("conditions." + key),
      children: route.children
    }
    navigationItemList.push(item);
  });

  // set conditionFunction to each item of navigationItemList
  navigationItemList.forEach((itemInLoop) => {
    if (itemInLoop.condition.indexOf('logged-in') > -1) {
      const not = itemInLoop.condition.indexOf('not') > -1;
      itemInLoop.conditionFunction = () => {
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

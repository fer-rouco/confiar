import { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import useReactPath from './path-name';
import { getCurrentSession } from './../services/server/session-service';


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
  const { t } = useTranslation('navigation');
  const routesTranslation = i18next.getFixedT(null, 'routes');
  const session = getCurrentSession();
  const pathname = useReactPath();
    
  let navigationItemList = [];
  
  // fill navigationItemList
  let navigationTexts = t("texts", {returnObjects: true});
  Object.entries(navigationTexts).forEach((navigationItem) => {
    let key = navigationItem[0];
    let value = navigationItem[1];
    let item = {
      id: key,
      path: routesTranslation(key),
      text: value,
      icon: t("icons." + key),
      condition: t("conditions." + key),
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
    const currentItem = findActiveItem(navigationItemList);
    updateActiveItem(navigationItemList, currentItem);
  }

  useEffect(() => {
    const currentItem = findActiveItem(navigationItems);
    updateActiveItem(navigationItems, currentItem);
  }, [pathname, navigationItems]);

  useEffect(() => {
    setNavigationItems(navigationItemList);
  }, [pathname, t]);

  return [navigationItems, setNavigationItems];
}

import i18next from 'i18next';

const useRoutesResolver = () => {
  const navigationTranslation = i18next.getFixedT(null, 'routes');

  const get = (id) => {
    return findInChildrenById(id, navigationTranslation('items', { returnObjects: true }));
  };

  const getUrl = (id) => {
    let objectToNavigate = get(id);
    return (objectToNavigate) ? objectToNavigate.url : undefined;
  };
  
  const findInChildrenBy = (by, valueToFindBy, translationObject) => {
    let objectToReturn;

    objectToReturn = translationObject.find((translationItem) => { return translationItem[by] === valueToFindBy; });
    if (!objectToReturn) {     
      translationObject.forEach((item) => {
        if (item.children) {
          let childFound = findInChildrenBy(by, valueToFindBy, item.children);
          objectToReturn = (childFound) ? childFound : objectToReturn;
        }
      });
    }
      
      return objectToReturn;
  }
  
  const findInChildrenById = (id, translationObject) => {
    return findInChildrenBy('id', id, translationObject);
  }
  
  const findInChildrenByUrl = (url, translationObject) => {
    return findInChildrenBy('url', url, translationObject);
  }
  
  const isItemChildOfOtherItem = (currentItem, item) => {
    let childFlag = false;
    if (item.children) {
      let childItemFound = item.children.filter((childItem) => {
        return childItem === currentItem;
      });
      childFlag = childItemFound.length > 0; 
    }
    return childFlag;
  };

  const findActiveUrlItem = (itemList) => {
    const pathname = window.location.pathname;
    const currentItem = findInChildrenByUrl(pathname, itemList);
    
    let activeItem = itemList.find((item) => {
      return item.url === pathname || isItemChildOfOtherItem(currentItem, item);
    });
  
    return activeItem;
  };

  return { get, getUrl, findInChildrenById, findInChildrenByUrl, findActiveUrlItem };
};

export default useRoutesResolver;

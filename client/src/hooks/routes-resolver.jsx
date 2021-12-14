import i18next from 'i18next';

const useRoutesResolver = () => {
  const navigationTranslation = i18next.getFixedT(null, 'routes');

  // const get = (route) => {
  //   return navigationTranslation("items.".concat(route).concat(".url"))
  // };

  const getChildren = (id) => {
    let children = null;
    let translationResult = navigationTranslation(id);
    if (translationResult === id || translationResult.indexOf(' ') > -1) {
      let translationObject = navigationTranslation('items', { returnObjects: true });
      children = translationObject[id].children;
    }
    return children;
  }

  const get = (id) => {
    let objectToNavigate = null;
    let translationResult = navigationTranslation(id);
    if (translationResult === id || translationResult.indexOf(' ') > -1) {
      let translationObject = navigationTranslation('items', { returnObjects: true });
      objectToNavigate = findIdInChildren(id, translationObject);
    }
    if (objectToNavigate) {
      // console.log(objectToNavigate.url);
      return objectToNavigate.url;
    }
    else {
      console.error("Navigation id %s not found", id);
    }
  };

  const findIdInChildren = (id, translationObjectParam) => {
    let objectToReturn = null;
    let translationObject = (translationObjectParam) ? translationObjectParam : navigationTranslation(id, { returnObjects: true });
    translationObject
    if (Object.keys(translationObject).indexOf(id) > -1) {
      objectToReturn = translationObject[id];
    }
    else {
      Object.values(translationObject).forEach((item) => {
        if (item.children) {
          let childFound = findIdInChildren(id, item.children);
          objectToReturn = (childFound) ? childFound : objectToReturn;
        }
      })
    }
    return objectToReturn;
  }

  return { get, getChildren };
};

export default useRoutesResolver;

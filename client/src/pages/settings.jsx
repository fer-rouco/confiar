import { useState, useEffect } from "react";
import useRoutesResolver from './../hooks/routes-resolver';
import withPage from "../components/containers/page";
import Panel from "../components/containers/panel";
import PanelForm from "../components/containers/panel-form";
import { useTheme } from "../contexts/theme-context";
import SwitchField from "../components/controls/fields/check/switch-field";
import SelectField from "../components/controls/fields/select/select-field";
import { useTranslation } from "react-i18next";
import storageManagerService from "../services/storage/storage-manager-service";
import { STORAGE_LANGUAGE } from "../services/storage/storage-constants";
import { createModel, updateModel } from "../components/controls/fields/model-context";

function Settings(props) {
  const theme = useTheme();
  const localStorageService = storageManagerService();
  const generalModelState = createModel({ language: localStorageService.getItem(STORAGE_LANGUAGE) }), [generalModel] = generalModelState;
  const themeModelState = createModel({ dark: theme.isDark() });
  const routesResolver = useRoutesResolver();
  const { i18n } = useTranslation('pages', { keyPrefix: 'settings' });
  const languages = Object.keys(i18n.services.resourceStore.data).map((language) => { return {value: language, label: translateLabel(language) }; });

  function handleLanguageChange() {
    i18n.changeLanguage(generalModel.language, (error, t) => {
      if (!error) {
        localStorageService.setItem(STORAGE_LANGUAGE, generalModel.language);
        window.history.pushState(null, null, routesResolver.getUrl("settings"));
      }
      else {
        return console.error('Something went wrong trying to change the language.', error);
      }
    });
  }

  function translateLabel(language) {
    const { t } = useTranslation('pages', { keyPrefix: 'settings.general.panel.languages' });
    return t(language);
  }
  
  useEffect(() => {
    updateModel(generalModelState);
    updateModel(themeModelState);
  }, []);

  return (
    <Panel size="medium" model={{}} >
      <PanelForm id="general" subTitle model={generalModelState} >
        <div className="row">
          <div className="col-md-6">
            <SelectField attr="language" options={languages} onChange={(language) => { handleLanguageChange(language) }} ></SelectField>
          </div>
        </div>
      </PanelForm>
      <PanelForm id="theme" subTitle model={themeModelState} >
        <div className="row">
          <div className="col-md-6">
            <SwitchField attr="dark" onChange={() => theme.toggle()} ></SwitchField>
          </div>
        </div>
      </PanelForm>
    </Panel>
  );
}

export default withPage()(Settings);
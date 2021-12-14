import { useState } from "react";
import i18next from "i18next";
import withPage from "../components/containers/page";
import Panel from "../components/containers/panel";
import PanelForm from "../components/containers/panel-form";
import { useTheme } from "../contexts/theme-context";
import SwitchField from "../components/controls/fields/check/switch-field";
import SelectField from "../components/controls/fields/select/select-field";
import { useTranslation } from "react-i18next";
import storageManagerService from "../services/storage/storage-manager-service";
import { STORAGE_LANGUAGE } from "../services/storage/storage-constants";

function Settings(props) {
  const theme = useTheme();
  const localStorageService = storageManagerService();
  const modelState = useState({ dark: theme.isDark(), language: localStorageService.getItem(STORAGE_LANGUAGE)});
  const [model, setModel] = modelState;
  const navigationTranslation = i18next.getFixedT(null, 'routes');
  const { i18n } = useTranslation('pages', { keyPrefix: 'settings' });
  const languages = Object.keys(i18n.services.resourceStore.data).map((language) => { return {value: language, label: language }; });

  function handleLanguageChange() {
    i18n.changeLanguage(model.language, (error, t) => {
      if (!error) {
        localStorageService.setItem(STORAGE_LANGUAGE, model.language);
        window.history.pushState(null, null, navigationTranslation("settings"));
      }
      else {
        return console.error('Something went wrong trying to change the language.', error);
      }
    });
  }

  return (
    <Panel size="medium" model={{}} >
      <PanelForm id="general" subTitle model={modelState}>
        <div className="row">
          <div className="col-md-6">
            <SelectField attr="language" options={languages} onChange={(language) => { handleLanguageChange(language) }} ></SelectField>
          </div>
        </div>
      </PanelForm>
      <PanelForm id="theme" subTitle model={modelState} >
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
import { useState } from "react";
import withPage, { pageIds } from "../components/containers/page";
import Panel from "../components/containers/panel";
import PanelForm from "../components/containers/panel-form";
import { useTheme } from "../contexts/theme-context";
import SwitchField from "../components/controls/fields/check/switch-field";
import SelectField from "../components/controls/fields/select/select-field";
import { useTranslation } from "react-i18next";

function Settings(props) {
  const theme = useTheme();
  const modelState = useState({ dark: theme.isDark() });
  const [model, setModel] = modelState;
  const { i18n } = useTranslation('pages', { keyPrefix: 'settings' });
  const languages = Object.keys(i18n.services.resourceStore.data).map((language) => { return {value: language, label: language }; });
  const t = i18n.getFixedT(null, 'pages', 'settings');

  function handleLanguageChange() {
    i18n.changeLanguage(model.language, (error, t) => {
      if (error) return console.error('Something went wrong trying to change the language.', error);
    });
  }

  return (
    <Panel size="medium" model={{}} >
      <PanelForm id="general" subTitle model={modelState}>
        <div className="row">
          <div className="col-md-6">
            <SelectField attr="language" options={languages} onChange={() => { handleLanguageChange() }} ></SelectField>
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

export default withPage("settings")(Settings);
import { useState } from "react";
import Panel from "../components/containers/panel";
import PanelForm from "../components/containers/panel-form";
import { useTheme } from "../contexts/theme-context";
import SwitchField from "../components/controls/fields/check/switch-field";

export default function Settings() {
  const theme = useTheme();
  const modelState = useState({ dark: theme.isDark() });
  const [model, setModel] = modelState;

  return (
    <PanelForm title="Configuraciones" size="medium" model={modelState}  >
      <Panel subTitle="Tema" model={{}}  >
        <div className="row">
          <div className="col-md-6">
            <SwitchField attr="dark" label="Modo Claro/Oscuro" onChange={() => theme.toggle()} ></SwitchField>
          </div>
        </div>
      </Panel>
   </PanelForm>
  );
}
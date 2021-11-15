import { useState } from "react";
import Panel from "../components/containers/panel";
import PanelForm from "../components/containers/panel-form";
import Button from "../components/controls/buttons/button";
import { useTheme } from "../contexts/theme-context";

export default function Settings() {
  const theme = useTheme();

  return (
    <PanelForm title="Configuraciones" size="medium" model={{}}  >
      <Panel subTitle="Tema" model={{}}  >
        <div className="row">
          <div className="col-md-6">
            <Button label="Switch Light/Dark" onClick={() => theme.toggle()} ></Button>
          </div>
        </div>
      </Panel>
   </PanelForm>
  );
}
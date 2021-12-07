import { createRef, useEffect, useState } from "react";
import { usePage } from "../../contexts/page-context";

export default function baseControl(props) {
  const { translation } = usePage();
  const [label, setLabel] = useState("");

  const control = {
    ref: createRef(),
    props,
    label,
    getId: () => {
      return control.props.type.concat('-').concat(control.props.attr);
    },
    getLabel: () => {
      let label = "";
      if (control.props.hasOwnProperty('label') && control.props.label !== undefined) {
        label = control.props.label;
      }
      else if (translation && control.props.parent) {
        label = translation(control.props.parent.concat(".").concat(control.props.attr));
      }
      return label;
    },
    useEffect: () => {     
      useEffect(() => {
        setLabel(control.getLabel());
      }, [props.label, translation]);
    }
  }

  return control;
}

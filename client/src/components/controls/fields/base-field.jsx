import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import baseControl from "../base-control";
import { useModel } from "../fields/model-context";

export default function baseField(props) {
  const control = baseControl(props);
  const [model, setModel] = useModel();
  const { register, setValue, formState: { errors } } = useFormContext();
  const [execOnChange, setExecOnChange] = useState(false)

  const field = {
    model,
    setModel,
    register,
    getField: () => {
      return control.ref.current?.getElementsByClassName('field')[0];
    },
    valueProperty: (props.valueProperty) ? props.valueProperty : 'value',
    getValue: () => {
      let fieldDOM = field.getField();
      return fieldDOM ? fieldDOM[field.valueProperty] : null;
    },
    update: () => {
      let rawValue = field.getValue();
      let value;
      
      if (props.type === 'number') {
        value = Number.parseFloat(rawValue);
      }
      else {
        value = rawValue;
      }

      let modelCopy = Object.assign({}, model);
      modelCopy[props.attr] = value;
      setModel(modelCopy);
      if (setValue) {
        setValue(props.attr, value);
      }
      setExecOnChange(true);
    },
    useEffect: () => {     
      control.useEffect();

      useEffect(() => {
        if (setValue && model) {
          setValue(props.attr, model[props.attr]);
        }
      }, [setValue, props.attr, model]);
      
      useEffect(() => {
        if (props.onChange && execOnChange) {
          setExecOnChange(false);
          props.onChange(model[props.attr]);
        }
      }, [model]);
    }
  }

  return {...control, ...field};
}

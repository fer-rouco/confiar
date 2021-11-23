import { cloneElement, createRef, useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { ModelProvider } from './../controls/fields/model-context';

// props: model, onSubmit
export default function Form(props) {
  const methods = (props.model) ? useForm({ defaultValues: props.model[0] }) : {};
  const formRef = createRef();

  // TODO: Fix this focus stuff...
  // useEffect(() => {
  //   const field = formRef.current.getElementsByClassName('field')[0];
  //   if (field) {
  //     field.focus();
  //   }
    
  // }, [props.model]);

  const onSubmit = (event) => {
    if (methods.handleSubmit) {
      methods.handleSubmit(props.onSubmit)();
    }
    else {
      props.onSubmit();
    }
    event.preventDefault();
  };

  return (
    <ModelProvider model={props.model}>
      <FormProvider {...methods}>
        <form onSubmit={onSubmit} ref={formRef} className={props.className} >
          {props.children}
        </form>
      </FormProvider>
    </ModelProvider>
  );
}

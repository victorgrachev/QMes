import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { TButtonForm, TInputForm } from './types';
import { IResponseSupabase } from 'models/interfaces';
import M from 'materialize-css';
import { StyledForm, ButtonForm } from './styled';

export type TPropsForm<T> = {
  title: string;
  inputs: TInputForm[];
  buttons: TButtonForm[];
  onSubmit: (...param: Parameters<SubmitHandler<T>>) => Promise<IResponseSupabase>;
};

export const Form = <T extends {}>(props: TPropsForm<T>) => {
  const { title, inputs, buttons, onSubmit } = props;

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<T>();

  for (let value of Object.values(errors)) {
    // @ts-ignore
    M.toast({ html: value.message, classes: 'rounded' });
  }

  const handleSubmitForm: SubmitHandler<T> = data => {
    onSubmit(data).then(({ error }) => {
      if (error) {
        M.toast({ html: error.message, classes: 'rounded' });
      }
    });
  };

  return (
    <StyledForm className="white light-green lighten-5 z-depth-3" onSubmit={handleSubmit(handleSubmitForm)}>
      <div className="row">
        <span className="col s12 center-align no-select green-text text-darken-4 flow-text">{title}</span>
      </div>
      <div className="row">
        {inputs.map(({ type, label, name, options }) => (
          <div key={name} className="input-field col s12 l6">
            <input
              id={name}
              className="light-green lighten-5 green-text text-darken-4"
              {...register(name as any, { ...options })}
              type={type}
            />
            <label htmlFor={name} className="green-text text-darken-4">
              {label}
            </label>
          </div>
        ))}
        {buttons.map(({ id, label, submit, onClick }) => (
          <div key={id} className="input-field col s12 l6 center-align">
            <ButtonForm
              className="btn-large waves-effect waves-light light-green lighten-2 green-text text-darken-4"
              type={submit ? 'submit' : 'button'}
              onClick={onClick}
            >
              {label}
            </ButtonForm>
          </div>
        ))}
      </div>
    </StyledForm>
  );
};

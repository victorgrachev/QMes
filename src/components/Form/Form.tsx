import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { TButtonForm, TInputForm } from './types';
import { IResponseSupabase } from 'models/interfaces';
import styled from 'styled-components';
import M from 'materialize-css';

export type TPropsForm<T> = {
  title: string;
  inputs: TInputForm[];
  buttons: TButtonForm[];
  submitButton: {
    label: string;
    colNumber: number;
    onSubmit: (...param: Parameters<SubmitHandler<T>>) => Promise<IResponseSupabase>;
  };
};

const StyledForm = styled.form`
  border-radius: 15px;
  padding: 15px 30px;
`;

const StyledButton = styled.button`
  width: 100%;
  margin-top: 10px;
`;

export const Form = <T extends {}>(props: TPropsForm<T>) => {
  const {
    title,
    inputs,
    buttons,
    submitButton: { label, colNumber, onSubmit },
  } = props;

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
    <StyledForm className="white z-depth-5" onSubmit={handleSubmit(handleSubmitForm)}>
      <div className="row">
        <h3 className="col s12 center-align no-select">{title}</h3>
      </div>
      <div className="row">
        {inputs.map(({ type, label, name, options }) => (
          <div key={name} className={'input-field col s12'}>
            <input id={name} {...register(name as any, { ...options })} type={type} size={10} />
            <label htmlFor={name}>{label}</label>
          </div>
        ))}
      </div>
      <div className="row">
        <div className="col s12 center-align">
          <div className={`col s${colNumber}`}>
            <StyledButton type="submit" className="btn-large waves-effect waves-light hoverable">
              {label}
            </StyledButton>
          </div>
          {buttons.map(({ label, colNumber, onClick }) => (
            <div key={label} className={`col s${colNumber}`}>
              <StyledButton className="btn-large waves-effect waves-light hoverable" onClick={onClick}>
                {label}
              </StyledButton>
            </div>
          ))}
        </div>
      </div>
    </StyledForm>
  );
};

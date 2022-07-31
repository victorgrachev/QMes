import React from 'react';
import { RegisterOptions } from 'react-hook-form/dist/types/validator';

export type TInputForm = {
  label: string;
  name: string;
  type: string;
  options?: RegisterOptions;
};

export type TButtonForm = {
  id: number;
  label: string;
  submit: boolean;
  onClick?: React.EventHandler<React.SyntheticEvent>;
};

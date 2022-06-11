import React from 'react';
import { RegisterOptions } from 'react-hook-form/dist/types/validator';

export type TInputForm = {
  label: string;
  name: string;
  type: string;
  options?: RegisterOptions;
};

export type TButtonForm = {
  label: string;
  colNumber: number;
  onClick: React.EventHandler<React.SyntheticEvent>;
};

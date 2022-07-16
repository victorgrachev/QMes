import React, { useMemo } from 'react';
import { useAuth } from 'hooks/useAuth';
import { Form, TPropsForm } from 'components/Form';
import { useNavigate } from 'react-router-dom';
import { PageWrapper } from 'components/PageWrapper';

type TLoginFormData = {
  email: string;
  password: string;
};

export const Login: React.FC = () => {
  const { handleSighIn } = useAuth();
  const navigate = useNavigate();

  const configForm = useMemo<TPropsForm<TLoginFormData>>(
    () => ({
      title: 'Войти',
      inputs: [
        {
          type: 'text',
          label: 'Электронная почта (Email)',
          name: 'email',
          options: {
            required: 'Поле "Электронная почта (Email)" обязательно для заполнения!',
          },
        },
        {
          type: 'password',
          label: 'Пароль',
          name: 'password',
          options: {
            required: 'Поле "Пароль" обязательно для заполнения!',
            minLength: {
              value: 8,
              message: 'Минимальная длина пароля 8 символов',
            },
          },
        },
      ],
      buttons: [
        {
          label: 'Регистрация',
          colNumber: 12,
          onClick: () => navigate('/signup'),
        },
      ],
      submitButton: {
        label: 'Войти',
        colNumber: 12,
        onSubmit: async authData => {
          return handleSighIn(authData);
        },
      },
    }),
    [],
  );

  return (
    <PageWrapper>
      <Form {...configForm} />
    </PageWrapper>
  );
};

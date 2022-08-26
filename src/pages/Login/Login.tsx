import React, { useMemo } from 'react';
import { useAuth } from 'hooks/useAuth';
import { Form, TPropsForm } from 'components/Form';
import { useNavigate } from 'react-router-dom';
import { Page } from 'common/styled';
import { ROUTES } from '../../routes';

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
          id: 1,
          label: 'Регистрация',
          submit: false,
          onClick: () => navigate(ROUTES.NOT_AUTH.SIGN_UP),
        },
        {
          id: 2,
          label: 'Войти',
          submit: true,
        },
      ],
      onSubmit: async authData => handleSighIn(authData),
    }),
    [],
  );

  return (
    <Page className="valign-wrapper">
      <Form {...configForm} />
    </Page>
  );
};

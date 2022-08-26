import React, { useMemo } from 'react';
import { Form, TPropsForm } from 'components/Form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'hooks/useAuth';
import M from 'materialize-css';
import { Page } from 'common/styled';
import { ROUTES } from 'routes';

type TRegistrationFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export const Registration: React.FC = () => {
  const { handleSignUp } = useAuth();
  const navigate = useNavigate();

  const configForm: TPropsForm<TRegistrationFormData> = useMemo(
    () => ({
      title: 'Регистрация',
      inputs: [
        {
          type: 'text',
          label: 'Имя',
          name: 'firstName',
        },
        {
          type: 'text',
          label: 'Фамилия',
          name: 'lastName',
        },
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
          id: Date.now() * Math.random(),
          label: 'Вход',
          submit: false,
          onClick: () => navigate(ROUTES.NOT_AUTH.SIGN_IN),
        },
        {
          id: Date.now() * Math.random(),
          label: 'Регистрация',
          submit: true,
        },
      ],
      onSubmit: async data => {
        const { firstName, lastName, email, password } = data;

        const userData = {
          firstName,
          lastName,
        };

        const authData = {
          email,
          password,
        };

        const resultSign = await handleSignUp(userData, authData);

        if (!resultSign.error) {
          M.toast({
            html: 'Для завершения регистрации необходимо подтвердить профиль. На почту было отправлено письмо с инструкцией.',
          });
        }

        return resultSign;
      },
    }),
    [],
  );

  return (
    <Page className="valign-wrapper">
      <Form {...configForm} />
    </Page>
  );
};

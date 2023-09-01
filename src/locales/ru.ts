export const ru = {
  // object = feature
  auth: {
    signIn: 'Войти',
    signUp: 'Зарегистрироваться',
    signUpTitle: 'Регистрация',
    password: 'Пароль',
    forgotPassword: 'Забыли пароль?',
    forgotPasswordTitle: 'Восстановление пароля',
    passwordConfirmation: 'Подтверждение пароля',
    createNewPassword: 'Создать новый пароль',
    newPassword: 'Новый пароль',
    passwordCharacters: 'Ваш пароль должен быть от 6 до 20 символов',
    dontHaveAccount: 'Нет аккаунта?',
    haveAccount: 'Уже Зарегистрированы?',
    instructions: 'Введите адрес электронной почты, и мы вышлем вам дальнейшие инструкции',
    email: 'Электронная почта',
    userName: 'Имя пользователя',
    emailSent: 'Письмо отправлено',
    ok: 'ОК',
    emailConfirm(email: string) {
      return `Мы отправили ссылку для подтверждения электронной почты на ${email}`
    },
    sendLink: 'Отправить ссылку',
    sendLinkAgain: 'Отправить ссылку снова',
    backToSignIn: 'Вернуться на страницу входа',
    linkHasBeenSent:
      'Ссылка отправлена по электронной почте. Если вы не получили письмо, отправьте ссылку еще раз',
    signUpTerms: {
      description: 'Я согласен с <1>Правилами</1> и <2>Политикой</2>',
    },
    agree: 'Я согласен с',
    termsOfService: 'Правилами',
    and: 'и',
    policy: 'Политикой',
    // error fields block start =======================================================

    authErrors: {
      usernameField: {
        nonEmpty: 'Введите имя пользователя',
        regex: 'Пароль должен содержать A-B, a-b, 0-9, !#$%*+-?^_',
        min: 'Мин количество символов 6',
        max: 'Макс количество символов 30',
      },
      emailField: {
        nonEmpty: 'Введите почту',
        email: 'Некорректный адрес почты',
      },
      terms: 'Пожалуйста ознакомтесь и примите Правила сервиса и Политику конфиденциальности',
      password: {
        nonEmpty: 'Введите  пароль',
        regex: 'Пароль должен содержать A-Z, a-z, 0-9, !#$%*+-?^_',
        min: 'Мин количество символов 6',
        max: 'Макс количество символов 20',
      },
      passwordConfirm: 'Подтвердите ваш пароль',
      refine: 'Пароли должны совпадать',
    },
    // error fields block end =======================================================
  },
  profile: {
    home: 'Главная',
    createPost: 'Создать пост',
    myProfile: 'Мой профиль',
    logout: 'Выйти',
    confirmLogout: 'Вы действительно хотите выйти из своей учетной записи',
    subscriptions: 'Подписки',
    subscribers: 'Подписчики',
    publications: 'Публикации',
    aboutYourself: 'Расскажите о себе',
    profileSettings: 'Настройки профиля',
    favorites: 'Избранное',
    messenger: 'Сообщения',
    search: 'Поиск',
    profileSetting: {
      generalInformation: 'Общая информация',
      devices: 'Устройства',
      accountManagement: 'Управление аккаунтом',
      myPayment: 'Мои платежи',
      addAProfilePhoto: 'Добавить фото',
      userName: 'Имя пользователя',
      firstName: 'Имя',
      lastName: 'Фамилия',
      dateOfBirthday: 'Дата рождения',
      city: 'Город',
      aboutMe: 'Обо мне',
      saveChanges: 'Сохранить изменения',
      profileSettingsErrors: {
        usernameField: {
          nonEmpty: 'Введите имя пользователя',
          regex: 'Пароль должен содержать A-B, a-b, 0-9, !#$%*+-?^_',
          min: 'Мин количество символов 6',
          max: 'Макс количество символов 30',
        },
        aboutMeError: 'Максимальное колличество знаков 200',
      },
    },
  },

  // deletePost: 'Удалить пост',
  // editPost: 'Изменить пост',
  // publicationDescriptions: 'Добавьте описание публикации',
  // saveChanges: 'Сохранить Изменения',
  // yes: 'да',
  // no: 'нет',
  // sureDelete: 'Вы уверены что хотите удалить эту запись?',
  // generalInformation: 'Общая информация',
  // devices: 'Устройства',
  // accountManagement: 'Управление Аккаунтом',
  // myPayments: 'Мои платежи',
  // firstName: 'Имя',
  // lastName: 'Фамилия',
  // dateOfBirthday: 'Дата рождения',
  // city: 'Город',
  // aboutMe: 'Обо мне',
  // addAProfilePhoto: 'Добавить фото профиля',
  // selectFromComputer: 'Выбрать на компьютере',
  // save: 'Сохранить',
  // addPhoto: 'Добавить фото',
  // next: 'Далее',
  // cropping: 'Обрезка',
  // filters: 'Фильтры',
  // publication: 'Публикация',
  // publish: 'Опубликовать',
  // close: 'Закрыть',
  // confirmClose: 'Если вы закроете все будет удалено',
}

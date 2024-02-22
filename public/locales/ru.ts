export const ru = {
  locale: {
    english: 'English',
    russian: 'Russian',
  },

  auth: {
    BackToSignUp: 'Вернуться на страницу регистрации',
    signIn: 'Войти',
    signUp: 'Зарегистрироваться',
    backToSignIn: 'Вернуться на страницу входа',
    signUpTitle: 'Регистрация',
    password: 'Пароль',
    forgotPassword: 'Забыли пароль?',
    forgotPasswordTitle: 'Восстановление пароля',
    passwordConfirmation: 'Подтверждение пароля',
    createNewPassword: 'Создать новый пароль',
    newPassword: 'Новый пароль',
    passwordChanged: 'Ваш пароль был успешно изменен',
    passwordCharacters: 'Ваш пароль должен быть от 6 до 20 символов',
    dontHaveAccount: 'Нет аккаунта?',
    haveAccount: 'Уже зарегистрированы?',
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
    Return: 'Вернуться',
    linkHasBeenSent:
      'Ссылка отправлена по электронной почте. Если вы не получили письмо, отправьте ссылку еще раз',
    signUpTerms: {
      description: 'Я согласен с <1>Правилами</1> и <2>Политикой</2>',
    },
    agree: 'Я согласен с',
    termsOfService: 'Правилами',
    and: 'и',
    policy: 'Политикой',

    privacyAndTermsPages: {
      titleOfPrivacyPolicy: 'Политика конфиденциальности',
      textOfPrivacy: `Мы приняли настоящую Политику конфиденциальности, которая определяет, как мы обрабатываем информацию, собираемую https://inctagram.space. а также причины, по которым мы должны собирать определенные персональные данные о вас. Поэтому перед использованием сайта https://inctagram.space необходимо ознакомиться с настоящей Политикой конфиденциальности. Мы бережно относимся к вашим персональным данным и обязуемся гарантировать их конфиденциальность и безопасность.
      Персональные данные, которые мы собираем.
      Когда вы посещаете https://inctagram.space, мы автоматически собираем определенную информацию о вашем устройстве, включая информацию о вашем веб-браузере, IP-адресе, часовом поясе и некоторых файлах cookie, установленных на вашем устройстве. Кроме того, когда вы просматриваете Сайт, мы собираем информацию об отдельных веб-страницах или продуктах, которые вы просматриваете, какие веб-сайты или условия поиска привели вас на Сайт и как вы взаимодействуете с Сайтом. Мы называем эту автоматически собираемую информацию «Информацией об устройстве». Кроме того, мы можем собирать персональные данные, которые вы предоставляете нам (включая, помимо прочего, имя, фамилию, адрес, платежную информацию и т. д.) во время регистрации, чтобы иметь возможность выполнить соглашение.
      Почему мы обрабатываем ваши данные?
      Нашим главным приоритетом является безопасность данных клиентов, и поэтому мы можем обрабатывать только минимальные пользовательские данные, ровно столько, сколько это абсолютно необходимо для обслуживания веб-сайта. Информация, собираемая автоматически, используется только для выявления потенциальных случаев злоупотреблений и получения статистической информации об использовании веб-сайта. Эта статистическая информация иначе не агрегатируется таким образом, чтобы идентифицировать любого конкретного пользователя системы.
      Вы можете посещать веб-сайт, не сообщая нам, кто вы, и не раскрывая никакой информации, по которой кто-то может идентифицировать вас как конкретное, идентифицируемое лицо. Однако, если вы хотите использовать некоторые функции веб-сайта или хотите получать нашу рассылку или предоставить другую информацию, заполнив форму, вы можете предоставить нам личные данные, такие как ваш адрес электронной почты, имя, фамилия, город место жительства, организация, телефон. Вы можете не предоставлять нам свои личные данные, но тогда вы не сможете воспользоваться некоторыми функциями веб-сайта. Пользователи, которые не уверены в том, какая информация является обязательной, могут связаться с нами по адресу inctagram.pg@gmail.com.
      Ваши права:
      Если вы являетесь резидентом Европы, у вас есть следующие права, связанные с вашими личными данными:
      •	Право на получение информации.
      •	Право доступа.
      •	Право на исправление.
      •	Право на стирание.
      •	Право на ограничение обработки.
      •	Право на переносимость данных.
      •	Право на возражение.
      •	Права в отношении автоматизированного принятия решений и профилирования.
      Если вы хотите воспользоваться этим правом, свяжитесь с нами, используя контактную информацию ниже. Кроме того, если вы являетесь резидентом Европы, мы отмечаем, что мы обрабатываем вашу информацию для выполнения контрактов, которые могут быть у нас с вами (например, если вы делаете заказ через Сайт), или иным образом для реализации наших законных деловых интересов, перечисленных над. Кроме того, обратите внимание, что ваша информация может быть передана за пределы Европы, включая Канаду и США.
      Ссылки на другие сайты.
      Наш веб-сайт может содержать ссылки на другие веб-сайты, которые не принадлежат нам и не контролируются нами. Имейте в виду, что мы не несем ответственности за такие другие веб-сайты или политику конфиденциальности третьих лиц. Мы рекомендуем вам быть в курсе, когда вы покидаете наш веб-сайт, и читаете заявления о конфиденциальности каждого веб-сайта, который может собирать личную информацию.
      Информационная безопасность.
      Мы защищаем информацию, которую вы предоставляете, на компьютерных серверах в контролируемой, безопасной среде, защищенной от несанкционированного доступа, использования или раскрытия. Мы принимаем разумные административные, технические и физические меры предосторожности для защиты от несанкционированного доступа, использования, изменения и раскрытия персональных данных, находящихся под его контролем и хранением. Однако передача данных через Интернет или беспроводную сеть не может быть гарантирована.
      Юридическое раскрытие.
      Мы будем раскрывать любую информацию, которую мы собираем, используем или получаем, если это требуется или разрешено законом, например, для выполнения повестки в суд или аналогичного судебного процесса, и когда мы добросовестно считаем, что раскрытие необходимо для защиты наших прав, вашей безопасности или безопасность других, расследование мошенничества или ответ на запрос правительства.
      Контакты.
      Если вы хотите связаться с нами, чтобы узнать больше об этой Политике, или хотите связаться с нами по любому вопросу, касающемуся индивидуальных прав и вашей личной информации, вы можете отправить электронное письмо по адресу inctagram.pg@gmail.com.
      `,
      titleOfTermsOfService: 'Условия обслуживания',
      textOfTerms: ` Мы соглашаемся предоставлять вам Сервис Inсtagram. Сервис поможет вам оставаться на связи с важными для вас людьми и быть в курсе того, что вам интересно. Сервис включает следующие компоненты:
•	Предложение персонализированных возможностей для создания и поиска контента, общения и обмена опытом и впечатлениями с другими людьми. 
•	Обеспечение защищенности, целостности и безопасности при использовании Inctagram.
•	Разработка и использование технологий, которые помогают нам поддерживать наше растущее сообщество.
•	Общение с вами.
•	Обеспечение доступа к нашему Сервису.

Ваши обязательства.
В обмен на наше обязательство предоставлять Сервис вы должны взять на себя следующие обязательства перед нами.
Кто может использовать Inсtagram. Мы хотим, чтобы наш Сервис был максимально открытым и доступным для всех, но вместе с тем безопасным, защищенным и соответствующим требованиям законодательства. Поэтому, чтобы стать частью сообщества Inсtagram, вы должны соблюдать некоторые ограничения.
•	Вам должно быть как минимум 13 лет.
•	Вам не должно быть запрещено получать какой-либо из компонентов нашего Сервиса в соответствии с действующим законодательством или использовать Сервисы, связанные с платежами, если вы входите в действующие списки запрещенных лиц.
•	Ваш аккаунт не должен быть ранее отключен нами за нарушение законодательства или каких-либо наших правил.
•	Вы не должны быть осуждены за совершение преступления на сексуальной почве.
Запрещенные способы использования Inсtagram. Предоставление безопасного и открытого Сервиса широкому сообществу требует, чтобы каждый из нас соблюдал правила.
•	Вы не имеете права выдавать себя за других людей или предоставлять неточную информацию.
•	Вы не имеете права совершать незаконные, вводящие в заблуждение или обманные действия либо иные действия в незаконных или несанкционированных целях.
•	Вы не имеете права препятствовать нормальной работе Сервиса или вмешиваться в его работу.
•	Вы не имеете права предпринимать попытки создания аккаунтов, сбора информации или доступа к ней несанкционированными способами.
•	Вы не имеете права продавать, передавать по лицензии или покупать какие-либо аккаунты или данные, полученные от нас или из нашего Сервиса.
•	Вы не имеете права без разрешения публиковать личную или конфиденциальную информацию пользователей или иным способом нарушать чьи-либо права, в том числе права на интеллектуальную собственность (например, путем нарушения авторского права, права на товарный знак, распространения контрафактных или пиратских товаров).
•	Вы не имеете права изменять, переводить или реконструировать какие-либо наши продукты или их компоненты либо пытаться создать производные работы на их основе.
Разрешения, которые вы предоставляете нам. В рамках нашего соглашения вы также даете нам разрешения, необходимые для предоставления Сервиса.

•	Мы не заявляем прав собственности на ваш контент, но вы даете нам лицензию на его использование.
•	Использование вашего имени пользователя, фото профиля и информации о ваших отношениях и действиях в связи с аккаунтами, объявлениями и рекламным контентом.
•	Вы соглашаетесь с тем, что мы можем скачивать и устанавливать обновления Сервиса на ваше устройство.

      
      `,
    },

    // error fields block start =======================================================

    authErrors: {
      usernameField: {
        nonEmpty: 'Введите имя пользователя',
        regex: 'Имя пользователя может содержать A-z, - или _',
        min: 'Мин количество символов 6',
        max: 'Макс количество символов 30',
      },
      emailField: {
        nonEmpty: 'Введите электронную почту',
        email: 'Некорректный адрес почты',
      },
      terms: 'Пожалуйста ознакомьтесь и примите Правила сервиса и Политику конфиденциальности',
      password: {
        nonEmpty: 'Введите  пароль',
        regex: 'Пароль должен содержать A-z, 0-9, !#$%*+-?^_',
        min: 'Мин количество символов 6',
        max: 'Макс количество символов 20',
      },
      recaptcha: {
        notARobot: 'Я не робот',
        verifyPlease: 'Пожалуйста, проверьте, не являетесь ли вы роботом',
        expired: 'Проверка истекла. Установите флажок еще раз.',
      },
      passwordConfirm: 'Подтвердите ваш пароль',
      refine: 'Пароли должны совпадать',
    },
    // error fields block end =======================================================
  },

  sidebar: {
    home: 'Главная',
    createPost: 'Создать пост',
    myProfile: 'Мой профиль',
    messenger: 'Сообщения',
    search: 'Поиск',
    favorites: 'Избранное',
    statistics: 'Cтатистика',
    logout: 'Выйти',
  },

  profile: {

    confirmLogout(email: string) {
      return `Вы действительно хотите выйти из своей учетной записи ${email}?`
    },
    yes: 'Да',
    no: 'Нет',
    subscriptions: 'Подписки',
    subscribers: 'Подписчики',
    publications: 'Публикации',
    aboutYourself: 'Расскажите о себе',
    profileSettings: 'Настройки профиля',

    passwordChanged: 'Ваш пароль был успешно изменен',
    save: 'Сохранить',
    next: 'Далее',
    descriptionError: {
      error: 'Максимальное количество знаков 200',
    },

  },

  profileSetting: {

    setting: {
      generalInformation: 'Общая информация',
      devices: 'Устройства',
      accountManagement: 'Управление аккаунтом',
      myPayment: 'Мои платежи',
    },

    generalInformation: {
      yes: 'Да',
      no: 'Нет',
      addAProfilePhoto: 'Добавить фото',
      save: 'Сохранить',
      userName: 'Имя пользователя',
      firstName: 'Имя',
      lastName: 'Фамилия',
      dateOfBirthday: 'Дата рождения',
      country: 'Страна',
      selectYourCountry: 'Выбрать страну',
      city: 'Город',
      selectYourCity: 'Выбрать город',
      aboutMe: 'Обо мне',
      saveChanges: 'Сохранить изменения',
      original: 'Оригинал',
      edit: 'Редактировать',
      delete: 'Удалить',
      deletePhoto: 'Удалить фото',
      areYouSure: 'Вы уверены что хотите удалить фото?',
      changesSaved: 'Ваши изменения сохранены',
      selectFromComputer: 'Выбрать с компьютера',

      generalInformationErrors: {

        usernameField: {
          nonEmpty: 'Введите имя пользователя',
          regex: 'Имя пользователя должно содержать A-B, a-b, 0-9, !#$%*+-?^_',
          min: 'Минимальное количество символов 6',
          max: 'Максимальное количество символов 30',
        },

        firstNameField: {
          nonEmpty: 'Введите имя',
          regex: 'Имя может содержать символы A-z; А-я; -; апостроф; пробел',
          min: 'Минимальное количество символов 1',
          max: 'Максимальное количество символов 50',
        },

        lastNameField: {
          nonEmpty: 'Введите фамилию',
          regex: 'Фамилия может содержать символы A-z; А-я; -; апостроф; пробел',
          min: 'Минимальное количество символов 1',
          max: 'Максимальное количество символов 50',
        },

        avatarError: {
          size: 'Ошибка! Размер фото не должен превышать 10 MB',
          format: 'Ошибка! Формат загружаемой фотографии должен быть PNG или JPEG',
        },

        refine: 'Пользователь младше 13 лет не может создать профиль.',
        aboutMeError: 'Максимальное количество знаков 200',
      },
    },

    devices: {
      currentDevice: 'Текущее устройство',
      activeSessions: 'Активная сессия',
      terminateAllOtherSession: 'Завершить все остальные сеансы',
      lastVisit: 'Последнее посещение',
    },

    accountManagement: {
      currentSubscription: 'Текущая подписка',
      accountType: 'Тип аккаунта:',
      personal: 'Личный',
      business: 'Бизнес',
      yourSubscriptionCost: 'Cтоимость вашей подписки:',
      oneDay: 'за 1 день',
      sevenDay: 'за 7 дней',
      oneMonth: 'за месяц',
      or: 'или',
      paymentWasSuccessful: 'Платеж прошел успешно!',
      success: 'Успех',
      ok: 'ОК',
      error: 'Ошибка',
      transactionFailed: 'Транзакция не удалась. Пожалуйста, напишите в поддержку',
      backToPayment: 'Вернуться к оплате',
      expireAt: 'Дата окончания подписки',
      nextPayment: 'Следующий платеж',
      autoRenewal: 'Автоматическое продление',
    },

    myPayment: {},
  },
  posts: {
    createPost: {
      addPostPhoto: 'Добавить фото',
      selectFromComputer: 'Выбрать с компьютера',
      cropping: 'Редактирование',
      showResult: 'Показать результат',
      next: 'Далее',
      filters: 'Фильтры',
      publication: 'Публикация',
      addDescription: 'Добавить описание публикации',
      publish: 'Опубликовать',
      openDraft: 'Открыть черновик',

      areYouSure:
        'Вы действительно хотите отменить создание публикации? Все изменения будут потеряны',
      discard: 'Сбросить',
      saveDraft: 'Сохранить',
      close: 'Закрыть',
    },
    editPost: {
      comment: 'Добавить комментарий ...',
      edit: 'Изменить',
      delete: 'Удалить',
      closePost: 'Закрыть пост',
      question:
        'Вы действительно хотите выйти из редактирования публикации? Все изменения будут потеряны',
      yes: 'Да',
      no: 'Нет',
      save: 'Сохранить',
      publish: 'Опубликовать',
    },
    deletePost: {
      delete: 'Удалить пост',
      areYouSure: 'Вы действительно хотите удалить пост?',
      yes: 'Да',
      no: 'Нет',
    },
  },

}

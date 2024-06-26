export const en = {
  auth: {
    Return: 'Return',
    agree: 'I agree to the',
    alreadyConfirmedEmail: 'Your email is already confirmed',
    and: 'and',
    // error fields block start =======================================================
    authErrors: {
      emailField: {
        email: 'Invalid email address',
        nonEmpty: 'Enter email',
      },
      password: {
        max: 'Max number of characters 20',
        min: 'Min number of characters 6',
        nonEmpty: 'Enter password',
        regex: 'Password must contain A-z, 0-9, !#$%*+-?^_',
      },
      passwordConfirm: 'Confirm your password',
      recaptcha: {
        expired: 'Verification expired. Check the checkbox\n' + 'again.',
        notARobot: 'I’m not a robot',
        verifyPlease: 'Please verify that you are not a robot',
      },
      refine: 'The passwords must match',
      terms: 'Please, review and agree to the Terms of service and Privacy policy to proceed',
      usernameField: {
        max: 'Max number of characters 30',
        min: 'Min number of characters 6',
        nonEmpty: 'Enter username',
        regex: 'Username can contain only A-Z, a-z, - or _',
      },
    },
    backToSignIn: 'Back to Sign In',
    backToSignUp: 'Back to Sign Up',
    codeIncorrect: 'Code is incorrect',
    confirmationCodeExpired: 'Email confirmation code is expired',
    confirmedEmail: 'Your email has been confirmed',
    congratulations: 'Congratulations',
    createNewPassword: 'Create new password',
    dontHaveAccount: 'Don’t have an account?',
    email: 'Email',
    emailConfirm(email: string) {
      return `We have sent a link to confirm your email to ${email}`
    },
    emailSent: 'Email sent',
    emailVerificationLink: 'Email verification link expired',
    forgotPassword: 'Forgot password?',
    forgotPasswordTitle: 'Forgot password',
    haveAccount: 'Do you have an account?',
    instructions: 'Enter your email address and we will send you further instructions',
    linkHasBeenSent:
      'The link has been sent by email. If you dont receive an email send link again',
    logInHeader: 'Log in',
    newPassword: 'New password',
    ok: 'OK',
    password: 'Password',
    passwordChanged: 'Your password was successfully changed',
    passwordCharacters: 'Your password must be between 6 and 20 characters',
    passwordConfirmation: 'Password confirmation',
    policy: 'Privacy policy',
    privacyAndTermsPages: {
      textOfPrivacy: `We have adopted this Privacy policy, which defines how we handle the information collected by https://inctagram.space, as well as the reasons why we should collect certain personal data about you. Therefore, before using the https://inctagram.space, please read this Privacy policy. We take care of your personal data and are committed to ensuring their confidentiality and security.
      Personal data that we collect.
      When you visit https://inctagram.space, we automatically collect certain information about your device, including information about your web browser, IP address, time zone and some cookies installed on your device. In addition, when you browse the Site, we collect information about individual web pages or products that you view, which websites or search terms brought you to the Site and how you interact with the Site. We call this automatically collected information "Device Information". In addition, we may collect personal data that you provide to us (including, but not limited to, first name, last name, address, payment information, etc.) during registration in order to be able to fulfill the agreement.
      
      Why do we process your data?
      Our main priority is the security of customer data, and therefore we can process only minimal user data, exactly as much as is absolutely necessary for the maintenance of the website. The information collected automatically is used only to identify potential cases of abuse and to obtain statistical information about the use of the website. This statistical information is not otherwise aggregated in such a way as to identify any particular user of the system.
      You can visit the website without telling us who you are and without disclosing any information by which someone can identify you as a specific, identifiable person. However, if you want to use some functions of the website or want to receive our newsletter or provide other information by filling out the form, you can provide us with personal data, such as your email address, first name, last name, city of residence, organization, phone number. You may not provide us with your personal data, but then you will not be able to use some of the functions of the website. Users who are not sure which information is mandatory can contact us at inctagram.pg@gmail.com.
      
      Your rights:
      If you are a resident of Europe, you have the following rights related to your personal data:
      •	The right to receive information.
      •	Access rights.
      •	The right to correction.
      •	The right to erase.
      •	The right to restrict processing.
      •	The right to data portability.
      •	Right to object.
      •	Rights regarding automated decision-making and profiling.
      If you would like to exercise this right, please contact us using the contact information below. In addition, if you are a resident of Europe, we note that we process your information to fulfill contracts that we may have with you (for example, if you place an order through the Site), or otherwise to fulfill our legitimate business interests listed above. Also, please note that your information may be transferred outside of Europe, including Canada and the USA.
      Links to other sites.
      Our website may contain links to other websites that are not owned or controlled by us. Please keep in mind that we are not responsible for such other websites or the privacy policies of third parties. We recommend that you be aware when you leave our website and read the privacy statements of each website that may collect personal information.
      Information security.
      We protect the information you provide on computer servers in a controlled, secure environment, protected from unauthorized access, use or disclosure. We take reasonable administrative, technical and physical precautions to protect against unauthorized access, use, modification and disclosure of personal data under its control and storage. However, data transmission over the Internet or a wireless network cannot be guaranteed.
      Legal disclosure.
      We will disclose any information we collect, use or receive if required or permitted by law, such as to comply with a subpoena or similar legal process, and when we believe in good faith that disclosure is necessary to protect our rights, your safety or the safety of others, investigate fraud, or respond to a government request.
      Contacts.
      If you would like to contact us to learn more about this Policy, or would like to contact us with any question regarding individual rights and your personal information, you can send an email to inctagram.pg@gmail.com.
      
      `,
      textOfTerms: ` We agree to provide you with the Instagram Service. The service will help you stay in touch with the people important to you and be aware of what you are interested in. The service includes the following components:
      •	Offering personalized opportunities to create and search for content, communicate and share experiences and impressions with other people.
      •	Ensuring security, integrity and security when using Inctagram.
      •	Developing and using technologies that help us support our growing community.
      •	Communication with you.
      •	Providing access to our Service.
      
      Your obligations.
      In exchange for our commitment to provide the Service, you must assume the following obligations to us.
      Who can use Inctagram. We want our Service to be as open and accessible to everyone as possible, but at the same time safe, protected and compliant with legal requirements. Therefore, in order to become a part of the Instagram community, you must comply with certain restrictions.
      •	You must be at least 13 years old.
      •	You should not be prohibited from receiving any of the components of our Service in accordance with applicable law or using Services related to payments if you are on the current lists of prohibited persons.
      •	Your account should not be previously disabled by us for violating the law or any of our rules.
      •	You should not be convicted of a sexual offense.
      Prohibited ways of using Inctagram. Providing a secure and open Service to the wider community requires that each of us follow the rules.
      •	You have no right to impersonate other people or provide inaccurate information.
      •	You have no right to commit illegal, misleading or deceptive actions or other actions for illegal or unauthorized purposes.
      •	You have no right to interfere with the normal operation of the Service or interfere with its operation.
      •	You have no right to attempt to create accounts, collect information or access it by unauthorized means.
      •	You have no right to sell, license or purchase any accounts or data received from us or from our Service.
      •	You have no right to publish personal or confidential information of users without permission or otherwise violate anyone's rights, including intellectual property rights (for example, by violating copyright, trademark rights, distribution of counterfeit or pirated goods).
      •	You may not modify, translate or reconstruct any of our products or their components or attempt to create derivative works based on them.
      The permissions you grant us. As part of our agreement, you also give us the permissions necessary to provide the Service.
      •	We do not claim ownership of your content, but you give us a license to use it.
      •	Use of your username, profile photo and information about your relationships and actions in connection with accounts, ads and advertising content.
      •	You agree that we may download and install Service updates on your device.
      
      `,

      titleOfPrivacyPolicy: 'Privacy policy',
      titleOfTermsOfService: 'Terms of service',
    },
    resendVerificationLinkTitle: 'Resend verification link',
    sendLink: 'Send Link',
    sendLinkAgain: 'Send Link Again',
    signIn: 'Sign In',
    signUp: 'Sign Up',
    signUpHeader: 'Sign up',
    signUpTerms: {
      description: 'I agree to the <1>Terms of service</1> and <2>Privacy policy</2>',
    },
    signUpTitle: 'Registration',
    termsOfService: 'Terms of service',
    userName: 'Username',
    verificationLinkExpired: 'Looks like the verification link has expired. Not to worry, we can send the link again',

    wasCreateNewPassword: 'New password was created',
//
    wereSorry: 'We\'re sorry',

    // error fields block end =======================================================
  },

  locale: {
    english: 'Английский',
    language: 'Language',
    russian: 'Русский',
  },

  posts: {
    createPost: {
      addDescription: 'Add publication description',
      addPostPhoto: 'Add photo',
      areYouSure:
        'Do you really want to close the creation of a publication? If you close everything will be deleted',
      close: 'Close',
      cropping: 'Cropping',
      discard: 'Discard',
      filters: 'Filters',
      next: 'Next',
      openDraft: 'Open draft',
      publication: 'Publication',
      publish: 'Publish',
      saveDraft: 'Safe draft',
      selectFromComputer: 'Select from computer',
      showResult: 'Show result',
    },
    deletePost: {
      areYouSure: 'Are you sure you want to delete this post?',
      delete: 'Delete post',
      no: 'No',
      yes: 'Yes',
    },
    editPost: {
      closePost: 'Close post',
      comment: 'Add a comment ...',
      delete: 'Delete post',
      edit: 'Edit post',
      no: 'No',
      publish: 'Publish',
      question:
        'Do you really want to close the edition of the publication? If you close changes won`t be saved',
      save: 'Save changes',
      yes: 'Yes',
    },
  },

  profile: {

    aboutYourself: 'tell about yourself',
    confirmLogout(email: string) {
      return `Are you really want to log out of your account ${email}?`
    },
    descriptionError: {
      error: 'Max number of characters 500',
    },
    next: 'Next',
    no: 'No',
    passwordChanged: 'Your password was successfully changed',
    profileSettings: 'Profile settings',
    publications: 'Publications',
    save: 'Save',
    subscribers: 'Subscribers',
    subscriptions: 'Subscriptions',
    yes: 'Yes',
  },

  profileSetting: {

    accountManagement: {
      accountType: 'Account type:',
      autoRenewal: 'Auto-Renewal',
      backToPayment: 'Back to payment',
      business: 'Business',
      currentSubscription: 'Current Subscription',
      error: 'Error',
      expireAt: 'Expire at',
      nextPayment: 'Next payment',
      ok: 'OK',
      oneDay: 'per 1 Day',
      oneMonth: 'per month',
      or: 'or',
      paymentWasSuccessful: 'Payment was successful!',
      personal: 'Personal',
      sevenDay: 'per 7 Day',
      success: 'Success',
      transactionFailed: 'Transaction failed. Please, write to support',
      yourSubscriptionCost: 'Your subscription cost:',
    },

    devices: {
      activeSessions: 'Active sessions',
      currentDevice: 'Current device',
      lastVisit: 'Last visit',
      otherDevices: 'You have not yet logged in from other devices',
      terminateAllOtherSession: 'Terminate all other session',
    },
    generalInformation: {
      aboutMe: 'About me',
      addAProfilePhoto: 'Add a profile photo',
      areYouSure: 'Do you really want to delete your profile photo?',
      changesSaved: 'Your settings are saved',
      city: 'City',
      country: 'Country',
      dateOfBirthday: 'Date of birthday',
      delete: 'Delete',
      deletePhoto: 'Delete photo',
      edit: 'Edit',
      firstName: 'First name',
      generalInformationErrors: {

        aboutMeError: 'Max number of characters 200',

        avatarError: {
          format: 'Error! The format of the uploaded photo must be PNG or JPEG',
          size: 'Error! Photo size must be less than 10 MB',
        },

        firstNameField: {
          max: 'Max number of characters 50',
          min: 'Min number of characters 1',
          nonEmpty: 'Enter first name',
          regex: 'First name can contain only A-z; А-я',
        },

        incorrectInput: 'Incorrect input type.',

        lastNameField: {
          max: 'Max number of characters 50',
          min: 'Min number of characters 1',
          nonEmpty: 'Enter last name',
          regex: 'Last name can contain only A-z; А-я',
        },
        minLength: 'Minimum input length 3',
        refine: 'A user under 13 cannot create a profile.',
        usernameField: {
          max: 'Max number of characters 30',
          min: 'Min number of characters 6',
          nonEmpty: 'Enter username',
          regex: 'Username can contain only A-Z, a-z, - or _',
        },
      },
      lastName: 'Last name',
      no: 'No',
      original: 'Original',
      placeholderTextArea: 'Please enter at least 1 character or space',
      save: 'Save',
      saveChanges: 'Save changes',
      selectFromComputer: 'Select from computer',
      selectYourCity: 'Select your city',
      selectYourCountry: 'Select your country',
      userName: 'Username',

      yes: 'Yes',
    },
    myPayment: {},
    setting: {
      accountManagement: 'Account management',
      devices: 'Devices',
      generalInformation: 'General information', // eslint-disable-next-line max-lines
      myPayment: 'My payments',
    },

  },
  sidebar: {
    createPost: 'Create',
    favorites: 'Favorites',
    home: 'Home',
    logout: 'Log Out',
    messenger: 'Messenger',
    myProfile: 'My profile',
    search: 'Search',
    statistics: 'Statistics',
  },
}

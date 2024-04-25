import React, { memo, useState } from 'react'

import PayPal from '@/public/icon/payPalIcon.svg'
import Stripe from '@/public/icon/stripeIcon.svg'
import { useTranslate } from '@/shared/hooks'
import { Button } from '@/ui/button'
import { Checkbox } from '@/ui/checkbox'
import { Modal } from '@/ui/modal'
import { RadioButton } from '@/ui/radioButton'
import { Typography } from '@/ui/typography'

import s from '@/entities/profile/settings/accountManagement/ui/accountManagement.module.scss'

export const AccountManagement = memo(function AccountManagement() {
  const { t } = useTranslate()
  const account = [
    { id: '1', label: t.profileSetting.accountManagement.personal },
    { id: '2', label: t.profileSetting.accountManagement.business },
  ]
  const [openModalSuccess, setOpenModalSuccess] = useState<boolean>(false)
  const [openModalError, setOpenModalError] = useState<boolean>(false)
  const [valueChangeAccount, setValueChangeAccount] = useState('1')
  const onValueChangeAccount = (valueChange: string) => {
    setValueChangeAccount(valueChange)
  }

  const cost = [
    { id: '3', label: '$10' + ' ' + t.profileSetting.accountManagement.oneDay },
    { id: '4', label: '$50' + ' ' + t.profileSetting.accountManagement.sevenDay },
    { id: '5', label: '$100' + ' ' + t.profileSetting.accountManagement.oneMonth },
  ]
  const [valueChangeCost, setValueChangeCost] = useState('3')
  const onValueChangeCost = (valueChange: string) => {
    setValueChangeCost(valueChange)
  }
  const onModalActionSuccess = async () => {
    setOpenModalSuccess(false)
  }
  const onModalActionError = async () => {
    setOpenModalError(false)
  }
  const onModalClose = () => {
    setOpenModalSuccess(false)
    setOpenModalError(false)
  }
  const onClickOpenModalSuccess = () => {
    setOpenModalSuccess(true)
  }
  const onClickOpenModalError = () => {
    setOpenModalError(true)
  }
  const [paymentActive, setPaymentActive] = useState(false)
  const onClickPaymentActive = () => {
    setPaymentActive(!paymentActive)
  }
  const [autoRenewal, setAutoRenewal] = useState(false)
  const autoRenewalChecked = () => {
    setAutoRenewal(!autoRenewal)
  }

  return (
    <>
      <div className={s.accountManagement}>
        {paymentActive && (
          <div className={s.currentSubscriptionWrapper}>
            <Typography className={s.currentSubscription} variant={'h3'}>
              {t.profileSetting.accountManagement.currentSubscription}
            </Typography>
            <div className={s.subscriptionWrapper}>
              <div className={s.subscription}>
                <div className={s.expire}>
                  <Typography className={s.titleExpire} variant={'regular14'}>
                    {t.profileSetting.accountManagement.expireAt}
                  </Typography>
                  <div>12.12.2022</div>
                </div>
                {autoRenewal && (
                  <div className={s.nextPayment}>
                    <Typography className={s.titleNextPayment} variant={'regular14'}>
                      {t.profileSetting.accountManagement.nextPayment}
                    </Typography>
                    <div>13.02.2023</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        {paymentActive && (
          <div className={s.autoRenewal}>
            <Checkbox
              checked={autoRenewal}
              label={t.profileSetting.accountManagement.autoRenewal}
              onChange={autoRenewalChecked}
            />
          </div>
        )}
        <div className={s.accountTypeWrapper}>
          <Typography className={s.accountType} variant={'h3'}>
            {t.profileSetting.accountManagement.accountType}
          </Typography>
          <div className={s.accountWrapper}>
            <div className={s.account}>
              <div className={s.accountProperty}>
                {account.map(t => (
                  <RadioButton
                    key={t.id}
                    onValueChange={onValueChangeAccount}
                    options={[{ label: t.label, value: t.id }]}
                    value={valueChangeAccount}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        {valueChangeAccount === account[1].id && (
          <div className={s.yourSubscriptionCostWrapper}>
            <Typography className={s.yourSubscriptionCost} variant={'h3'}>
              {t.profileSetting.accountManagement.yourSubscriptionCost}
            </Typography>
            <div className={s.costWrapper}>
              <div className={s.account}>
                <div className={s.accountProperty}>
                  {cost.map(t => (
                    <RadioButton
                      key={t.id}
                      onValueChange={onValueChangeCost}
                      options={[{ label: t.label, value: t.id }]}
                      value={valueChangeCost}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className={s.paySystemWrapper}>
              <button
                // disabled={isLoading}
                className={s.paySystem}
                onClick={() => console.log('PayPal')}
              >
                <PayPal />
              </button>
              {t.profileSetting.accountManagement.or}
              <button
                // disabled={isLoading}
                className={s.paySystem}
                onClick={() => console.log('Stripe')}
              >
                <Stripe />
              </button>
            </div>
          </div>
        )}
      </div>
      <Modal
        actionButtonName={t.profileSetting.accountManagement.ok}
        fullWidthButton
        modalWidth={'sm'}
        onAction={onModalActionSuccess}
        onClose={onModalClose}
        open={openModalSuccess}
        title={t.profileSetting.accountManagement.success}
      >
        <Typography className={s.textModal} variant={'regular16'}>
          {t.profileSetting.accountManagement.paymentWasSuccessful}
        </Typography>
      </Modal>
      <Modal
        actionButtonName={t.profileSetting.accountManagement.backToPayment}
        fullWidthButton
        modalWidth={'sm'}
        onAction={onModalActionError}
        onClose={onModalClose}
        open={openModalError}
        title={t.profileSetting.accountManagement.error}
      >
        <Typography className={s.textModal} variant={'regular16'}>
          {t.profileSetting.accountManagement.transactionFailed}
        </Typography>
      </Modal>
      <Button onClick={onClickOpenModalSuccess}>Open Modal Success</Button>
      <Button onClick={onClickOpenModalError}>Open Modal Error</Button>
      <Button onClick={onClickPaymentActive}>Payment Active</Button>
    </>
  )
})

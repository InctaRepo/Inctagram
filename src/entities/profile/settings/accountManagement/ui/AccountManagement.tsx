import React, { useState } from 'react'

import s from '@/entities/profile/settings/accountManagement/ui/accountManagement.module.scss'
import PayPal from '@/public/icon/payPalIcon.svg'
import Stripe from '@/public/icon/stripeIcon.svg'
import { useTranslate } from '@/shared/hooks'
import { Button } from '@/ui/button'
import { Checkbox } from '@/ui/checkbox'
import { Modal } from '@/ui/modal'
import { RadioButton } from '@/ui/radioButton'
import { Typography } from '@/ui/typography'

type Props = {}
export const AccountManagement = ({}: Props) => {
  const { t } = useTranslate()
  const account = [
    { label: t.profileSetting.accountManagement.personal, id: '1' },
    { label: t.profileSetting.accountManagement.business, id: '2' },
  ]
  const [openModalSuccess, setOpenModalSuccess] = useState<boolean>(false)
  const [openModalError, setOpenModalError] = useState<boolean>(false)
  const [valueChangeAccount, setValueChangeAccount] = useState('1')
  const onValueChangeAccount = (valueChange: string) => {
    setValueChangeAccount(valueChange)
  }

  const cost = [
    { label: '$10' + ' ' + t.profileSetting.accountManagement.oneDay, id: '3' },
    { label: '$50' + ' ' + t.profileSetting.accountManagement.sevenDay, id: '4' },
    { label: '$100' + ' ' + t.profileSetting.accountManagement.oneMonth, id: '5' },
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
            <Typography variant={'h3'} className={s.currentSubscription}>
              {t.profileSetting.accountManagement.currentSubscription}
            </Typography>
            <div className={s.subscriptionWrapper}>
              <div className={s.subscription}>
                <div className={s.expire}>
                  <Typography variant={'regular14'} className={s.titleExpire}>
                    {t.profileSetting.accountManagement.expireAt}
                  </Typography>
                  <div>12.12.2022</div>
                </div>
                {autoRenewal && (
                  <div className={s.nextPayment}>
                    <Typography variant={'regular14'} className={s.titleNextPayment}>
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
              onChange={autoRenewalChecked}
              label={t.profileSetting.accountManagement.autoRenewal}
            />
          </div>
        )}
        <div className={s.accountTypeWrapper}>
          <Typography variant={'h3'} className={s.accountType}>
            {t.profileSetting.accountManagement.accountType}
          </Typography>
          <div className={s.accountWrapper}>
            <div className={s.account}>
              <div className={s.accountProperty}>
                {account.map(t => (
                  <RadioButton
                    key={t.id}
                    onValueChange={onValueChangeAccount}
                    value={valueChangeAccount}
                    options={[{ label: t.label, value: t.id }]}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        {valueChangeAccount === account[1].id && (
          <div className={s.yourSubscriptionCostWrapper}>
            <Typography variant={'h3'} className={s.yourSubscriptionCost}>
              {t.profileSetting.accountManagement.yourSubscriptionCost}
            </Typography>
            <div className={s.costWrapper}>
              <div className={s.account}>
                <div className={s.accountProperty}>
                  {cost.map(t => (
                    <RadioButton
                      key={t.id}
                      onValueChange={onValueChangeCost}
                      value={valueChangeCost}
                      options={[{ label: t.label, value: t.id }]}
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
        modalWidth={'sm'}
        title={t.profileSetting.accountManagement.success}
        open={openModalSuccess}
        actionButtonName={t.profileSetting.accountManagement.ok}
        onClose={onModalClose}
        onAction={onModalActionSuccess}
        fullWidthButton={true}
      >
        <Typography variant={'regular16'} className={s.textModal}>
          {t.profileSetting.accountManagement.paymentWasSuccessful}
        </Typography>
      </Modal>
      <Modal
        modalWidth={'sm'}
        title={t.profileSetting.accountManagement.error}
        open={openModalError}
        actionButtonName={t.profileSetting.accountManagement.backToPayment}
        onClose={onModalClose}
        onAction={onModalActionError}
        fullWidthButton={true}
      >
        <Typography variant={'regular16'} className={s.textModal}>
          {t.profileSetting.accountManagement.transactionFailed}
        </Typography>
      </Modal>
      <Button onClick={onClickOpenModalSuccess}>Open Modal Success</Button>
      <Button onClick={onClickOpenModalError}>Open Modal Error</Button>
      <Button onClick={onClickPaymentActive}>Payment Active</Button>
    </>
  )
}

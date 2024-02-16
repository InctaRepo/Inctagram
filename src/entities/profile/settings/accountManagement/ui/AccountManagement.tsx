import React, { useState } from 'react'

import s from '@/entities/profile/settings/accountManagement/ui/accountManagement.module.scss'
import PayPal from '@/public/icon/payPalIcon.svg'
import Stripe from '@/public/icon/stripeIcon.svg'
import { useTranslate } from '@/shared/hooks'
import { RadioButton } from '@/ui/radioButton'
import { Typography } from '@/ui/typography'

type Props = {}
export const AccountManagement = ({}: Props) => {
  const { t } = useTranslate()
  const account = [
    { label: t.profileSetting.accountManagement.personal, id: '1' },
    { label: t.profileSetting.accountManagement.business, id: '2' },
  ]
  const [valueChangeAccount, setValueChangeAccount] = useState('1')
  const onValueChangeAccount = (valueChange: string) => {
    setValueChangeAccount(valueChange)
  }

  const cost = [
    { label: '$10' + ' ' + t.profileSetting.accountManagement.oneDay, id: '1' },
    { label: '$50' + ' ' + t.profileSetting.accountManagement.sevenDay, id: '2' },
    { label: '$100' + ' ' + t.profileSetting.accountManagement.oneMonth, id: '3' },
  ]
  const [valueChangeCost, setValueChangeCost] = useState('1')
  const onValueChangeCost = (valueChange: string) => {
    setValueChangeCost(valueChange)
  }

  return (
    <>
      <div className={s.accountManagement}>
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
        {valueChangeAccount === cost[1].id && (
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
    </>
  )
}

import { toast } from 'react-toastify'

import { clsx } from 'clsx'

import s from '@/ui/alertToast/alertToast.module.scss'

export const AlertToast = (error: boolean, text: string) => {
  const classNames = {
    toast: s.toast,
    toastClose: s.toastClose,
    toastContent: s.toastContent,
    toastText: s.toastText,
    wrapper: clsx(s.wrapper, error ? s.error : s.success),
  }

  const customId = 'toast-id'

  return toast(
    <div className={classNames.toastContent}>
      <div className={classNames.toastText}>
        {error && <b>Error! </b>}
        {text}
      </div>
    </div>,
    {
      bodyClassName: classNames.toast,
      className: classNames.wrapper,
      toastId: customId, // to prevent toast duplicate into stack
    }
  )
}

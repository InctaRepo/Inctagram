import { clsx } from 'clsx'
import { toast } from 'react-toastify'

import s from '@/src/shared/ui/alertToast/alertToast.module.scss'

export const AlertToast = (error: boolean, text: string) => {
  const classNames = {
    wrapper: clsx(s.wrapper, error ? s.error : s.success),
    toast: s.toast,
    toastText: s.toastText,
    toastContent: s.toastContent,
    toastClose: s.toastClose,
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
      toastId: customId, // to prevent toast duplicate into stack
      className: classNames.wrapper,
      bodyClassName: classNames.toast,
    }
  )
}

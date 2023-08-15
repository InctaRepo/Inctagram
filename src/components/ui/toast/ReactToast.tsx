import { clsx } from 'clsx'
import { toast } from 'react-toastify'

import s from './react-toast.module.scss'

export const ReactToast = (error: boolean = false, text: string) => {
  const classNames = {
    wrapper: clsx(s.wrapper, error ? s.error : s.success),
    toast: s.toast,
    toastText: s.toastText,
    toastContent: s.toastContent,
    toastClose: s.toastClose,
  }

  return toast(
    <div className={classNames.toastContent}>
      <div className={classNames.toastText}>
        {error && <b>Error! </b>}
        {text}
      </div>
    </div>,
    {
      className: classNames.wrapper,
      bodyClassName: classNames.toast,
    }
  )
}

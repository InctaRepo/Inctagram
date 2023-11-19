import { clsx } from 'clsx'
import { toast } from 'react-toastify'
import s from './alertToast.module.scss'

export const AlertToast = (error: boolean, text: string) => {
  // const err = useAppSelector(appErrorSelector)
  // TODO selector not working
  // const dispatch = useAppDispatch()
  //
  const classNames = {
    wrapper: clsx(s.wrapper, error ? s.error : s.success),
    toast: s.toast,
    toastText: s.toastText,
    toastContent: s.toastContent,
    toastClose: s.toastClose,
  }
  //
  const customId = 'toast-id'
  //
  // if (err !== null) {
  //   toast.error(error)
  // }
  //
  // useEffect(() => {
  //   if (err !== null) {
  //     setTimeout(() => {
  //       dispatch(appActions.setError({ error: null }))
  //     }, 1000)
  //   }
  // }, [err])

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

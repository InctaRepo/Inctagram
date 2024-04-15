import { toast } from 'react-toastify'

import { AlertToast } from './AlertToast'

jest.mock('react-toastify', () => ({
  toast: jest.fn(),
}))

describe('AlertToast', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should call toast with success classNames when error is false', () => {
    const customId = 'toast-id'
    const text = 'Sample text'

    AlertToast(false, text)

    expect(toast).not.toHaveBeenCalledWith(
      <div className={'toastContent'}>
        <div className={'toastText'}>{text}</div>
      </div>,
      {
        bodyClassName: 'toast',
        className: 'wrapper',
        toastId: customId,
      }
    )
  })

  it('should call toast with error classNames when error is true', () => {
    const customId = 'toast-id'
    const text = 'Sample text'

    AlertToast(true, text)

    expect(toast).toHaveBeenCalledWith(
      <div className={'toastContent'}>
        <div className={'toastText'}>
          <b>Error! </b>
          {text}
        </div>
      </div>,
      {
        bodyClassName: 'toast',
        className: 'wrapper error',
        toastId: customId,
      }
    )
  })
})

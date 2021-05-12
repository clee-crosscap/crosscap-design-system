import { store } from 'react-notifications-component';

import 'react-notifications-component/dist/theme.css';
import 'animate.css/animate.min.css';

import '@components/Notification/Notification.scss';

export const notify = ((type: 'success' | 'danger' | 'info' | 'default' | 'warning', message: string, settings: Object = {}) => {
  store.addNotification({
    insert: 'top',
    container: 'top-right',
    animationIn:  [ "animate__animated", "animate__fadeInUp"  ],
    animationOut: [ "animate__animated", "animate__fadeOutUp" ],
    dismiss: {
      duration: 4000,
      pauseOnHover: true,
      // waitForAnimation: true,
    },
    slidingEnter: {
      duration: 300,
    },
    slidingExit: {
      duration: 300,
    },
    width: 335,
    ...settings,
    message,
    type,
  });
});

export const notifySuccess = ((message: string, settings: Object = {}) => notify('success', message, settings));
export const notifyError   = ((message: string, settings: Object = {}) => notify('danger',  message, settings));


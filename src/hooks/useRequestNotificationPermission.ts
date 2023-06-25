import {
  requestNotificationPermission,
  withNotificationPermission,
} from "../helpers/js/notificationApi.ts";
import {
  selectNotificationPermission,
  setNotificationPermission,
} from "../store/timerSlice.ts";
import { exhaustiveCheck } from "../helpers/js/exhaustiveCheck.ts";
import { useAppDispatch, useAppSelector } from "../store/hooks.ts";
import { useDisableNotificationsToast } from "./useDisableNotificationsToast.ts";

export const useRequestNotificationPermission = () => {
  const dispatch = useAppDispatch();
  const showDisableNotificationsToast = useDisableNotificationsToast();
  const appNotificationPermission = useAppSelector(
    selectNotificationPermission
  );

  return () =>
    withNotificationPermission((browserPermission) => {
      switch (browserPermission) {
        case "default":
          requestNotificationPermission((newPermission) => {
            dispatch(setNotificationPermission(newPermission));
          });
          break;
        case "denied":
          if (appNotificationPermission !== browserPermission) {
            showDisableNotificationsToast();
          }
          break;
        case "granted":
          break;
        default:
          exhaustiveCheck(browserPermission);
      }
    });
};

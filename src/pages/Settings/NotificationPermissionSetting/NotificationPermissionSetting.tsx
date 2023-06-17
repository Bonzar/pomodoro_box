import {
  requestNotificationPermission,
  withNotificationPermission,
} from "../../../helpers/js/notificationApi.ts";
import {
  selectNotificationPermission,
  setNotificationPermission,
} from "../../../store/timerSlice.ts";
import { NOTIFICATIONS_PERMISSION_DENIED_TOAST_ID } from "../../../helpers/constants.ts";
import { exhaustiveCheck } from "../../../helpers/js/exhaustiveCheck.ts";
import { ToggleButtonSettingType } from "../ToggleButtonSettingType";
import { useAppDispatch, useAppSelector } from "../../../store/hooks.ts";
import { toast } from "sonner";

export const NotificationPermissionSetting = () => {
  const dispatch = useAppDispatch();

  const notificationPermission = useAppSelector(selectNotificationPermission);

  return (
    <ToggleButtonSettingType
      onClick={() => {
        withNotificationPermission((browserPermission) => {
          switch (browserPermission) {
            case "default":
              requestNotificationPermission((newPermission) => {
                dispatch(setNotificationPermission(newPermission));
              });
              break;
            case "denied":
              if (notificationPermission !== browserPermission) {
                dispatch(setNotificationPermission(browserPermission));
              } else {
                toast.error("Уведомления отключены в браузере", {
                  id: NOTIFICATIONS_PERMISSION_DENIED_TOAST_ID,
                  description:
                    "Вначале разрешите получение уведомлений для Pomodoro_box в настройках браузера",
                });
              }
              break;
            case "granted":
              dispatch(
                setNotificationPermission(
                  notificationPermission === "granted" ? "denied" : "granted"
                )
              );
              break;
            default:
              exhaustiveCheck(browserPermission);
          }
        });
      }}
    >
      {notificationPermission === "granted"
        ? "Выключить уведомления"
        : "Включить уведомления"}
    </ToggleButtonSettingType>
  );
};

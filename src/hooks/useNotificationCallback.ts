import { useCallback } from "react";
import { withNotificationPermission } from "../helpers/js/notificationApi.ts";
import { useAppSelector } from "../store/hooks.ts";
import { selectNotificationPermission } from "../store/timerSlice.ts";
import { useDisableNotificationsToast } from "./useDisableNotificationsToast.ts";

export const useNotificationCallback = (notificationCallback: VoidFunction) => {
  const appNotificationPermission = useAppSelector(
    selectNotificationPermission
  );

  const showDisableNotificationsToast = useDisableNotificationsToast();

  return useCallback(() => {
    withNotificationPermission((browserPermission) => {
      if (browserPermission !== "granted") {
        if (browserPermission !== appNotificationPermission) {
          showDisableNotificationsToast();
        }
        return;
      }

      if (appNotificationPermission === "granted") {
        notificationCallback();
      }
    });
  }, [
    appNotificationPermission,
    notificationCallback,
    showDisableNotificationsToast,
  ]);
};

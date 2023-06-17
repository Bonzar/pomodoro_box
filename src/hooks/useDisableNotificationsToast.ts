import { DISABLE_NOTIFICATIONS_TOAST_ID } from "../helpers/constants.ts";
import { setNotificationPermission } from "../store/timerSlice.ts";
import { toast } from "sonner";
import { useAppDispatch } from "../store/hooks.ts";
import { useCallback } from "react";

export const useDisableNotificationsToast = () => {
  const dispatch = useAppDispatch();

  return useCallback(
    () =>
      toast.error("Уведомления запрещены", {
        id: DISABLE_NOTIFICATIONS_TOAST_ID,
        description: "Разрешите их получение в настройках браузера",
        action: {
          label: "Отключить",
          onClick: () => dispatch(setNotificationPermission("denied")),
        },
        duration: Infinity,
      }),
    [dispatch]
  );
};

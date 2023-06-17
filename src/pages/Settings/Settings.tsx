import styles from "./settings.module.css";
import { SettingsDivider } from "./SettingsDivider";
import { LongBreakFrequencySetting } from "./LongBreakFrequencySetting";
import { InstructionsVisibilitySetting } from "./InstractionsVisibilitySetting";
import { WeekdayStartSetting } from "./WeekdayStartSetting";
import { NotificationPermissionSetting } from "./NotificationPermissionSetting";
import { List } from "../../components/ui/List";
import { objOf, pipe } from "ramda";
import { isNotificationInWindow } from "../../helpers/js/notificationApi.ts";
import { isTruthy } from "../../helpers/js/isTruthy.ts";
import { TimerDurationSettings } from "./TimerDurationSettings";

export const Settings = () => (
  <div className={styles.settings}>
    <List
      list={[
        TimerDurationSettings,
        LongBreakFrequencySetting,
        InstructionsVisibilitySetting,
        WeekdayStartSetting,
        isNotificationInWindow && NotificationPermissionSetting,
      ]
        .filter(isTruthy)
        .map(pipe(objOf("as"), (item) => ({ ...item, key: item.as.name })))}
      divider={<SettingsDivider />}
    />
  </div>
);

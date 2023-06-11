import styles from "./pomoCount.module.css";
import { Icon } from "../../../components/ui/Icon/Icon.tsx";
import { TextEl } from "../../../components/ui/TextEl";
import { declensionByNum } from "../../../helpers/js/declensionByNum.ts";
import { Indent } from "../../../components/ui/Indent";
import { getClassName } from "../../../helpers/react/getClassName.ts";

interface IPomoCountProps {
  count: number;
  isNoData?: boolean;
}

export const PomoCount = ({ count, isNoData = false }: IPomoCountProps) => {
  if (isNoData) {
    return (
      <div className={getClassName([styles.content, styles.noData])}>
        <Icon iconName="smilePomo" width={115} height={115} />
      </div>
    );
  }

  return (
    <div className={styles.pomoCount}>
      <div className={styles.content}>
        <Icon iconName="logo" width={78} height={78} />
        <Indent size={10} inline />
        <TextEl
          textSize={24}
          textLineHeight={33}
          textWeight={700}
          textColor="gray-99"
        >
          {"x " + count}
        </TextEl>
      </div>
      <div className={styles.footer}>
        <TextEl
          textSize={24}
          textLineHeight={33}
          textWeight={700}
          textColor="white"
        >
          {count} {declensionByNum(["помидор", "помидора", "помидоров"])(count)}
        </TextEl>
      </div>
    </div>
  );
};

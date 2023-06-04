import styles from "./pomoCount.module.css";
import { Icon } from "../../../components/ui/Icon/Icon.tsx";
import { TextEl } from "../../../components/ui/TextEl";
import { caseByNum } from "../../../helpers/js/caseByNum.ts";
import { Indent } from "../../../components/ui/Indent";

interface IPomoCountProps {
  count: number;
}

export const PomoCount = ({ count }: IPomoCountProps) => (
  <div className={styles.pomoCount}>
    <div className={styles.content}>
      <Icon iconName="logo" width={81} height={81} />
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
        {count} {caseByNum(["помидор", "помидора", "помидоров"])(count)}
      </TextEl>
    </div>
  </div>
);

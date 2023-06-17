import styles from "./instructions.module.css";
import { mergeLeft, objOf, pipe } from "ramda";
import { List } from "../../../components/ui/List";
import { assocRandomKey } from "../../../helpers/react/assocRandomKey.ts";
import { TextEl } from "../../../components/ui/TextEl";
import { Indent } from "../../../components/ui/Indent";

export const Instructions = () => (
  <>
    <Indent size={10} />
    <ul className={styles.instructions}>
      <List
        list={[
          "Добавьте задачу, над которой будете работать",
          "Запустите таймер («помидор»)",
          "Работайте пока «помидор» не прозвонит",
          "Сделайте короткий перерыв (3-5 минут)",
          "Продолжайте работать «помидор» за «помидором», пока задача не будут выполнена. Каждые 4 «помидора» делайте длинный перерыв (15-30 минут).",
        ].map(
          pipe(
            (message) => <TextEl textLineHeight={33}>{message}</TextEl>,
            objOf("children"),
            mergeLeft({ as: "li" as const }),
            assocRandomKey
          )
        )}
      />
    </ul>
  </>
);

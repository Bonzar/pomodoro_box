import styles from "./instructions.module.css";
import { mergeLeft, objOf, pipe } from "ramda";
import { List } from "../../../components/ui/List";
import { assocRandomKey } from "../../../helpers/react/assocRandomKey.ts";
import { TextEl } from "../../../components/ui/TextEl";

export const Instructions = () => (
  <ul className={styles.instructions}>
    <List
      list={[
        "Выберите категорию и напишите название текущей задачи",
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
);
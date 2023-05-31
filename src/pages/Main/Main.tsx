import { Text } from "../../components/ui/Text";
import { Indent } from "../../components/ui/Indent";
import { Button } from "../../components/ui/Button";

export const Main = () => {
  return (
    <>
      <Text as="h1" textSize={24} textWeight={700}>
        Pomodoro timer
      </Text>
      <Indent size={25} />
      <Button btnColor="red">Кнопка</Button>
    </>
  );
};

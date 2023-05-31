import "the-new-css-reset";
import "./assets/styles/main.global.css";
import { Button } from "./components/ui/Button";
import { Layout } from "./components/Layout";
import { Text } from "./components/ui/Text";
import { Indent } from "./components/ui/Indent";

export const App = () => (
  <Layout>
    <Text as="h1" textSize={24} textWeight={700}>
      Pomodoro timer
    </Text>
    <Indent size={25} />
    <Button btnColor="red">Кнопка</Button>
  </Layout>
);

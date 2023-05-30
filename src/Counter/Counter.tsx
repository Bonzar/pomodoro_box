interface ICounterProps {
  value: number;
  onButtonClick: () => void;
}

export const Counter = ({ onButtonClick, value }: ICounterProps) => (
  <>
    <button onClick={onButtonClick}>count is {value}</button>
  </>
);

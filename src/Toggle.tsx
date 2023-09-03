import './Toggle.css';

type Props = {
  isOn: boolean;
  setIsOn: (state: boolean) => void;
};

const Toggle = ({ isOn, setIsOn }: Props) => (
  <div className="toggle" onClick={() => setIsOn(!isOn)}>
    <div className={isOn ? 'circle on' : 'circle off'} />
  </div>
);

export default Toggle;

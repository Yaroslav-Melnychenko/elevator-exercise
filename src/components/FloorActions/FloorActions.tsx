import styles from './FloorActions.module.scss';

interface Props {
  floorNumber: number,
  disabled: boolean,
  callElevator: () => void
};

const FloorActions: React.FC<Props> = ({ floorNumber, disabled, callElevator }) => (
  <div className={styles.container}>
    <div className={styles.label}>
      {floorNumber}
    </div>
    <button
      disabled={disabled}
      type="button"
      className={styles.button}
      onClick={callElevator}
    />
  </div>
);

export default FloorActions;

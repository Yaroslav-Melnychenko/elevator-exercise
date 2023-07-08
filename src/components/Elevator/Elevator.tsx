import styles from './Elevator.module.scss';

interface Props {
  floor: number
}

const Elevator: React.FC<Props> = ({ floor }) => {
  return (
    <div
      className={styles.container}
      style={{
        transform: `translateY(-${(floor * 70)}px)`
      }}
    />
  )
}

export default Elevator;

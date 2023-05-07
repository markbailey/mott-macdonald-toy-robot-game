import { Children, PropsWithChildren } from 'react';
import styles from '../assets/stylesheets/components/action-bar.module.scss';

function ActionBar(props: PropsWithChildren) {
  const { children } = props;
  return (
    <footer className={styles.actionBar}>
      {Children.map(children, (child) => (
        <div className={styles.slot}>{child}</div>
      ))}
    </footer>
  );
}

export default ActionBar;

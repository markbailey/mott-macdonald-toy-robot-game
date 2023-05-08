import { HTMLAttributes } from 'react';

import Button from '../components/Button';
import css from '../assets/stylesheets/views/menu-view.module.scss';

export type MenuViewProps = HTMLAttributes<HTMLDivElement> & {
  onStartGame(level: number): void;
};

function MenuView(props: MenuViewProps) {
  const { onStartGame, ...otherProps } = props;
  const onStartGameClick = (level: number) => () => onStartGame(level);

  return (
    <div {...otherProps}>
      <div className={css.buttonList}>
        <Button onClick={onStartGameClick(1)}>Start New Game</Button>
        <Button onClick={onStartGameClick(0)}>Free Play</Button>
      </div>
    </div>
  );
}

export default MenuView;

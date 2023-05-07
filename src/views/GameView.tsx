import classNames from 'classnames';
import { HTMLAttributes, useState } from 'react';

import GameBoard from '../components/GameBoard';
import useGame from '../hooks/useGame';
import Button, { ButtonProps } from '../components/Button';
import css from '../assets/stylesheets/views/game-view.module.scss';
import ActionBar from '../components/ActionBar';
import Entity, { Robot } from '../components/Entity';

export type GameViewProps = HTMLAttributes<HTMLDivElement>;

const IsometricButton = (props: ButtonProps) => {
  const { className: classNameProp, ...otherProps } = props;
  const className = classNames(css.isometricButton, classNameProp);
  return <Button {...otherProps} iconOnly className={className} />;
};

function GameView(props: GameViewProps) {
  const [level, setLevel] = useState(1);
  const [isometric, setIsometric] = useState(false);
  const { board, entities } = useGame(level);

  const { className: classNameProp, ...otherProps } = props;
  const className = classNames(css.view, classNameProp);

  return (
    <div {...otherProps} className={className}>
      <GameBoard
        rows={board.rows}
        columns={board.columns}
        entities={entities}
        isometric={isometric}
      />

      <ActionBar>
        <Robot facing="SOUTH" insult={null} />
        <Entity type="wall" />
      </ActionBar>
    </div>
  );
}

export default GameView;

import classNames from 'classnames';
import { HTMLAttributes, useState } from 'react';

import GameBoard from '../components/GameBoard';
import css from '../assets/stylesheets/views/game-view.module.scss';
import useGame from '../hooks/useGame';

export type GameViewProps = HTMLAttributes<HTMLDivElement>;

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
    </div>
  );
}

export default GameView;

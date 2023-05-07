import classNames from 'classnames';
import { HTMLAttributes, useState, useTransition, DragEvent } from 'react';

import GameBoard from '../components/GameBoard';
import useGame from '../hooks/useGame';
import Button from '../components/Button';
import ActionBar from '../components/ActionBar';
import Entity, { Robot } from '../components/Entity';
import css from '../assets/stylesheets/views/game-view.module.scss';

export type GameViewProps = HTMLAttributes<HTMLDivElement> & {
  startLevel: number;
  onExit(): void;
};

function GameView(props: GameViewProps) {
  const { className: classNameProp, startLevel, onExit, ...otherProps } = props;
  const [level, setLevel] = useState(startLevel);
  const [isometric, setIsometric] = useState(false);
  const [draggedEntity, setDraggedEntity] = useState<EntityType | null>(null);
  const [dropZone, setDropZone] = useState<Vector2D | null>(null);

  const { board, entities, report, insultPlayer, executeCommand } = useGame(level);
  const [, startTransition] = useTransition();

  const className = classNames(css.view, classNameProp);

  const onReportClick = () => executeCommand('REPORT');
  const onQuitClick = () => {
    insultPlayer('quit');
    startTransition(() => {
      // Using confirm here to save time, but this should be replaced with a custom modal
      if (confirm('Are you sure you want to quit?')) onExit();
    });
  };

  const onDragActionBarItem = (type: EntityType) => () => setDraggedEntity(type);
  const onDragOverLeaveBoard = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const { dataset, parentElement } = event.currentTarget;
    const column = dataset.column;
    const row = parentElement?.dataset.row;

    if (row !== undefined && column !== undefined)
      setDropZone({ x: parseInt(column, 10), y: parseInt(row, 10) });
    else setDropZone(null);
  };

  const onDropItem = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (draggedEntity !== null && dropZone !== null) {
      switch (draggedEntity) {
        case 'robot':
          executeCommand('PLACE_ROBOT', dropZone.x, dropZone.y, 'SOUTH');
          break;
        case 'wall':
          executeCommand('PLACE_WALL', dropZone.x, dropZone.y);
          break;
      }
    }

    setDraggedEntity(null);
    setDropZone(null);
  };

  return (
    <div {...otherProps} className={className}>
      <div className={css.gameContainer}>
        <header className={css.controlBar}>
          <Button onClick={onReportClick}>Report</Button>
          <Button onClick={onQuitClick}>Quit Game</Button>
          <span className={css.terminal}>
            {'Terminal: '}
            {report}
          </span>
        </header>

        <GameBoard
          rows={board.rows}
          columns={board.columns}
          entities={entities}
          isometric={isometric}
          onDragOver={onDragOverLeaveBoard}
          onDragLeave={onDragOverLeaveBoard}
          onDrop={onDropItem}
        />

        <div style={{ padding: 16 }}>
          <ActionBar>
            <Robot facing="SOUTH" insult={null} onDrag={onDragActionBarItem('robot')} />
            <Entity type="wall" onDrag={onDragActionBarItem('wall')} />
          </ActionBar>
        </div>
      </div>
    </div>
  );
}

export default GameView;

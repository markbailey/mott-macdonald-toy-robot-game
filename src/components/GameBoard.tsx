import classNames from 'classnames';
import { HTMLAttributes } from 'react';
import useCSSVariables from '../hooks/useCSSVariables';
import useMapToJSX from '../hooks/useMapToJSX';
import Entity, { Robot } from './Entity';
import css from '../assets/stylesheets/components/game-board.module.scss';

export interface GameBoardProps extends HTMLAttributes<HTMLTableElement> {
  rows: number;
  columns: number;
  entities: BoardEntity[];
  isometric?: boolean;
}

const renderEntityAtPosition = (entities: BoardEntity[], row: number, column: number) => {
  const entity = entities.find(({ position }) => position.y === row && position.x === column);
  switch (entity?.type) {
    case 'robot':
      return <Robot insult={null} {...entity} />;
    case 'wall':
      return <Entity type={entity.type} />;
    default:
      return null;
  }
};

function GameBoard(props: GameBoardProps) {
  const { className: classNameProp, rows, columns, entities, isometric, ...otherProps } = props;
  const className = classNames(css.board, isometric && css.isometric, classNameProp);

  const [mapToJSX, getEmptyArray] = useMapToJSX();
  useCSSVariables({ '--board-rows': rows, '--board-columns': columns });

  return (
    <table {...otherProps} className={className} aria-label="Game board">
      <tbody>
        {mapToJSX(getEmptyArray(rows), ({ index: rowIndex, ...rowProps }) => (
          <tr {...rowProps} data-row={rowIndex + 1}>
            {mapToJSX(getEmptyArray(columns), ({ index: columnIndex, ...columnProps }) => (
              <td {...columnProps} className={css.cell} data-column={columnIndex + 1}>
                {renderEntityAtPosition(entities, rowIndex + 1, columnIndex + 1)}
              </td>
            ))}
          </tr>
        )).reverse()}
      </tbody>
    </table>
  );
}

export default GameBoard;

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

interface BoardCellProps extends HTMLAttributes<HTMLTableCellElement> {
  column: number;
  entity?: BoardEntity;
}

interface BoardRowProps extends HTMLAttributes<HTMLTableRowElement> {
  row: number;
  columns: number;
  entities: BoardEntity[];
}

const renderEntity = (entity?: BoardEntity) => {
  switch (entity?.type) {
    case 'robot':
      return <Robot facing={entity.facing} insult={entity.insult} onClick={entity.onClick} />;
    case 'wall':
      return <Entity type={entity.type} />;
    default:
      return null;
  }
};

function BoardCell(props: BoardCellProps) {
  const { column, entity, onDragOver, onDragLeave, onDrop, ...otherProps } = props;
  return (
    <td
      {...otherProps}
      className={css.cell}
      data-column={column}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      {renderEntity(entity)}
    </td>
  );
}

function BoardRow(props: BoardRowProps) {
  const [mapToJSX, getEmptyArray] = useMapToJSX();
  const { row, columns, entities, onDragOver, onDragLeave, onDrop, ...otherProps } = props;
  const columnsArray = getEmptyArray(columns).map((_, index) => {
    return {
      column: index + 1,
      entity: getEntityAtCell(index + 1),
      onDragOver,
      onDragLeave,
      onDrop,
    } as BoardCellProps;
  });

  function getEntityAtCell(column: number) {
    return entities.find((entity) => entity.position.x === column);
  }

  return (
    <tr {...otherProps} data-row={row}>
      {mapToJSX(columnsArray, BoardCell)}
    </tr>
  );
}

function GameBoard(props: GameBoardProps) {
  const [mapToJSX, getEmptyArray] = useMapToJSX();
  const {
    className: classNameProp,
    rows,
    columns,
    entities,
    isometric,
    onDragOver,
    onDragLeave,
    onDrop,
    ...otherProps
  } = props;

  const className = classNames(css.board, isometric && css.isometric, classNameProp);
  const rowsArray = getEmptyArray(rows).map((_, index) => {
    return {
      row: index + 1,
      columns,
      entities: getRowEntities(index + 1),
      onDragOver,
      onDragLeave,
      onDrop,
    } as BoardRowProps;
  });

  useCSSVariables({ '--board-rows': rows, '--board-columns': columns });
  function getRowEntities(row: number) {
    return entities.filter((entity) => entity.position.y === row);
  }

  return (
    <table {...otherProps} className={className} aria-label="Game board">
      <tbody>{mapToJSX(rowsArray, BoardRow).reverse()}</tbody>
    </table>
  );
}

export default GameBoard;

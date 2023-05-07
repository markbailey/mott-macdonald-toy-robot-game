import { useEffect, useMemo, useState } from 'react';
import levelData from '../data/levels.json';
import useRobot from './useRobot';
import doVectorsMatch from '../utilities/doVectorsMatch';
import useControls from './useControls';

type LevelKey = keyof typeof levelData;

export const Commands = {
  PlaceRobot: 'PLACE_ROBOT',
  PlaceWall: 'PLACE_WALL',
  Move: 'MOVE',
  Left: 'LEFT',
  Right: 'RIGHT',
  Report: 'REPORT',
} as const;

export const Directions = {
  North: 'NORTH',
  East: 'EAST',
  South: 'SOUTH',
  West: 'WEST',
} as const;

function useGame(level: number) {
  const [report, setReport] = useState<string>('');
  const [walls, setWalls] = useState<Wall[]>([]);
  const [board, setBoard] = useState<Board>({ rows: 1, columns: 1 });
  const { robot, moveRobot, spinRobot, insultPlayer, getRobotDirection, destroyRobot } = useRobot();

  const entities = useMemo(() => (robot !== null ? [...walls, robot] : walls), [robot, walls]);

  const addWall = (entity: Wall) => setWalls((prevWalls) => [...prevWalls, entity]);
  const getHasEntityAtPosition = (position: Vector2D, includeRobot: boolean = true) =>
    (robot !== null && includeRobot ? doVectorsMatch(robot.position, position) : false) ||
    walls.some((entity) => entity.position.x === position.x && entity.position.y === position.y);

  const getRobotPosition = (from: Vector2D, facing: Direction): Vector2D => {
    const rect = {
      top: board.rows,
      right: board.columns,
      bottom: 1,
      left: 1,
    };

    let x = from.x;
    let y = from.y;

    switch (facing) {
      case Directions.North:
        y += 1;
        if (y > rect.top) y = rect.bottom;
        if (getHasEntityAtPosition({ x, y })) y = from.y;
        break;
      case Directions.East:
        x += 1;
        if (x > rect.right) x = rect.left;
        if (getHasEntityAtPosition({ x, y })) x = from.x;
        break;
      case Directions.South:
        y -= 1;
        if (y < rect.bottom) y = rect.top;
        if (getHasEntityAtPosition({ x, y })) y = from.y;
        break;
      case Directions.West:
        x -= 1;
        if (x < rect.left) x = rect.right;
        if (getHasEntityAtPosition({ x, y })) x = from.x;
        break;
    }

    return { x, y };
  };

  const executeCommand = <C extends Command>(command: C, ...args: CommandArgs<C>) => {
    switch (command) {
      case Commands.PlaceRobot: {
        const [x, y, facing] = args as CommandArgs<PlaceRobotCommand>;
        const position = { x, y };
        const hasEntity = getHasEntityAtPosition(position, false);
        if (!hasEntity) moveRobot(position, facing);
        break;
      }
      case Commands.PlaceWall: {
        const [x, y] = args;
        const position = { x, y };
        const hasEntity = getHasEntityAtPosition(position);

        if (!hasEntity) addWall({ type: 'wall', position });
        else if (robot !== null) insultPlayer('cantGoThere');
        break;
      }
      case Commands.Move:
        if (robot !== null) {
          const newPosition = getRobotPosition(robot.position, robot.facing);
          if (!doVectorsMatch(newPosition, robot.position))
            executeCommand('PLACE_ROBOT', newPosition.x, newPosition.y, robot.facing);
          else insultPlayer('noEntry');
        }
        break;
      case Commands.Left:
      case Commands.Right:
        if (robot !== null) {
          const newFacing = getRobotDirection(command)!;
          executeCommand('PLACE_ROBOT', robot.position.x, robot.position.y, newFacing);
          spinRobot();
        }
        break;
      case Commands.Report:
        if (robot !== null) {
          const { position, facing } = robot;
          setReport(`${position.x},${position.y},${facing}`);
          insultPlayer('report');
        }
        break;
      default:
        break;
    }
  };

  useControls(executeCommand);
  useEffect(() => {
    const key = `${level}` as LevelKey;
    const newLevel = levelData[key] as LevelData | undefined;
    if (newLevel === undefined) return;
    if (newLevel?.startPosition !== undefined)
      moveRobot(newLevel.startPosition, newLevel.startDirection);
    else if (robot !== null) destroyRobot();

    setBoard(newLevel.board);
    setWalls(newLevel.walls);
  }, [level, setBoard, moveRobot, destroyRobot]);

  return { report, entities, robot, board, executeCommand, insultPlayer };
}

export default useGame;

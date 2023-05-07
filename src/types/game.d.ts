declare type EntityType = 'robot' | 'wall';
declare type Direction = 'NORTH' | 'EAST' | 'SOUTH' | 'WEST';
declare type Turn = 'LEFT' | 'RIGHT';

declare interface Vector2D {
  x: number;
  y: number;
}

// Commands
declare type CommandNoArgs = 'MOVE' | 'LEFT' | 'RIGHT' | 'REPORT';
declare type PlaceRobotCommand = 'PLACE_ROBOT';
declare type PlaceWallCommand = 'PLACE_WALL';
declare type Command = CommandNoArgs | PlaceRobotCommand | PlaceWallCommand;

declare type CommandArgs<C> =
  | (C extends CommandNoArgs ? never : never)
  | (C extends PlaceWallCommand ? [number, number] : never)
  | (C extends PlaceRobotCommand ? [number, number, Facing] : never);

declare type CommandFunction = <C extends Command>(command: C, ...args: CommandArgs<C>) => void;

// Entities
declare type BoardEntity = Wall | Robot;
declare interface Entity {
  type: EntityType;
  position: Vector2D;
}

declare interface Wall extends Entity {
  type: 'wall';
}

declare interface Robot extends Entity {
  type: 'robot';
  facing: Direction;
  insult: string | null;
  onClick?: () => void;
}

// Level
declare interface Board {
  rows: number;
  columns: number;
}

declare type LevelData = {
  walls: Wall[];
  board: Board;
} & (
  | {
      startPosition: Vector2D;
      startDirection: Direction;
    }
  | {
      startPosition?: never;
      startDirection?: never;
    }
);

// State
declare interface Keybindings {
  [key: CommandNoArgs]: string;
}

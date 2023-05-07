declare type EntityType = 'robot' | 'wall';
declare type Direction = 'NORTH' | 'EAST' | 'SOUTH' | 'WEST';

declare interface Vector2D {
  x: number;
  y: number;
}

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
}

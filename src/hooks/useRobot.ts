import { useCallback, useMemo, useRef, useState } from 'react';
import insults from '../data/insults.json';

type InsultKey = keyof typeof insults;

function useRobot() {
  const [position, setPosition] = useState<Vector2D | null>(null);
  const [facing, setFacing] = useState<Direction>('NORTH');
  const [insult, setInsult] = useState<string | null>(null);

  const actionTimeoutsRef = useRef<Map<string, number>>(new Map());
  const spinTimesRef = useRef<number>(0);
  const robot: Robot | null = useMemo(
    () =>
      position && {
        type: 'robot',
        position,
        facing,
        insult,
        onClick: () => insultPlayer('handsOff'),
      },
    [position, insult, facing]
  );

  function insultPlayer(key: InsultKey) {
    const insultTimeout = actionTimeoutsRef.current.get('insult');
    if (insultTimeout !== undefined) clearTimeout(insultTimeout);

    const randomIndex = Math.floor(Math.random() * insults[key].length);
    const newInsult = insults[key][randomIndex];

    setInsult(newInsult);
    const timeout = setTimeout(() => {
      setInsult(null);
      actionTimeoutsRef.current.delete('insult');
    }, 3500);

    actionTimeoutsRef.current.set('insult', timeout);
  }

  const spinRobot = () => {
    spinTimesRef.current += 1;

    const spinTimeout = actionTimeoutsRef.current.get('spinning');
    if (spinTimeout !== undefined) clearTimeout(spinTimeout);
    if (spinTimesRef.current >= 9) insultPlayer('spinning');

    const timeout = setTimeout(() => {
      spinTimesRef.current = 0;
      actionTimeoutsRef.current.delete('spinning');
    }, 2000);

    actionTimeoutsRef.current.set('spinning', timeout);
  };

  const moveRobot = useCallback(
    (position: Vector2D, facing: Direction) => {
      setPosition(position);
      setFacing(facing);
    },
    [setFacing, setPosition]
  );

  const getRobotDirection = (turn: Turn): Direction | undefined => {
    if (robot !== null) {
      const directions = ['NORTH', 'EAST', 'SOUTH', 'WEST'] as const;
      const currentIndex = directions.indexOf(robot.facing);
      const nextIndex = turn === 'LEFT' ? currentIndex - 1 : currentIndex + 1;
      const newIndex = nextIndex < 0 ? directions.length - 1 : nextIndex % directions.length;
      return directions[newIndex];
    }
  };

  return { robot, moveRobot, spinRobot, insultPlayer, getRobotDirection };
}

export default useRobot;

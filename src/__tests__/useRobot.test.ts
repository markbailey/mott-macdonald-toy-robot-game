import { renderHook, act } from '@testing-library/react';
import * as insults from '../data/insults.json';
import useRobot from '../hooks/useRobot';

describe('useRobot', () => {
  it('robot should initial be null', async () => {
    const { result } = renderHook(() => useRobot());
    expect(result.current.robot).toBeNull();
  });

  it('moveRobot function should create new robot at position', async () => {
    const { result } = renderHook(() => useRobot());
    act(() => result.current.moveRobot({ x: 1, y: 1 }, 'NORTH'));
    expect(result.current.robot?.position).toEqual({ x: 1, y: 1 });
    expect(result.current.robot?.facing).toEqual('NORTH');
  });

  it('moveRobot function should move robot to new position', async () => {
    const { result } = renderHook(() => useRobot());
    act(() => result.current.moveRobot({ x: 1, y: 1 }, 'NORTH'));
    act(() => result.current.moveRobot({ x: 5, y: 5 }, 'EAST'));
    expect(result.current.robot?.position).toEqual({ x: 5, y: 5 });
    expect(result.current.robot?.facing).toEqual('EAST');
  });

  it('insultPlayer function should set insult', async () => {
    const { result } = renderHook(() => useRobot());
    act(() => result.current.moveRobot({ x: 1, y: 1 }, 'NORTH'));
    act(() => result.current.insultPlayer('notInPlay'));

    expect(result.current.robot?.insult).toBeDefined();
    expect(result.current.robot?.insult).not.toBeNull();
    expect(insults.notInPlay).toContain(result.current.robot?.insult);
  });

  it('getRobotDirection function should return correct direction', async () => {
    const { result } = renderHook(() => useRobot());
    act(() => result.current.moveRobot({ x: 1, y: 1 }, 'NORTH'));
    expect(result.current.getRobotDirection('RIGHT')).toEqual('EAST');

    act(() => result.current.moveRobot({ x: 1, y: 1 }, 'EAST'));
    expect(result.current.getRobotDirection('RIGHT')).toEqual('SOUTH');

    act(() => result.current.moveRobot({ x: 1, y: 1 }, 'SOUTH'));
    expect(result.current.getRobotDirection('RIGHT')).toEqual('WEST');

    act(() => result.current.moveRobot({ x: 1, y: 1 }, 'WEST'));
    expect(result.current.getRobotDirection('RIGHT')).toEqual('NORTH');

    act(() => result.current.moveRobot({ x: 1, y: 1 }, 'NORTH'));
    expect(result.current.getRobotDirection('LEFT')).toEqual('WEST');

    act(() => result.current.moveRobot({ x: 1, y: 1 }, 'WEST'));
    expect(result.current.getRobotDirection('LEFT')).toEqual('SOUTH');

    act(() => result.current.moveRobot({ x: 1, y: 1 }, 'SOUTH'));
    expect(result.current.getRobotDirection('LEFT')).toEqual('EAST');

    act(() => result.current.moveRobot({ x: 1, y: 1 }, 'EAST'));
    expect(result.current.getRobotDirection('LEFT')).toEqual('NORTH');
  });

  it('spinRobot function should set insult to random spinning', async () => {
    const { result } = renderHook(() => useRobot());
    act(() => result.current.moveRobot({ x: 1, y: 1 }, 'NORTH'));
    for (let i = 0; i < 9; i++) act(() => result.current.spinRobot());

    expect(result.current.robot?.insult).toBeDefined();
    expect(result.current.robot?.insult).not.toBeNull();
    expect(insults.spinning).toContain(result.current.robot?.insult);
  });

  it('onClick function should set insult to random handsOff', async () => {
    const { result } = renderHook(() => useRobot());
    act(() => result.current.moveRobot({ x: 1, y: 1 }, 'NORTH'));
    act(() => result.current.robot?.onClick?.());

    expect(result.current.robot?.insult).toBeDefined();
    expect(result.current.robot?.insult).not.toBeNull();
    expect(insults.handsOff).toContain(result.current.robot?.insult);
  });

  it('destroyRobot function should set robot to null', async () => {
    const { result } = renderHook(() => useRobot());
    act(() => result.current.moveRobot({ x: 1, y: 1 }, 'NORTH'));
    expect(result.current.robot).not.toBeNull();
    act(() => result.current.destroyRobot());
    expect(result.current.robot).toBeNull();
  });
});

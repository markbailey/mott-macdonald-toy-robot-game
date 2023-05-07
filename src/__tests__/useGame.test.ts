import { act, renderHook } from '@testing-library/react';
import levelData from '../data/levels.json';
import insults from '../data/insults.json';
import useGame from '../hooks/useGame';

describe('useGame', () => {
  it('should set initial state correctly', () => {
    const { result } = renderHook(() => useGame(1));
    expect(result.current.report).toEqual('');
    expect(result.current.board).toEqual(levelData['1'].board);
    expect(result.current.entities).toHaveLength(levelData['1'].walls.length + 1);
    expect(result.current.robot).not.toBeNull();
  });

  it('should place robot at correct position', () => {
    const { result } = renderHook(() => useGame(0));
    act(() => result.current.executeCommand('PLACE_ROBOT', 1, 1, 'NORTH'));
    expect(result.current.robot?.position).toEqual({ x: 1, y: 1 });
    expect(result.current.robot?.facing).toEqual('NORTH');
  });

  it('should place wall at correct position', () => {
    const { result } = renderHook(() => useGame(0));
    act(() => result.current.executeCommand('PLACE_WALL', 1, 1));
    expect(result.current.entities).toHaveLength(1);
    expect(result.current.entities[0].position).toEqual({ x: 1, y: 1 });
  });

  it('should not place wall if it will collide with another entity', () => {
    const { result } = renderHook(() => useGame(0));
    act(() => result.current.executeCommand('PLACE_ROBOT', 1, 1, 'NORTH'));
    act(() => result.current.executeCommand('PLACE_WALL', 1, 1));
    expect(result.current.entities).toHaveLength(1);
    expect(result.current.entities[0].type).toEqual('robot');
  });

  it('should move robot', () => {
    const { result } = renderHook(() => useGame(0));
    act(() => result.current.executeCommand('PLACE_ROBOT', 1, 1, 'NORTH'));
    act(() => result.current.executeCommand('MOVE'));
    expect(result.current.robot?.position).toEqual({ x: 1, y: 2 });
  });

  it('should not move robot if it will collide with a wall', () => {
    const { result } = renderHook(() => useGame(0));
    act(() => result.current.executeCommand('PLACE_ROBOT', 1, 1, 'NORTH'));
    act(() => result.current.executeCommand('PLACE_WALL', 1, 2));
    act(() => result.current.executeCommand('MOVE'));
    expect(result.current.robot?.position).toEqual({ x: 1, y: 1 });
  });

  it('should turn robot left', () => {
    const { result } = renderHook(() => useGame(0));
    act(() => result.current.executeCommand('PLACE_ROBOT', 1, 1, 'NORTH'));
    act(() => result.current.executeCommand('LEFT'));
    expect(result.current.robot?.facing).toEqual('WEST');
  });

  it('should turn robot right', () => {
    const { result } = renderHook(() => useGame(0));
    act(() => result.current.executeCommand('PLACE_ROBOT', 1, 1, 'NORTH'));
    act(() => result.current.executeCommand('RIGHT'));
    expect(result.current.robot?.facing).toEqual('EAST');
  });

  it('report command should set random report insult', () => {
    const { result } = renderHook(() => useGame(0));
    act(() => result.current.executeCommand('PLACE_ROBOT', 3, 3, 'NORTH'));
    act(() => result.current.executeCommand('REPORT'));
    expect(insults['report']).toContain(result.current.robot?.insult);
  });

  it("shouldn't report robot position if it's not placed", () => {
    const { result } = renderHook(() => useGame(0));
    act(() => result.current.executeCommand('REPORT'));
    expect(result.current.report).toEqual('');
  });

  it('should report robot position #1', () => {
    const { result } = renderHook(() => useGame(0));
    act(() => result.current.executeCommand('PLACE_ROBOT', 3, 3, 'NORTH'));
    act(() => result.current.executeCommand('PLACE_WALL', 3, 5));
    act(() => result.current.executeCommand('MOVE'));
    act(() => result.current.executeCommand('MOVE'));
    act(() => result.current.executeCommand('RIGHT'));
    act(() => result.current.executeCommand('MOVE'));
    act(() => result.current.executeCommand('MOVE'));
    act(() => result.current.executeCommand('MOVE'));
    act(() => result.current.executeCommand('REPORT'));
    expect(result.current.report).toEqual('1,4,EAST');
  });

  it('should report robot position #2', () => {
    const { result } = renderHook(() => useGame(0));
    act(() => result.current.executeCommand('PLACE_ROBOT', 2, 2, 'WEST'));
    act(() => result.current.executeCommand('PLACE_WALL', 1, 1));
    act(() => result.current.executeCommand('PLACE_WALL', 2, 2));
    act(() => result.current.executeCommand('PLACE_WALL', 1, 3));
    act(() => result.current.executeCommand('LEFT'));
    act(() => result.current.executeCommand('LEFT'));
    act(() => result.current.executeCommand('MOVE'));
    act(() => result.current.executeCommand('REPORT'));

    // # the app should print: 2,3,EAST < -- incorrect, should be x, y not y, x
    expect(result.current.report).toEqual('3,2,EAST');
  });
});

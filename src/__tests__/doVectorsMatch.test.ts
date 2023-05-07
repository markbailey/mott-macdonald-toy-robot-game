import doVectorsMatch from '../utilities/doVectorsMatch';

describe('doVectorsMatch', () => {
  it('should return true if vectors match', () => {
    expect(doVectorsMatch({ x: 1, y: 1 }, { x: 1, y: 1 })).toEqual(true);
  });

  it('should return false if vectors do not match', () => {
    expect(doVectorsMatch({ x: 1, y: 1 }, { x: 1, y: 2 })).toEqual(false);
  });
});

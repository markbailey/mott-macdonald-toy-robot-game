import { createBoard } from '@wixc3/react-board';
import GameView from '../../../views/GameView';

export default createBoard({
  name: 'GameView',
  Board: () => <GameView />,
  environmentProps: {
    windowWidth: 393,
    windowHeight: 851,
  },
});

import { createBoard } from '@wixc3/react-board';
import GameView from '../../../views/GameView';

export default createBoard({
  name: 'GameView',
  Board: () => <GameView startLevel={0} onExit={() => console.log('Exiting game')} />,
  environmentProps: {
    windowWidth: 1024,
    windowHeight: 851,
  },
});

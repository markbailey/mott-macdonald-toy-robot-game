import { createBoard } from '@wixc3/react-board';
import GameBoard from '../../../components/GameBoard';

export default createBoard({
  name: 'GameBoard',
  Board: () => <GameBoard rows={5} columns={5} entities={[]} isometric />,
  environmentProps: {
    windowWidth: 1024,
    windowHeight: 768,
  },
});

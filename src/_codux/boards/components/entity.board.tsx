import { createBoard } from '@wixc3/react-board';
import Entity from '../../../components/Entity';

export default createBoard({
  name: 'Entity',
  Board: () => <Entity type="wall" />,
});

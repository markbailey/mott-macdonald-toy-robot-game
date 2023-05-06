import { createBoard } from '@wixc3/react-board';
import Button from '../../../components/Button';

export default createBoard({
  name: 'button',
  Board: () => <Button>Button</Button>,
});

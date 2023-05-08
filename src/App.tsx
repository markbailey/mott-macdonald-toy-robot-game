import { Fragment, useState } from 'react';
import GameView from './views/GameView';
import { mount } from './utilities/show';
import MenuView from './views/MenuView';
import css from './assets/stylesheets/app.module.scss';

function App() {
  const [view, setView] = useState('menu');
  const [level, setLevel] = useState(0);

  const onStartGame = (level: number) => {
    setLevel(level);
    setView('game');
  };

  const onExitGame = () => {
    setLevel(0);
    setView('menu');
  };

  return (
    <Fragment>
      {mount(view === 'menu', <MenuView onStartGame={onStartGame} className={css.view} />)}
      {mount(
        view === 'game',
        <GameView startLevel={level} onExit={onExitGame} className={css.view} />
      )}
    </Fragment>
  );
}

export default App;

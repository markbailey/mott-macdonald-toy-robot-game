import { useRef, useEffect } from 'react';
import keybindingsData from '../data/keybindings.json';
import useEventListener from './useEventListener';

function useControls(executeCommand: CommandFunction) {
  const keybindingsRef = useRef<Map<string, string>>(new Map<string, string>());

  const keyUpEventHandler = (event: KeyboardEvent) => {
    const keybindings = keybindingsRef.current;
    const command = keybindings.get(event.key) as CommandNoArgs | undefined;
    if (command !== undefined) executeCommand(command);
  };

  useEventListener('keyup', keyUpEventHandler as EventListener);

  useEffect(() => {
    // Add keybindings object data from JSON file to keybindingsRef Map
    for (const [command, key] of Object.entries(keybindingsData))
      keybindingsRef.current.set(key, command);
  }, []);
}

export default useControls;

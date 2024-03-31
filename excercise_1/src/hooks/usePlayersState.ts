import { useContext } from "react";
import {AppContext} from "../contexts/AppContext";

function usePlayersState() {
  const {players} = useContext(AppContext);

  if(!players) throw new Error('This hook must be  inside the app context.');

  return players;
}

export default usePlayersState;
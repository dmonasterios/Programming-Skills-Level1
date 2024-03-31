import { createContext, useEffect, useState } from "react";
import {player} from "../types/playerType";
import {menuOptions} from "../types/MenuType";
import playersJson from "../data/players.json";

export interface IAppContext{
  players: player[],
  menu: menuOptions,
  setPlayers: React.Dispatch<React.SetStateAction<player[]>>,
  setMenu: React.Dispatch<React.SetStateAction<menuOptions>>,
}



export const AppContext = createContext<IAppContext>({} as IAppContext);

export const AppContextProvider = ({children} : {children:JSX.Element}) => {
  const [players, setPlayers] = useState<player[]>([]);
  const [menu, setMenu] = useState<menuOptions>("Menu");

  useEffect(() => {
    setPlayers(playersJson as player[]);
  }, []);

  const sharedData: IAppContext = {
    players,
    menu,
    setPlayers,
    setMenu

  }

  return(
    <AppContext.Provider
      value={sharedData}
    >
      {children}
    </AppContext.Provider>
  );
}
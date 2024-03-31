import { ChangeEvent, useState } from "react";
import { jerseyNumbers, player as playerType } from "../../types/playerType";
import Select from "../../components/Select";
import usePlayersState from "../../hooks/usePlayersState";
import getPlayerInfo from "../../utils/getPlayerInfo";
import DisplayResults from "./components/DisplayResults";

type state = {
  firstPlayer: playerType | null;
  secondPlayer: playerType | null;
};

const defaultState: state = {
  firstPlayer: null,
  secondPlayer: null,
};

const ComparePlayers = () => {
  const [playerInfo, setPlayerInfo] = useState<state>(defaultState);
  const players = usePlayersState();

  const handleSelectChange = (
    el: ChangeEvent<HTMLSelectElement>,
    key: "firstPlayer" | "secondPlayer"
  ) => {
    const jerseyNumber = Number.parseInt(el.target.value) as jerseyNumbers;
    if (el.target.value !== "") {
      const player = getPlayerInfo(jerseyNumber, players) || null;
      setPlayerInfo({ ...playerInfo, [key]: player });
    }
    else setPlayerInfo({ ...playerInfo, [key]: null });
  };

  return (
    <section className="grid grid-col-1 gap-3 content-start h-full">
      <h2 className="text-center text-3xl my-3">Compare Players</h2>
      <div className="flex flex-col items-center sm:flex-row">
        <Select
          className="sm:w-72 sm:mr-4"
          onChange={(el) => handleSelectChange(el, "firstPlayer")}
          players={players}
        />
        <span className="my-3 text-2xl text-orange-700 font-bold"> VS </span>
        <Select
          className="sm:w-72 sm:ml-4"
          onChange={(el) => handleSelectChange(el, "secondPlayer")}
          players={players}
        />
      </div>
      {
        playerInfo.firstPlayer && playerInfo.secondPlayer?
        <DisplayResults
        firstPlayer={playerInfo.firstPlayer}
        secondPlayer={playerInfo.secondPlayer}/>:
        'Please select two players'
      }
    </section>
  );
};

export default ComparePlayers;

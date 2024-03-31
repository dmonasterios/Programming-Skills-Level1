import { ChangeEvent, useState } from "react";
import { jerseyNumbers, player as playerType } from "../../types/playerType";
import Select from "../../components/Select";
import usePlayersState from "../../hooks/usePlayersState";
import PlayerInfo from "../../components/PlayerInfo";
import getPlayerInfo from "../../utils/getPlayerInfo";


const PlayerReview = () => {
  const [playerInfo, setPlayerInfo] = useState<playerType|null>(null);
  const players = usePlayersState();

  const handleSelectChange = (el:ChangeEvent<HTMLSelectElement>) => {
    const jerseyNumber = Number.parseInt(el.target.value) as jerseyNumbers;
    if(el.target.value !== "") {
      const player = getPlayerInfo(jerseyNumber, players) || null;
      setPlayerInfo(player);
    }
    else setPlayerInfo(null);
  }

  return(
    <section className="grid grid-col-1 gap-3 content-start h-full">
      <h2 className="text-center text-3xl my-3">Player Review</h2>
      <Select onChange={handleSelectChange} players={players}/>
      <PlayerInfo player={playerInfo} />
    </section>
  );
}

export default PlayerReview;
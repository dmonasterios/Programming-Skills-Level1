import {stadistics} from "../../types/playerType";
import usePlayersState from "../../hooks/usePlayersState";
import getBestPlayerByStadistic from "../../utils/getBestPlayerByStadistic";
import PlayerInfo from "../../components/PlayerInfo";
type Props = {
  stadistic : stadistics,
  title : string
}

const BestPlayerByStadistic = ({stadistic, title} : Props) => {
  const players = usePlayersState();
  const result = getBestPlayerByStadistic(players, stadistic);

  return(
    <section>
      <h2 className="text-center text-3xl my-3">{title}</h2>
      <p className="mb-3">{result.msg}</p>
      <PlayerInfo player={result.player} />

    </section>
  );

}

export default BestPlayerByStadistic;
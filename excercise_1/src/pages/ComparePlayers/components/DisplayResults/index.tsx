import { player  } from "../../../../types/playerType";
import { detail } from "../../../../types/BarType";
import comparePlayersByStadistic from "../../../../utils/comparePlayersByStadistic.ts";

type Props = {
  firstPlayer : player,
  secondPlayer : player
}

const playerDetail : Omit<detail,'color'>[] = [
  {
    description:'Acurracy',
    key:'passingAccuracy'
  },
  {
    description:'Assists',
    key:'assistsPoints'
  },
  {
    description:'Defensive Involvements',
    key:'defensiveInvolvements'
  },
  {
    description:'Speed',
    key:'speedPoints'
  },
  {
    description:'Goals',
    key:'goals'
  }
]

const DisplayResults = ({ firstPlayer, secondPlayer } : Props) => {
  const players = {
    first: firstPlayer,
    second: secondPlayer
  }
  return(
    <div>
      {
        playerDetail.map(
          function (detail){
            const message : string = comparePlayersByStadistic(players, detail.description);
            return <p key = {'msjDetail-'+detail.key}>{message}</p>
          }
        )
      }
    </div>
  );
}

export default DisplayResults
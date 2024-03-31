import { player as playerType } from "../../types/playerType";
import { detail, values } from "../../types/BarType";
import BarGroup from "../BarGroup";

type Props = {
  player : playerType | null,
}



const playerDetail : detail[] = [
  {
    description:'Acurracy',
    color:'amber',
    key:'passingAccuracy'
  },
  {
    description:'Assists',
    color:'blue',
    key:'assistsPoints'
  },
  {
    description:'Defensive Involvements',
    color:'green',
    key:'defensiveInvolvements'
  },
  {
    description:'Speed',
    color:'red',
    key:'speedPoints'
  }
]

const PlayerInfo = ({ player }: Props) => {
  if(player){
    return(
      <article>
        <section>
          <h3 className="text-xl">Player Information</h3>
          <p>
            Name: {player.name}
          </p>
          <p>
            Jersey Number: {player.jerseyNumber}
          </p>
        </section>
        <section className="sm:flex flex-wrap mt-4 sm:gap-12 sm:justify-center">
          <h3 className="w-full text-xl">Player Stadistics</h3>
          <p className="w-full">
            goals: {player.goals}
          </p>
          {
            playerDetail.map(
              function (detail) {
                return (
                  <BarGroup
                    key={'bar-'+player.jerseyNumber+'-'+detail.description}
                    color={detail.color}
                    description={detail.description}
                    value={player[detail.key] as values}
                  />
                )
              }
            )
          }

          
        </section>
      </article>
    )
  }

  return (
    <section>
      please select a player
    </section>
  )

}

export default PlayerInfo;
import { player as playerType } from "../../types/playerType";

type Props = {
  players: playerType[]
} & React.ComponentPropsWithoutRef<"select">;

const Select = ({players, ...rest} : Props) => {
  return <select {...rest} className={
    `
      ${rest.className? rest.className : ''}
    dark:bg-gray-200
      w-full
    bg-gray-600
      py-2
      rounded-md
    `}>
      <option value="">Please select an option</option>
      {
        players.map(
          function (player) {
            return (
              <option key={'select-'+player.jerseyNumber} value={player.jerseyNumber}>{player.name}</option>
            )
          }
        )
      }
  </select>
}

export default Select;
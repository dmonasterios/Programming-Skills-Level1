import useMenuState from "../hooks/useMenuState";
import BestPlayerByStadistic from "../pages/BestPlayerByStadistic";
import ComparePlayers from "../pages/ComparePlayers";
import Menu from "../pages/Menu";
import PlayerReview from "../pages/PlayerReview";
import { menuType } from "../types/MenuType";
BestPlayerByStadistic

const pages : menuType = {
  'Menu':<Menu/>,
  'PlayerReview':<PlayerReview/>,
  'ComparePlayers':<ComparePlayers/>,
  'IdentifyHighestAssistsPoints':<BestPlayerByStadistic title="Player with the most assists"  stadistic="Assists" />,
  'IdentifyHighestDefensiveInvolvements':<BestPlayerByStadistic title="Player with the most defensive involvements" stadistic="Defensive Involvements" />,
  'IdentifyHighestGoals':<BestPlayerByStadistic title="Top goal scorer" stadistic="Goals" />,
  'IdentifyHighestPassingAccuracy':<BestPlayerByStadistic title="Player with the highest passing accuracy" stadistic="Acurracy" />,
  'IdentifyHighestSpeedPoints':<BestPlayerByStadistic title="Fastest Player" stadistic="Speed" />
}


const Router = () => {
  const { menu } = useMenuState();
  const Page = pages[menu];

  return Page;
}

export default Router;
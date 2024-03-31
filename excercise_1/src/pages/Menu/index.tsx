import Button from "../../components/Button";
import useMenuState from "../../hooks/useMenuState";

const Menu = () => {
  const {setMenu} = useMenuState();
  return(
    <nav className="grid grid-col-1 gap-3 content-center h-full">
      <Button onClick={() => setMenu("PlayerReview")}>
        Player Review
      </Button>
      <Button onClick={() => setMenu("ComparePlayers")}>
        Compare two players
      </Button>
      <Button onClick={() => setMenu("IdentifyHighestSpeedPoints")}>
        Fastest player
      </Button>
      <Button onClick={() => setMenu("IdentifyHighestGoals")}>
        Top goal scorer
      </Button>
      <Button onClick={() => setMenu("IdentifyHighestAssistsPoints")}>
        Player with the most assists
      </Button>
      <Button onClick={() => setMenu("IdentifyHighestPassingAccuracy")}>
        Player with the highest passing accuracy
      </Button>
      <Button onClick={() => setMenu("IdentifyHighestDefensiveInvolvements")}>
        Player with the most defensive involvements
      </Button>
    </nav>
  );
}

export default Menu;
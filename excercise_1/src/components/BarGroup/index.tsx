import Bar from "../Bar";
import { colors, values } from "../../types/BarType";
import { stadistics } from "../../types/playerType";

type Props = {
  description : stadistics
  color: colors
  value: values
}

const BarGroup = ({value, color, description} : Props) => {
  return(
    <div className="sm:w-[98px] grid items-center my-3 sm:m-1">
      <p className="">{description}</p>
      <Bar color={color} value={value}/>
    </div>
  );
}

export default BarGroup;
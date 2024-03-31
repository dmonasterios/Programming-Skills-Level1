import { IoArrowBack } from "react-icons/io5";
import { menuOptions } from "../../../../types/MenuType"

type Props = {
  setMenu: React.Dispatch<React.SetStateAction<menuOptions>>,
}

const ReturnBtn = ({ setMenu } : Props) => {
  const HandleOnClick = () => {
    setMenu('Menu');
  }
  return (
    <button className="text-gray-200 flex dark:text-gray-700" onClick={HandleOnClick}>
      <IoArrowBack className="h-full w-6 mr-1"/>
      <span >Go to Menu</span>
    </button>
  );
}

export default ReturnBtn
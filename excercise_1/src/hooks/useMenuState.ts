import { useContext } from "react";
import {AppContext} from "../contexts/AppContext";

function useMenuState() {
  const {menu, setMenu}  = useContext(AppContext);
  const context = { menu, setMenu }


  if(!context) throw new Error('This hook must be  inside the app context.');

  return context;
}

export default useMenuState;
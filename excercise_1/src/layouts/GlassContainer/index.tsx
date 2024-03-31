import useMenuState from "../../hooks/useMenuState";
import ReturnBtn from "./components/ReturnBtn";

const GlassContainer = ({children} : {children:JSX.Element}) => {
  const {menu, setMenu} = useMenuState();
  const index = Math.floor(Math.random() * 3);

  const backgroundImage = [
    `bg-[url('/images/image1.webp')]`,
    `bg-[url('/images/image2.webp')]`,
    `bg-[url('/images/image3.webp')]`,
  ]

  return(
    <div
    className={`${backgroundImage[index]} flex bg-center bg-cover h-screen`}>
      <main className={`
        ${index !== 1? "light" : "dark"}
        text-white
        dark:text-black
        backdrop-blur-lg
        bg-white/30 backdrop-brightness-150
        rounded-md m-auto w-[80%] sm:w-fit h-[90%]
        p-4
        shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]
      `}>
        <header className="flex flex-row">
          <img className="w-10" src="/soccer-ball.svg" alt="Soccer Ball Icon" />
          <h1 className="ml-3 text-2xl font-bold h-fit my-auto">
            <span className="text-red-600">Manchester</span> United FC
          </h1>
        </header>
        <div className="mx-auto overflow-y-scroll mt-4 rounded-md dark:bg-gray-400/50 bg-gray-700/50 p-3 h-[90%] max-w-[1000px]">
          {menu !== 'Menu' ? <ReturnBtn setMenu={setMenu} /> : ''}
          {children}
        </div>
      </main>
    </div>
  );
}

export default GlassContainer
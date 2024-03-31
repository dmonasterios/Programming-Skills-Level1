import { useEffect, useState } from "react";
import { colors, values } from "../../types/BarType"

type colorsValue = {[key in colors]: string}

type Props = {
  color: colors
  value: values
}

const tailwindColor : colorsValue = {
  red:'bg-red-500',
  blue:'bg-blue-500',
  yellow:'bg-yellow-500',
  green:'bg-green-500',
  orange:'bg-orange-500',
  amber:'bg-amber-900',
}

const Bar = ({ color, value} : Props) => {
  const [property, setProperty] = useState<'width' | 'height'>('' as 'width' | 'height');
  let valueStyles = '';
  const handleResize = () => {
    if(window.innerWidth < 640) setProperty('width');
    else setProperty('height');
  }
  useEffect(() => {
    handleResize();
    window.addEventListener('resize',handleResize);
  }, [value]);

  const colorClass = tailwindColor[color];

  if(property === 'width') valueStyles += 'left-[50%] ';
  else {
    valueStyles += 'top-[45%] ';
    if(value < 10) valueStyles += 'left-2 ';
    else valueStyles += 'left-1 ';
  }


  return(
    <div className=" relative w-full flex items-end h-6 sm:h-52 sm:w-6 bg-gray-300">
      <div className={`h-full  w-full transition-all duration-300  ${colorClass}`} style={{[property]: `${value*10}%`}}>
        <span className={`
            absolute
            ${valueStyles}
            ${value < 6 ? 'text-gray-700' : 'text-gray-300' }
          `}>{value}</span>
      </div>
    </div>
  )
}

export default Bar;
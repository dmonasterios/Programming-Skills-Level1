type Props = {
  children:  string,
} & React.ComponentPropsWithoutRef<"button">;



const Button = ({children, ...rest}: Props) => {
  return(
    <button {...rest}
      className="
        relative z-10
        text-white py-2 px-4 rounded-md
        bg-gradient-to-l
        from-red-500
        via-red-800
        to-red-500
        before:content-['']
        before:absolute
        before:top-0
        before:right-0
        before:bottom-0
        before:left-0
        before:opacity-0
        before:transition-opacity
        before:duration-200
        before:ease-linear
        before:-z-10
        before:bg-gradient-to-l
        before:from-red-700
        before:via-red-400
        before:to-red-700
        hover:before:opacity-100"
      >
      {children}
    </button>
  );
}

export default Button;
import classNames from "classnames";

const sizeClasses = {
    small: "px-2 py-1 text-xs lg:px-3 lg:py-1.5 lg:text-sm",
    normal: "px-4 py-2 text-base",
    large: "px-5 py-3 text-lg",
};

const shapeClasses = {
    full: "w-full",
    square: "w-10 h-10 flex items-center justify-center",
    rounded: "rounded-full",
    default: "",
};

const variantClasses = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-500 text-white hover:bg-gray-600",
    danger: "bg-red-600 text-white hover:bg-red-700",
    success: "bg-green-600 text-white hover:bg-green-700",
    default: "bg-white text-black hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700",
    transparent: "bg-transparent text-black dark:text-white transition-all",
};

const Button = ({
    variant = "primary",
    size = "normal",
    isDisabled = false,
    isOutline = false,
    shape = "default",
    isLoading = false,
    onClick,
    loadingText = "Loading...",
    type = "button",
    children,
    className = "",
    ...rest
}) => {
    const classes = classNames(
        "flex items-center justify-center font-medium rounded-lg transition duration-200 focus:outline-none disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed",
        sizeClasses[size],
        shapeClasses[shape],
        isOutline ? "border border-current bg-transparent text-current" : variantClasses[variant],
        isLoading && "pointer-events-none opacity-80",
        className
    );

    return (
        <button onClick={onClick} type={type} disabled={isDisabled} className={classes} {...rest}>
            {isLoading ? loadingText : children}
        </button>
    );
};

export default Button;

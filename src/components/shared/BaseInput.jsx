import classNames from "classnames";

const BaseInput = ({
    type = "text",
    className = "",
    onChange,
    checked,
    value,
    placeholder,
    size = "medium",
    variant = "default",
    ...props
}) => {
    const baseStyles = "border outline-none px-4 py-2 text-gray-950 dark:text-white shadow-sm";

    const sizeStyles = {
        small: "text-sm size-4",
        medium: "text-base p-3 h-12 w-full",
        large: "text-lg p-4 h-14 w-full",
    };

    const variantStyles = {
        default: "border-gray-700",
        rounded: "border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 dark:focus:ring-blue-500",
        borderless: "border-0 shadow-none focus:ring-0",
    };

    return (
        <input
            type={type}
            className={classNames(
                baseStyles,
                sizeStyles[size],
                variantStyles[variant],
                {
                    "cursor-pointer mr-2": type === "checkbox" || type === "radio",
                },
                className
            )}
            onChange={onChange}
            checked={checked}
            value={value}
            placeholder={placeholder}
            {...props}
        />
    );
};

export default BaseInput;

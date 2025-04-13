import { useState, useEffect } from "react";
import Button from './Button';
import { ComputerIcon, MoonIcon, SunIcon } from "./icons";


const ThemeToggle = () => {
    const [theme, setTheme] = useState("system");

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") || "system";
        setTheme(savedTheme);
        applyTheme(savedTheme);
    }, []);

    const applyTheme = (mode) => {
        if (mode === "dark") {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else if (mode === "light") {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        } else {
            localStorage.removeItem("theme");
            if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
                document.documentElement.classList.add("dark");
            } else {
                document.documentElement.classList.remove("dark");
            }
        }
    };

    const toggleTheme = () => {
        let newTheme;
        if (theme === "system") {
            newTheme = "dark";
        } else if (theme === "dark") {
            newTheme = "light";
        } else {
            newTheme = "system";
        }
        setTheme(newTheme);
        applyTheme(newTheme);
    };

    return (
        <Button size="tiny" variant="transparent" onClick={toggleTheme} className="hover:scale-110">
            {theme === "dark" ?
                <MoonIcon className={"size-7"} />
                :
                theme === "light" ?
                    <SunIcon className={"size-7 text-amber-400"} />
                    :
                    <ComputerIcon className={"size-7"} />
            }
        </Button>
    );
};

export default ThemeToggle;
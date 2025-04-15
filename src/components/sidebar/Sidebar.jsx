import { memo, useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { addCategory } from "../../features/tasks/taskSlice";
import Button from "../shared/Button";
import { ArrowLeftIcon, TwoArrowLeftIcon } from "../shared/icons";
import BaseInput from "../shared/BaseInput";
import SidebarCategoryItems from "./SidebarCategoryItems";
import ThemeToggle from "../shared/ThemeModeButton";

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
    const [newCategory, setNewCategory] = useState("");

    const dispatch = useDispatch();

    const toggleSidebar = () => {
        setIsSidebarOpen((prev) => !prev);
    };

    const handleAddCategory = useCallback(() => {
        if (newCategory.trim() === "") return;
        dispatch(addCategory(newCategory));
        setNewCategory("");
    }, [newCategory, dispatch]);

    return (
        <aside className={`w-72 z-10 transition-transform duration-300 bg-white dark:bg-gray-800 shadow-lg p-6 rounded-2xl flex flex-col min-h-9/10 max-h-10/12 fixed ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg pt-2.5 font-semibold dark:text-white mb-4">Task Categories</h2>
                <ThemeToggle />
                <Button onClick={toggleSidebar} size="small" variant="default" className="translate-x-10">
                    <TwoArrowLeftIcon className={`size-7 transition-transform duration-500 font-bold ${isSidebarOpen ? "rotate-0" : "rotate-180"}`} />
                </Button>
            </div>
            <div className="flex items-center justify-between mb-5">
                <BaseInput
                    type="text"
                    value={newCategory}
                    onChange={e => setNewCategory(e.target.value)}
                    placeholder="Add new Category..."
                    className="outline-none"
                    maxLength={12}
                />
                <Button size="small" className="h-12 rounded-none rounded-r-lg" onClick={handleAddCategory}>
                    <ArrowLeftIcon className={"size-6 font-bold"} />
                </Button>
            </div>
            <SidebarCategoryItems />
        </aside>
    );
};

export default memo(Sidebar);
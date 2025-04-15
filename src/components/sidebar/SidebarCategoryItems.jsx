import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../../features/filter-task-list/filterSlice";
import { removeCategory } from "../../features/tasks/taskSlice";
import { memo, useCallback } from "react";
import useAlertStore from "../../stores/alert.store";


function SidebarCategoryItems() {
    const categories = useSelector(state => state.tasklist.categories);
    const filter = useSelector(state => state.filter.filter);
    const showAlert = useAlertStore(state => state.showAlert);
    const dispatch = useDispatch();


    const fixedCategories = ["All Tasks", "Completed", "Pending"];

    const handleSetFilter = useCallback((item) => {
        dispatch(setFilter(item));
    }, [dispatch]);

    const handleRemoveCategory = useCallback((e, item) => {
        e.stopPropagation();
        showAlert({
            message: "Are you sure you want to remove this category?",
            onConfirm: () => {
                dispatch(removeCategory(item));
            },
            confirmText: "Yes,Remove it",
            cancelText: "No,Keep it",
        })

    }, [dispatch, showAlert]);

    return (
        <ul className="space-y-3 overflow-y-auto">
            {categories && categories.map((item) => (
                <li
                    key={item}
                    onClick={() => handleSetFilter(item)}
                    className={`group flex items-center justify-between p-1 lg:p-3 rounded-lg cursor-pointer 
                        ${filter === item ? "bg-gray-200 dark:bg-gray-600" : "hover:bg-gray-100 dark:hover:bg-gray-700"} 
                        dark:text-white`}
                >
                    <span>{item} {" "}</span>
                    {!fixedCategories.includes(item) && (
                        <span
                            onClick={(e) => handleRemoveCategory(e, item)}
                            className="block xl:hidden xl:group-hover:block text-red-500 hover:text-red-700 cursor-pointer"
                        >
                            &#x2715;
                        </span>
                    )}
                </li>
            ))}
        </ul>
    );
}

export default memo(SidebarCategoryItems);

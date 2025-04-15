import { useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, clearAllTasks } from "../../features/tasks/taskSlice";
import Button from "../shared/Button";
import BaseInput from "../shared/BaseInput";
import useAlertStore from "../../stores/alert.store";


const AddTask = () => {
    const [task, setTask] = useState("");
    const [category, setCategory] = useState("Work");
    const categories = useSelector(state => state.tasklist.categories);
    const showAlert = useAlertStore(state => state.showAlert);
    const dispatch = useDispatch();


    const filteredCategories = useMemo(() =>
        categories.filter(cat => !["All Tasks", "Completed", "Pending"].includes(cat)),
        [categories]
    );

    const handleAddTask = useCallback(() => {
        if (task.trim() === "") return;
        dispatch(addTask({ text: task, category }));
        setTask("");
    }, [task, category, dispatch]);

    const handleRemoveAllTask = useCallback(() => {
        showAlert({
            message: "Are you sure you want to clear all tasks?",
            onConfirm: () => dispatch(clearAllTasks())
        })
    }, [dispatch, showAlert]);

    return (
        <>
            <BaseInput type="text" value={task} variant="rounded" onChange={(e) => setTask(e.target.value)} placeholder="Add a new task..." />
            <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="md:w-min p-3 border rounded-lg shadow-sm dark:bg-gray-800 dark:text-white dark:border-gray-600"
            >
                {filteredCategories && filteredCategories.map((item, index) => (
                    <option key={`item-${index}`} value={item}>{item}</option>
                ))}
            </select>

            <div className="flex items-center gap-2">
                <Button onClick={handleAddTask}>Add</Button>
                <Button variant="danger" onClick={handleRemoveAllTask}>ClearAll</Button>
            </div>
        </>
    );
};

export default AddTask;

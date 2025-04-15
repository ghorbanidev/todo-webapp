import { useState, useEffect, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { updateTask } from "../features/tasks/taskSlice";
import ThemeToggle from "../components/shared/ThemeModeButton";
import BaseInput from "../components/shared/BaseInput";
import Button from "../components/shared/Button";

const EditTask = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const tasks = useSelector((state) => state.tasklist.tasks);
    const categories = useSelector(state => state.tasklist.categories);
    const dispatch = useDispatch();

    const taskToEdit = useMemo(() => tasks.find(task => task.id === id), [tasks, id]);

    const [title, setTitle] = useState(taskToEdit.text);
    const [category, setCategory] = useState(taskToEdit.category);
    const [completed, setCompleted] = useState(taskToEdit.completed);

    const filteredCategories = useMemo(() =>
        categories.filter(cat => !["All Tasks", "Completed", "Pending"].includes(cat)),
        [categories]
    );

    useEffect(() => {
        if (!taskToEdit) {
            navigate("/");
        }
    }, [tasks, taskToEdit, navigate]);

    const handleSave = useCallback(() => {
        dispatch(updateTask({ id, text: title, category, completed }));
        navigate("/");
    }, [dispatch, id, title, category, completed, navigate]);

    const handleCancel = useCallback(() => {
        navigate("/");
    }, [navigate]);

    return (
        <div className="max-w-lg lg:max-w-5/12 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md mx-auto mt-10 lg:mt-36 mb-10">
            <div className="flex mb-2 items-center justify-between">
                <h2 className="text-2xl text-gray-800 dark:text-white font-bold mb-4">Edit Task</h2>
                <ThemeToggle />
            </div>
            <label className="block mb-2 text-md font-medium text-gray-700 dark:text-white">
                Title:
            </label>
            <textarea
                type="text"
                className="w-full p-2 border rounded-lg mb-3 dark:bg-gray-700 dark:text-white"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <label className="block mb-2 text-md font-medium text-gray-700 dark:text-white">
                Category:
            </label>
            <select
                className="w-full p-2 border rounded-lg mb-3 dark:bg-gray-700 dark:text-white"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            >

                {filteredCategories && filteredCategories.map((item, index) => (
                    <option key={`option-${index}`} value={item}>{item}</option>
                ))}

            </select>

            <div className="flex items-center mb-3">
                <BaseInput type="checkbox" size="small" checked={completed} onChange={() => setCompleted(!completed)} />
                <span className="text-gray-700 dark:text-white">Completed</span>
            </div>

            <div className="flex align-center gap-2">
                <Button variant="secondary" shape="full" onClick={handleCancel}>Cancel</Button>
                <Button shape="full" onClick={handleSave}>Save Changes</Button>
            </div>
        </div>
    );
};

export default EditTask;

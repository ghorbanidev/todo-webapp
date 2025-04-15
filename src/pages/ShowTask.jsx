import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { useMemo } from "react";
import ThemeToggle from "../components/shared/ThemeModeButton";
import Button from "../components/shared/Button";

const ShowTask = () => {
    const { id } = useParams();
    const tasks = useSelector((state) => state.tasklist.tasks);

    const navigate = useNavigate();

    const handleBack = () => {
        navigate("/");
    };

    const task = useMemo(() => tasks.find(task => task.id === id), [tasks, id]);

    return (
        <div className="max-w-lg lg:max-w-5/12 mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md mt-10 lg:mt-36 mb-10">
            <div className="flex mb-2 items-center justify-between">
                <h2 className="text-2xl text-gray-800 dark:text-white font-bold mb-4">Task</h2>
                <ThemeToggle />
            </div>
            <label className="block mb-2 text-md font-medium text-gray-700 dark:text-white">
                Title:
            </label>
            <textarea
                disabled
                type="text"
                className="w-full p-2 border rounded-lg mb-3 dark:bg-gray-700 dark:text-white"
                value={task.text}
            />

            <div className="my-3 flex justify-start gap-2">
                <span className="inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-purple-700/10 ring-inset dark:bg-purple-900 dark:text-purple-300 dark:ring-purple-700">
                    {task.category}
                </span>
                <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-red-700/10 ring-inset dark:bg-red-900 dark:text-red-300 dark:ring-red-700">
                    {task.completed ? "Completed" : "Pending"}
                </span>
            </div>

            <Button shape="full" onClick={handleBack}>Back</Button>
        </div>
    );
};

export default ShowTask;

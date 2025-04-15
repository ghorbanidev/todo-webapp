import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { memo, useCallback } from "react";
import useAlertStore from "../../stores/alert.store";
import { removeTask, toggleTask } from "../../features/tasks/taskSlice";
import Button from "../shared/Button";
import { DeleteIcon, EditIcon, TickIcon } from "../shared/icons";


function TaskListItem() {
    const tasks = useSelector((state) => state.tasklist.tasks);
    const filter = useSelector((state) => state.filter.filter);
    const showAlert = useAlertStore(state => state.showAlert);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const filteredTasks = tasks.filter(
        (t) =>
            filter === "All Tasks" ||
            t.category === filter ||
            (filter === "Completed" && t.completed) ||
            (filter === "Pending" && !t.completed)
    ).reverse();

    const handleToggleClick = useCallback((e, task) => {
        e.stopPropagation();
        e.preventDefault();
        dispatch(toggleTask(task.id))
    }, [dispatch]);

    const handleRemoveTask = useCallback((e, task) => {
        e.stopPropagation();
        e.preventDefault();
        showAlert({
            message: "Are you sure you want to delete this task?",
            onConfirm: () => dispatch(removeTask(task.id)),
            confirmText: "Yes,Delete it",
            cancelText: "No,Keep it",
        })
    }, [dispatch, showAlert]);

    const handleNavigateToEdit = useCallback((e, task) => {
        e.stopPropagation();
        e.preventDefault();
        navigate(`/edit/${task.id}`);
    }, [navigate]);


    if (!filteredTasks.length) {
        return <h2 className="text-blue-400 font-bold text-2xl flex justify-center items-center">There is No Task</h2>
    }

    return (
        <>
            {
                filteredTasks.map((t) => (
                    <li key={t.id}
                        className="flex flex-col p-4 border rounded-lg shadow-sm hover:shadow-md dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                    >
                        <Link to={`/task/${t.id}`}>
                            <div className="flex justify-between items-center">
                                <span className={`flex-1 truncate max-w-6/12 ${t.completed ? "line-through text-gray-400 dark:text-gray-500" : ""}`}>
                                    {t.text}
                                </span>
                                <div className="flex gap-2">
                                    <Button size="small" onClick={(e) => handleToggleClick(e, t)} variant={`${t.completed ? "secondary" : "success"}`}>
                                        <span className="hidden md:block">{t.completed ? "UnDone" : "Done"}</span>
                                        <TickIcon className={"size-6 block md:hidden"} />
                                    </Button>
                                    <Button size="small" onClick={(e) => handleNavigateToEdit(e, t)} variant="primary">
                                        <span className="hidden md:block">Edit</span>
                                        <EditIcon className={"size-6 block md:hidden"} />
                                    </Button>
                                    <Button size="small" onClick={(e) => handleRemoveTask(e, t)} variant="danger">
                                        <span className="hidden md:block">Delete</span>
                                        <DeleteIcon className={"size-6 block md:hidden"} />
                                    </Button>
                                </div>
                            </div>
                            <div className="mt-2 flex justify-start">
                                <span className="inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-purple-700/10 ring-inset dark:bg-purple-900 dark:text-purple-300 dark:ring-purple-700">
                                    {t.category}
                                </span>
                            </div>
                        </Link>
                    </li>
                ))
            }
        </>
    );
}

export default memo(TaskListItem);


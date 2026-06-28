import { useEffect, useState } from "react";
import {
    getTasks,
    getCompletions,
    createTask,
    updateTask,
    deleteTask,
    completeTask,
    uncompleteTask
} from "../services/taskService";
import { isTaskCompletedForCurrentOccurrence } from "../utils/taskHelpers";

const useTasks = () => {
    const [tasks, setTasks] = useState([]);
    const [completions, setCompletions] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchTasksData = async () => {
        try {
            setLoading(true);

            const user = JSON.parse(localStorage.getItem("user"));

            const [tasksData, completionsData] =
                await Promise.all([
                    getTasks(user.id),
                    getCompletions(user.id)
                ]);

            if (tasksData.success && completionsData.success) {
                const mappedTasks = tasksData.tasks.map(task => ({
                    ...task,
                    isCompleted: isTaskCompletedForCurrentOccurrence(
                        task,
                        completionsData.completions
                    )
                }));

                setTasks(mappedTasks);
                setCompletions(completionsData.completions);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasksData();
    }, []);

    const toggleTask = async (task) => {
        try {
            const user = JSON.parse(
                localStorage.getItem("user")
            );

            if (task.isCompleted) {
                await uncompleteTask(task.id, user.id);
            } else {
                await completeTask(task.id, user.id);
            }

            await fetchTasksData();
        } catch (error) {
            console.error(error);
        }
    };

    const createNewTask = async (taskData) => {
        const response = await createTask(taskData);

        if (response.success) {
            await fetchTasksData();
        }

        return response;
    };

    const updateExistingTask = async (taskData) => {
        const response = await updateTask(taskData);

        if (response.success) {
            await fetchTasksData();
        }

        return response;
    };

    const deleteExistingTask = async (taskId) => {
        const response = await deleteTask(taskId);

        if (response.success) {
            await fetchTasksData();
        }

        return response;
    };

    return {
        tasks,
        completions,
        loading,
        fetchTasksData,
        toggleTask,
        createNewTask,
        updateExistingTask,
        deleteExistingTask
    };
};

export default useTasks;
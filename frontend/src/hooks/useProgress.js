import { useEffect, useState } from "react";
import { getTasks, getCompletions } from "../services/taskService";

const useProgress = () => {
    const [tasks, setTasks] = useState([]);
    const [completions, setCompletions] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchProgressData = async () => {
        try {
            setLoading(true);

            const user = JSON.parse(localStorage.getItem("user"));
            const [tasksData, completionsData] = await Promise.all([getTasks(user.id), getCompletions(user.id)]);

            if (tasksData.success && completionsData.success) {
                setTasks(tasksData.tasks);
                setCompletions(completionsData.completions);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProgressData();
    }, []);

    return {
        tasks,
        completions,
        loading,
        refresh: fetchProgressData
    };
};

export default useProgress;
import { useEffect, useState } from "react";
import { getProgressMetrics } from "../services/taskService";

const useProgress = () => {
    const [tasks, setTasks] = useState([]);
    const [completions, setCompletions] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchProgressData = async () => {
        try {
            setLoading(true);

            const user = JSON.parse(localStorage.getItem("user"));
            const data = await getProgressMetrics(user.id);

            if (data.success) {
                setTasks(data.tasks);
                setCompletions(data.completions);
            }
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
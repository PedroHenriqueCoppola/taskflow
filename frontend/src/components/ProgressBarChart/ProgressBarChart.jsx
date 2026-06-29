import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip
} from "recharts";

const ProgressBarChart = ({ data }) => {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart
                data={data}
                margin={{
                    top: 5,
                    right: 10,
                    left: -20,
                    bottom: 5
                }}
            >
                <CartesianGrid
                    stroke="#E5E7EB"
                    strokeDasharray="3 3"
                    vertical={false}
                />

                <XAxis
                    dataKey="label"
                    axisLine={false}
                    tickLine={false}
                    tick={{
                        fill: "#64748B",
                        fontSize: 12
                    }}
                />

                <YAxis
                    allowDecimals={false}
                    axisLine={false}
                    tickLine={false}
                    tick={{
                        fill: "#64748B",
                        fontSize: 12
                    }}
                />

                <Tooltip />

                <Bar
                    dataKey="value"
                    fill="#2EAF87"
                    radius={[6, 6, 0, 0]}
                />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default ProgressBarChart;
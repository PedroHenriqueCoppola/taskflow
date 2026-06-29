import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip
} from "recharts";

const ProgressLineChart = ({ data }) => {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart
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
                    domain={[0, 100]}
                    tickFormatter={(value) => `${value}%`}
                    axisLine={false}
                    tickLine={false}
                    tick={{
                        fill: "#64748B",
                        fontSize: 12
                    }}
                />

                <Tooltip
                    formatter={(value) => `${value}%`}
                />

                <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#2EAF87"
                    strokeWidth={3}
                    dot={{
                        r: 5,
                        fill: "#2EAF87"
                    }}
                    activeDot={{
                        r: 7
                    }}
                />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default ProgressLineChart;
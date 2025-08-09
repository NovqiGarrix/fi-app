import { Colors } from '@/constants/Colors';
import React from 'react';
import { PieChart } from 'react-native-gifted-charts';

const pieData = [
    { value: 50, color: Colors.dark.tint, focused: true },
    { value: 30, color: Colors.dark.tintSecondary },
    { value: 20, color: '#242424' },
];

export const MonthlyExpensesChart = () => {


    return (
        <PieChart
            donut
            textColor="black"
            innerRadius={20}
            data={pieData}
            radius={50}
            focusOnPress
        />
    );
};
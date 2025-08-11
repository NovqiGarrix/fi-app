import { Colors } from '@/constants/Colors';
import { Fonts } from '@/constants/Fonts';
import { categoryCollection, expenseCollection } from '@/lib/db';
import Category from '@/model/Category.model';
import Expense from '@/model/Expense.model';
import { withObservables } from '@nozbe/watermelondb/react';
import React, { useMemo } from 'react';
import { PieChart } from 'react-native-gifted-charts';

export const MonthlyExpensesChart = withObservables([], () => ({
    categories: categoryCollection.query(),
    expenses: expenseCollection.query()
}))(MonthlyExpensesChartComp) as React.ComponentType;

interface MonthlyExpensesChartProps {
    categories: Category[];
    expenses: Expense[];
}

function MonthlyExpensesChartComp({ categories, expenses }: MonthlyExpensesChartProps) {

    const pieData = useMemo(() => {
        const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);

        const categoryAmounts = categories.map(category => {
            const amount = expenses
                .filter(expense => expense.category.id === category.id)
                .reduce((sum, expense) => sum + expense.amount, 0);

            return {
                id: category.id,
                color: category.color,
                name: category.name,
                amount
            }
        });

        return categoryAmounts.map((category) => {
            return {
                value: (category.amount * totalAmount) / 100, color: category.color, text: category.name
            }
        });
    }, [expenses, categories]);

    return (
        <PieChart
            donut
            textColor={Colors.dark.text}
            font={Fonts.ManropeExtraBold}
            textSize={14}
            innerRadius={35}
            data={pieData}
            showText
            radius={120}
            focusOnPress
        />
    );
};
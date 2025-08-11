import { Fonts } from "@/constants/Fonts";
import { expenseCollection } from "@/lib/db";
import Expense from "@/model/Expense.model";
import { formatMoney } from "@/utils/formatter";
import { withObservables } from "@nozbe/watermelondb/react";
import { useMemo } from "react";
import { Text, View } from "react-native";
import { MonthlyExpensesChart } from "./MonthlyExpensesChart";

export const TotalSpendings = withObservables([], () => ({
    expenses: expenseCollection.query()
}))(TotalSpendingsComp) as React.ComponentType;

interface TotalSpendingsProps {
    expenses: Expense[];
}

function TotalSpendingsComp({ expenses }: TotalSpendingsProps) {

    const amount = useMemo(() => expenses.reduce((prev, acc) => prev + acc.amount, 0), [expenses]);

    return (
        <View className='gap-3 mt-3'>
            <View className='mt-5 items-center'>
                <MonthlyExpensesChart />
            </View>

            <Text
                style={{ fontFamily: Fonts.ManropeBold }}
                className='text-5xl mt-2 text-dark-text text-center'
            >
                {formatMoney(amount)}
            </Text>
        </View>
    )

}
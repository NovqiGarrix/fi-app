import { Fonts } from "@/constants/Fonts";
import { categoryCollection, expenseCollection } from "@/lib/db";
import Category from "@/model/Category.model";
import Expense from "@/model/Expense.model";
import { formatMoney } from "@/utils/formatter";
import { textOn } from "@/utils/label-color";
import { withObservables } from '@nozbe/watermelondb/react';
import { useMemo } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { CreateExpenseLabel } from "./CreateExpenseLabel";

interface ExpenseLabelCardsProps {
    categories: Category[];
    expenses: Expense[];
}

export const ExpenseLabelCards = withObservables([], () => ({
    categories: categoryCollection.query(),
    expenses: expenseCollection.query()
}))(ExpenseLabelCardsComp) as React.ComponentType;

function ExpenseLabelCardsComp({ categories, expenses }: ExpenseLabelCardsProps) {

    return (
        <View className="flex-row mr-3 mt-12">
            <CreateExpenseLabel />

            <FlatList
                data={categories}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item.id}
                style={{ flexGrow: 0 }}
                renderItem={({ item }) => <ExpenseLabelCard item={item} expenses={expenses} />}
            />
        </View>
    )

}

function ExpenseLabelCard({ item, expenses }: { item: Category; expenses: Expense[] }) {

    const amount = useMemo(() => expenses.filter((ex) => ex.category.id === item.id).reduce((prev, acc) => prev + acc.amount, 0), [expenses, item.id]);

    return (
        <TouchableOpacity className="px-4 h-20 items-start justify-center mr-3 rounded-2xl min-w-[120px]" style={{ backgroundColor: item.color }}>
            <Text style={{ fontFamily: Fonts.ManropeRegular, color: textOn(item.color) }} className="text-base">
                {item.name}
            </Text>
            <Text style={{ fontFamily: Fonts.ManropeBold, color: textOn(item.color) }} className="text-xl">
                {formatMoney(amount)}
            </Text>
        </TouchableOpacity>
    )

}
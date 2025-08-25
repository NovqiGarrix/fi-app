import { Fonts } from "@/constants/Fonts";
import { expenseCollection } from "@/lib/db";
import Expense from "@/model/Expense.model";
import { selectedCategoryFilterAtom } from "@/stores/spendings.store";
import { getStartOfMonth, getStartOfNextMonth } from "@/utils/date";
import { formatMoney } from "@/utils/formatter";
import Ionicons from '@expo/vector-icons/Ionicons';
import { Q } from "@nozbe/watermelondb";
import { withObservables } from "@nozbe/watermelondb/react";
import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { useMemo } from "react";
import { FlatList, Text, View } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import { AddExpense } from "./AddExpense";
import { SpendingCategoryFilter } from "./SpendingCategoryFilter";

function formatDate(timestamp: number) {
    const date = new Date(timestamp);

    const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('id-ID', options);

    return formattedDate;
}

export const Spendings = withObservables([], () => ({
    expenses: expenseCollection.query(
        Q.sortBy('created_at', Q.desc),
        Q.where('created_at', Q.between(getStartOfMonth(), getStartOfNextMonth()))
    )
}))(SpendingsComp) as React.ComponentType;

interface SpendingsProps {
    expenses: Expense[];
}

function SpendingsComp({ expenses }: SpendingsProps) {

    const [filter] = useAtom(selectedCategoryFilterAtom);

    const filteredExpenses = useMemo(() => {
        return filter === 'all' ? expenses : expenses.filter((exp) => exp.category.id === filter);
    }, [filter, expenses]);

    return (
        <View className="mt-6">
            <View className="flex-row justify-between mb-5">
                <Text style={{ fontFamily: Fonts.ManropeBold }} className='text-3xl text-dark-text'>Spendings</Text>
                <View className="gap-5 flex-row items-center">
                    <AddExpense />
                    <SpendingCategoryFilter />
                </View>
            </View>

            <FlatList
                data={filteredExpenses}
                showsVerticalScrollIndicator={false}
                keyExtractor={item => item.id}
                style={{ flexGrow: 0 }}
                ItemSeparatorComponent={() => <View className="h-7" />}
                renderItem={({ item, index }) => <Spending item={item} index={index} />}
            />

            {filteredExpenses.length <= 0 && (
                <View className="items-center justify-center">
                    <Text style={{ fontFamily: Fonts.ManropeRegular }} className="text-white text-lg">
                        You haven&apos;t added any expense yet. Press the plus button above to add your first expense.
                    </Text>
                </View>
            )}
        </View>
    )

}

function Spending({ item, index }: { item: Expense; index: number }) {

    const { data: category, isPending: isGettingCategory } = useQuery({
        queryKey: ['category', item.category.id],
        queryFn: () => item.category.fetch()
    });

    return (
        <Animated.View entering={FadeInUp.duration(400).delay(index * 50)} className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-3">
                <View className="w-16 h-16 items-center justify-center bg-[#212121] rounded-full">
                    <Ionicons name="arrow-up-outline" size={28} color="#fff" />
                </View>

                <View>
                    <Text style={{ fontFamily: Fonts.ManropeSemiBold }} className="text-dark-text text-xl ">{item.title}</Text>
                    <Text style={{ fontFamily: Fonts.ManropeRegular }} className="text-dark-tabIconDefault text-base mt-1.5">
                        {isGettingCategory ? '...' : category?.name} • {formatDate(item.createdAt)}
                    </Text>
                </View>
            </View>

            <Text style={{ fontFamily: Fonts.ManropeBold }} className="text-white text-xl">
                {formatMoney(item.amount)}
            </Text>
        </Animated.View>
    )
}
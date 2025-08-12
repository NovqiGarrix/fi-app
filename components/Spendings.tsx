import { Fonts } from "@/constants/Fonts";
import { expenseCollection } from "@/lib/db";
import Expense from "@/model/Expense.model";
import { getStartOfMonth, getStartOfNextMonth } from "@/utils/date";
import { formatMoney } from "@/utils/formatter";
import Ionicons from '@expo/vector-icons/Ionicons';
import { Q } from "@nozbe/watermelondb";
import { withObservables } from "@nozbe/watermelondb/react";
import { FlatList, Text, View } from "react-native";
import { AddExpense } from "./AddExpense";

function renderTimeAndDate(timestamp: number) {
    const date = new Date(timestamp);

    const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('id-ID', options);
    const formattedTime = date.toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    });

    return <Text style={{ fontFamily: Fonts.ManropeRegular }}>{formattedTime} • {formattedDate}</Text>
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

    return (
        <View className="mt-6">
            <View className="flex-row justify-between mb-5">
                <Text style={{ fontFamily: Fonts.ManropeBold }} className='text-3xl text-dark-text'>Spendings</Text>
                <AddExpense />
            </View>

            <FlatList
                data={expenses}
                showsVerticalScrollIndicator={false}
                keyExtractor={item => item.id}
                style={{ flexGrow: 0 }}
                ItemSeparatorComponent={() => <View className="h-7" />}
                renderItem={({ item }) => (
                    <View className="flex-row items-center justify-between">

                        <View className="flex-row items-center gap-3">
                            <View className="w-16 h-16 items-center justify-center bg-[#212121] rounded-full">
                                <Ionicons name="arrow-up-outline" size={28} color="#fff" />
                            </View>

                            <View>
                                <Text style={{ fontFamily: Fonts.ManropeSemiBold }} className="text-dark-text text-xl ">{item.title}</Text>
                                <Text style={{ fontFamily: Fonts.ManropeRegular }} className="text-dark-tabIconDefault text-base mt-1.5">{renderTimeAndDate(item.createdAt)}</Text>
                            </View>
                        </View>

                        <Text style={{ fontFamily: Fonts.ManropeBold }} className="text-white text-xl">
                            {formatMoney(item.amount)}
                        </Text>
                    </View>
                )}
            />

            {expenses.length <= 0 && (
                <View className="items-center justify-center">
                    <Text style={{ fontFamily: Fonts.ManropeRegular }} className="text-white text-lg">
                        You haven&apos;t added any expense yet. Press the plus button above to add your first expense.
                    </Text>
                </View>
            )}
        </View>
    )

}
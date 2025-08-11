import { Fonts } from "@/constants/Fonts";
import { incomeCollection } from "@/lib/db";
import Income from "@/model/Income.model";
import { formatMoney } from "@/utils/formatter";
import Fontisto from '@expo/vector-icons/Fontisto';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Q } from "@nozbe/watermelondb";
import { withObservables } from "@nozbe/watermelondb/react";
import { FlatList, Text, View } from "react-native";
import { AddIncome } from "./AddIncome";

interface IncomesProps {
    incomes: Income[];
}

export const Incomes = withObservables([], () => ({
    incomes: incomeCollection.query(
        Q.sortBy('created_at', Q.desc)
    )
}))(IncomesComp) as React.ComponentType;

function IncomesComp({ incomes }: IncomesProps) {

    return (
        <View>
            <View className="flex-row items-center justify-between mb-5">
                <Text style={{ fontFamily: Fonts.ManropeBold }} className='text-3xl text-dark-text'>My Income</Text>

                <AddIncome />
            </View>
            <FlatList
                data={incomes}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item.id}
                style={{ flexGrow: 0 }}
                renderItem={({ item }) => (
                    <View className="p-7 mr-3 rounded-3xl min-w-[200px] bg-[#1E1E1E]">
                        <View className="flex-row items-center justify-between mb-2">
                            <View className="w-14 h-14 items-center justify-center border border-dark-tabIconDefault/20 bg-[#212121] rounded-full">
                                <Fontisto name="dollar" size={24} color="#fff" />
                            </View>

                            <Ionicons name="ellipsis-horizontal" size={28} color="#fff" />
                        </View>

                        <Text style={{ fontFamily: Fonts.ManropeRegular }} className="text-white text-lg mt-3">
                            {item.title}
                        </Text>
                        <Text style={{ fontFamily: Fonts.ManropeBold }} className="text-white text-2xl mt-1.5">
                            {formatMoney(item.amount)}
                        </Text>
                    </View>
                )}
            />
        </View>
    )

}
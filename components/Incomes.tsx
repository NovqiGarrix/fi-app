import { Fonts } from "@/constants/Fonts";
import Fontisto from '@expo/vector-icons/Fontisto';
import Ionicons from '@expo/vector-icons/Ionicons';
import { FlatList, Text, View } from "react-native";

const DATA = [
    {
        id: '1',
        title: 'Salary',
        amount: 5000,
    },
    {
        id: '2',
        title: 'Freelance Work',
        amount: 1500,
    },
    {
        id: '3',
        title: 'Investment Returns',
        amount: 800,
    }
]

export function Incomes() {

    return (
        <View>
            <Text style={{ fontFamily: Fonts.ManropeBold }} className='text-3xl mb-5 text-dark-text'>My Income</Text>

            <FlatList
                data={DATA}
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
                            ${item.amount}
                        </Text>
                    </View>
                )}
            />
        </View>
    )

}
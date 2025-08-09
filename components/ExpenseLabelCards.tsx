import { Fonts } from "@/constants/Fonts";
import { textOn } from "@/utils/label-color";
import AntDesign from '@expo/vector-icons/AntDesign';
import { FlatList, Text, TouchableOpacity, View } from "react-native";

const DATA = [
    {
        id: '1',
        label: 'Housing',
        amount: '$500.00',
        color: '#FF6347',
    },
    {
        id: '2',
        label: 'Food',
        amount: '$200.00',
        color: '#4682B4',
    },
    {
        id: '3',
        label: 'Savings',
        amount: '$300.00',
        color: '#32CD32',
    },
    {
        id: '4',
        label: 'Entertainment',
        amount: '$150.00',
        color: '#FFD700',
    },
    {
        id: '5',
        label: 'Utilities',
        amount: '$100.00',
        color: '#8A2BE2',
    },
]

export function ExpenseLabelCards() {

    return (
        <View className="flex-row mr-3 mt-12">
            <TouchableOpacity className="px-4 py-2 items-start justify-center mr-3 rounded-2xl bg-[#242424]">
                <AntDesign name="plus" size={24} color="#fff" />
            </TouchableOpacity>

            <FlatList
                data={DATA}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item.id}
                style={{ flexGrow: 0 }}
                renderItem={({ item }) => (
                    <TouchableOpacity className="px-4 py-2 items-start justify-center mr-3 rounded-2xl min-w-[120px]" style={{ backgroundColor: item.color }}>
                        <Text style={{ fontFamily: Fonts.ManropeRegular, color: textOn(item.color) }} className="text-base">
                            {item.label}
                        </Text>
                        <Text style={{ fontFamily: Fonts.ManropeBold, color: textOn(item.color) }} className="text-xl">
                            {item.amount}
                        </Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    )

}
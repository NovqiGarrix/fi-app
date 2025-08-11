import { Fonts } from "@/constants/Fonts";
import Ionicons from '@expo/vector-icons/Ionicons';
import { FlatList, Text, View } from "react-native";
import { AddExpense } from "./AddExpense";


const DATA = [
    {
        id: '1',
        title: 'Rent',
        amount: 1200,
        date: new Date('2024-01-01T09:00:00').getTime()
    },
    {
        id: '2',
        title: 'Groceries',
        amount: 300,
        date: new Date('2024-01-03T14:30:00').getTime()
    },
    {
        id: '3',
        title: 'Utilities',
        amount: 150,
        date: new Date('2024-01-05T11:15:00').getTime()
    },
    {
        id: '4',
        title: 'Transportation',
        amount: 100,
        date: new Date('2024-01-07T08:45:00').getTime()
    },
    {
        id: '5',
        title: 'Internet',
        amount: 80,
        date: new Date('2024-01-10T16:20:00').getTime()
    },
    {
        id: '6',
        title: 'Phone Bill',
        amount: 50,
        date: new Date('2024-01-15T13:00:00').getTime()
    },
    {
        id: '7',
        title: 'Entertainment',
        amount: 120,
        date: new Date('2024-01-20T19:45:00').getTime()
    }
]

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

export function Spendings() {

    return (
        <View className="mt-6">
            <View className="flex-row justify-between mb-5">
                <Text style={{ fontFamily: Fonts.ManropeBold }} className='text-3xl text-dark-text'>Spendings</Text>
                <AddExpense />
            </View>

            <FlatList
                data={DATA}
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
                                <Text style={{ fontFamily: Fonts.ManropeRegular }} className="text-dark-tabIconDefault text-base mt-1.5">{renderTimeAndDate(item.date)}</Text>
                            </View>
                        </View>

                        <Text style={{ fontFamily: Fonts.ManropeBold }} className="text-white text-2xl">
                            ${item.amount}
                        </Text>
                    </View>
                )}
            />
        </View>
    )

}
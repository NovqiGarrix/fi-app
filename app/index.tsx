import { ExpenseLabelCards } from '@/components/ExpenseLabelCards';
import { Incomes } from '@/components/Incomes';
import { MonthlyExpensesChart } from '@/components/MonthlyExpensesChart';
import { Spendings } from '@/components/Spendings';
import { Fonts } from '@/constants/Fonts';
import { database } from '@/lib/db';
import { useQuery } from '@tanstack/react-query';
import { Image, ScrollView, Text, View } from 'react-native';

export default function HomeScreen() {

    const { data } = useQuery({
        queryKey: ['expenses'],
        queryFn: async () => {
            const expensesCollection = database.get('expenses')
            const expenses = await expensesCollection.query()
            return expenses
        },
    });

    console.log('Expenses:', data);

    return (
        <ScrollView contentContainerClassName='pb-8' className='flex-1 bg-dark-background'>

            <View className='py-14 px-4 bg-[#1F1F1F] rounded-b-[2.5rem]'>
                <View className='flex-row justify-between items-center'>
                    <View className='flex-row items-center'>
                        <Image
                            source={{ uri: "https://github.com/NovqiGarrix.png" }}
                            className='w-14 h-14 rounded-full object-cover mr-4'
                        />

                        <View>
                            <Text style={{ fontFamily: Fonts.ManropeLight }} className='text-base text-dark-tabIconDefault'>Hi, Garrix!</Text>
                            <Text style={{ fontFamily: Fonts.ManropeBold }} className='text-2xl text-dark-text'>Fi-App</Text>
                        </View>
                    </View>

                    <View className='flex-row items-center rounded-full border border-dark-tabIconDefault/20 bg-[#242424] py-2.5 px-4'>
                        <View className='w-3 h-3 bg-[#3AB879] mr-2' style={{ borderRadius: 9999 }} />
                        <Text style={{ fontFamily: Fonts.ManropeRegular }} className='text-base text-dark-text'>My Balance</Text>
                    </View>
                </View>

                <View className='mt-8'>
                    <View className='flex-row items-center justify-between'>
                        <Text style={{ fontFamily: Fonts.ManropeBold }} className='text-xl text-dark-text'>Expenses</Text>
                    </View>

                    <View className='flex-row justify-between items-center mt-4'>
                        <View className='gap-3'>
                            <Text style={{ fontFamily: Fonts.ManropeBold }} className='text-6xl text-dark-text'>$1,475<Text className='text-dark-text text-xl'>.00</Text></Text>
                            <Text style={{ fontFamily: Fonts.ManropeRegular }} className='text-base text-dark-tabIconDefault'>August, 2025</Text>
                        </View>

                        <View className='items-center justify-center -mt-4'>
                            <MonthlyExpensesChart />
                        </View>
                    </View>
                </View>

                <ExpenseLabelCards />
            </View>

            <View className='px-4 pt-6'>
                <Incomes />

                <Spendings />
            </View>

        </ScrollView>
    );
}
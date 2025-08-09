import { MonthlyExpensesChart } from '@/components/MonthlyExpensesChart';
import { Fonts } from '@/constants/Fonts';
import { Image, SafeAreaView, Text, View } from 'react-native';

export default function HomeScreen() {

    return (
        <SafeAreaView className='flex-1 py-14 px-4 bg-dark-background'>

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

        </SafeAreaView >
    );
}
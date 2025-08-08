import { SafeAreaView, Text } from 'react-native';

export default function HomeScreen() {
    return (
        <SafeAreaView className='flex-1 bg-dark-background'>
            <Text className='text-5xl text-dark-text text-center'>Hello World</Text>
        </SafeAreaView>
    );
}
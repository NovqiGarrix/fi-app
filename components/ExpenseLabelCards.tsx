import { Fonts } from "@/constants/Fonts";
import { categoryCollection } from "@/lib/db";
import Category from "@/model/Category.model";
import { textOn } from "@/utils/label-color";
import { withObservables } from '@nozbe/watermelondb/react';
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { CreateExpenseLabel } from "./CreateExpenseLabel";

interface ExpenseLabelCardsProps {
    categories: Category[]
}

export const ExpenseLabelCards = withObservables([], () => ({
    categories: categoryCollection.query()
}))(ExpenseLabelCardsComp) as React.ComponentType;

function ExpenseLabelCardsComp({ categories }: ExpenseLabelCardsProps) {

    return (
        <View className="flex-row mr-3 mt-12">
            <CreateExpenseLabel />

            <FlatList
                data={categories}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item.id}
                style={{ flexGrow: 0 }}
                renderItem={({ item }) => (
                    <TouchableOpacity className="px-4 h-20 items-start justify-center mr-3 rounded-2xl min-w-[120px]" style={{ backgroundColor: item.color }}>
                        <Text style={{ fontFamily: Fonts.ManropeRegular, color: textOn(item.color) }} className="text-base">
                            {item.name}
                        </Text>
                        <Text style={{ fontFamily: Fonts.ManropeBold, color: textOn(item.color) }} className="text-xl">
                            $500.00
                        </Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    )

}
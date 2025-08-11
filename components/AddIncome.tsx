import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { incomeCollection } from "@/lib/db";
import Ionicons from "@expo/vector-icons/Ionicons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDatabase } from "@nozbe/watermelondb/react";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Modal, Text, TextInput, ToastAndroid, TouchableOpacity, View } from "react-native";
import { Notifier, NotifierComponents } from "react-native-notifier";
import { z } from 'zod';

const addIncomeSchema = z.object({
    title: z.string().min(1, "Title is required"),
    amount: z.number().min(1, "Amount must be a positive number"),
});

type AddIncomeSchema = z.infer<typeof addIncomeSchema>;

export function AddIncome() {

    const database = useDatabase();
    const [showCreateModal, setShowCreateModal] = useState(false);

    const form = useForm<AddIncomeSchema>({
        resolver: zodResolver(addIncomeSchema),
        defaultValues: {
            title: '',
            amount: 0,
        }
    });

    const { mutateAsync: addIncome, isPending } = useMutation({
        mutationKey: ['addIncome'],
        mutationFn: async (data: AddIncomeSchema) => {

            await database.write(async () => {

                await incomeCollection.create((income) => {
                    income.title = data.title;
                    income.amount = data.amount;
                });

            });

        },
        onSuccess: () => {
            form.reset();
            setShowCreateModal(false);
            setTimeout(() => {
                Notifier.showNotification({
                    title: 'Success: Add Income',
                    description: 'Income added successfully',
                    Component: NotifierComponents.Alert,
                    componentProps: {
                        alertType: "success"
                    }
                })
            }, 100);
        },
        onError: (error) => {
            console.error(error);
            ToastAndroid.show(error.message, ToastAndroid.LONG);
        }
    });

    return (
        <>
            <TouchableOpacity onPress={() => setShowCreateModal(true)} hitSlop={10}>
                <Ionicons name="add-circle" size={32} color={Colors.dark.text} />
            </TouchableOpacity>

            <Modal transparent visible={showCreateModal} animationType="fade" onRequestClose={() => setShowCreateModal(false)}>
                <View className="flex-1 bg-black/60 items-center justify-center px-6">
                    <View className="w-full rounded-2xl bg-[#1c1c1c] p-6">
                        <View>
                            <Text style={{ fontFamily: Fonts.ManropeBold }} className="text-white text-xl mb-3">
                                Income Source
                            </Text>
                            <Controller
                                control={form.control}
                                name="title"
                                render={({ field: { onChange, value } }) => (
                                    <TextInput
                                        value={value}
                                        onChangeText={onChange}
                                        placeholder="Where is this income coming from?"
                                        placeholderTextColor="#9CA3AF"
                                        className="w-full bg-[#2a2a2a] text-white rounded-xl px-4 py-3 mb-5"
                                        style={{ fontFamily: Fonts.ManropeRegular }}
                                        autoFocus
                                        returnKeyType="next"
                                        editable={!isPending}
                                    />
                                )}
                            />
                        </View>
                        <View>
                            <Text style={{ fontFamily: Fonts.ManropeBold }} className="text-white text-xl mb-3">
                                Amount
                            </Text>
                            <Controller
                                control={form.control}
                                name="amount"
                                render={({ field: { onChange, value } }) => (
                                    <TextInput
                                        value={value.toString()}
                                        onChangeText={(value) => onChange(Number(value))}
                                        placeholder="Income from?"
                                        placeholderTextColor="#9CA3AF"
                                        className="w-full bg-[#2a2a2a] text-white rounded-xl px-4 py-3 mb-5"
                                        style={{ fontFamily: Fonts.ManropeRegular }}
                                        returnKeyType="done"
                                        editable={!isPending}
                                        onSubmitEditing={form.handleSubmit((data) => addIncome(data))}
                                    />
                                )}
                            />
                        </View>
                        <View className="flex-row justify-end gap-3">
                            <TouchableOpacity
                                className="px-4 py-2.5 rounded-xl bg-neutral-800"
                                onPress={() => setShowCreateModal(false)}
                                disabled={isPending}
                            >
                                <Text style={{ fontFamily: Fonts.ManropeBold }} className="text-white">Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                className="px-4 py-2.5 rounded-xl bg-dark-text"
                                onPress={form.handleSubmit((data) => addIncome(data))}
                                disabled={isPending}
                            >
                                <Text style={{ fontFamily: Fonts.ManropeBold }} className="text-black">Add</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

        </>
    )

}
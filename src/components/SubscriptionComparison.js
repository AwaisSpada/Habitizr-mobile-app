import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert, Modal, SafeAreaView, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import tiers from "../lib/tiers";

const TIERS = {
    PATHFINDER: 'pathfinder',
    TRAILBLAZER: 'trailblazer',
};

const PRICING_TIERS = {
    [TIERS.PATHFINDER]: { price: 0 },
    [TIERS.TRAILBLAZER]: { price: 9.99 },
};

const features = [
    {
        name: 'Number of Habits',
        pathfinder: '1 habit',
        trailblazer: 'Up to 3 habits',
        description: 'Maximum number of habits you can track',
    },
    {
        name: 'Habit Tracking',
        pathfinder: true,
        trailblazer: true,
        description: 'Track your daily habits and routines',
    },
    {
        name: 'Basic Analytics',
        pathfinder: true,
        trailblazer: true,
        description: 'View simple progress charts',
    },
    {
        name: 'AI-Powered Insights',
        pathfinder: 'Basic insights',
        trailblazer: 'Advanced personalized insights',
        description: 'Get AI-generated recommendations',
    },
    {
        name: 'SMS Reminders',
        pathfinder: true,
        trailblazer: true,
        description: 'Receive SMS notifications for habit reminders',
    },
    {
        name: 'Priority Support',
        pathfinder: false,
        trailblazer: true,
        description: 'Get faster responses from our support team',
    },
    {
        name: 'Advanced Analytics',
        pathfinder: false,
        trailblazer: 'Coming soon',
        description: 'Access detailed progress metrics and trends (coming soon)',
    },
];

const SubscriptionComparison = ({ visible, onClose, stripePayment, selectPlan, loading }) => {
    const navigation = useNavigation();
    const [selectedPlan, setSelectedPlan] = useState(null);

    const { TIERS } = tiers;

    const handleSelectPlan = (plan) => {
        setSelectedPlan(plan);
        selectPlan(plan)
    };

    const getBorderColor = (plan) => {
        return selectedPlan === plan ? 'rgb(83,121,166)' : 'lightgrey'; // Change border color when selected
    };

    return (
        <Modal visible={visible} animationType="slide" transparent={true}>
            <SafeAreaView style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, width: '90%', maxHeight: '95%', position: 'relative' }}>

                    {/* Close Icon */}
                    <View style={{ position: 'absolute', top: 10, right: 10, zIndex: 10 }}>
                        <TouchableOpacity
                            onPress={onClose}
                        >
                            <Entypo name="cross" size={28} color="black" />
                        </TouchableOpacity>
                    </View>

                    <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center' }}>
                        Choose Your Plan
                    </Text>
                    <Text style={{ textAlign: 'center', marginBottom: 20 }}>
                        Select the plan that best fits your habit-building journey
                    </Text>

                    <ScrollView>
                        <TouchableOpacity style={{ borderWidth: 2, borderColor: getBorderColor(TIERS.PATHFINDER), borderRadius: 15, padding: 20, marginBottom: 20 }} onPress={() => handleSelectPlan(TIERS.PATHFINDER)}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Pathfinder</Text>
                            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
                                ${PRICING_TIERS[TIERS.PATHFINDER].price}/month
                            </Text>
                            {features.map((feature) => (
                                <View key={feature.name} style={{ flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 12 }}>
                                    {typeof feature.pathfinder === 'boolean' ? (
                                        feature.pathfinder ? (
                                            <Icon name="check" size={20} color="green" />
                                        ) : (
                                            <Entypo name="cross" size={24} color="red" />
                                        )
                                    ) : (
                                        <Icon name="check" size={20} color="green" />
                                    )}
                                    <View>
                                        <Text style={{ fontWeight: "bold" }}>{feature.name}</Text>
                                        <Text style={{ color: "#6b7280", width: 250 }}>
                                            {typeof feature.pathfinder === "string" ? feature.pathfinder : feature.description}
                                        </Text>
                                    </View>
                                </View>
                            ))}
                        </TouchableOpacity>

                        <TouchableOpacity style={{ borderWidth: 2, borderColor: getBorderColor(TIERS.TRAILBLAZER), borderRadius: 15, padding: 20 }} onPress={() => handleSelectPlan(TIERS.TRAILBLAZER)}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Trailblazer</Text>
                            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
                                ${PRICING_TIERS[TIERS.TRAILBLAZER].price}/month
                            </Text>
                            {features.map((feature) => (
                                <View key={feature.name} style={{ flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 12 }}>
                                    {typeof feature.trailblazer === 'boolean' ? (
                                        feature.trailblazer ? (
                                            <Icon name="check" size={20} color="green" />
                                        ) : (
                                            <Entypo name="cross" size={24} color="red" />
                                        )
                                    ) : (
                                        <Icon name="check" size={20} color="green" />
                                    )}
                                    <View>
                                        <Text style={{ fontWeight: "bold" }}>{feature.name}</Text>
                                        <Text style={{ color: "#6b7280", width: 250 }}>
                                            {typeof feature.trailblazer === 'string' ? feature.trailblazer : feature.description}
                                        </Text>
                                    </View>
                                </View>
                            ))}
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            backgroundColor: 'rgb(83,121,166)',
                            padding: 12,
                            borderRadius: 15,
                            alignItems: 'center',
                            marginBottom: 20,
                            marginTop: 10
                        }}
                            onPress={() => { stripePayment(), onClose() }}
                        >
                            {loading ? (
                                <ActivityIndicator size="small" color="#fff" />
                            ) : (
                                <Text style={{ color: 'white', textAlign: 'center' }}>Upgrade to {selectedPlan}</Text>
                            )}
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </SafeAreaView>
        </Modal>
    );
};

export default SubscriptionComparison;



import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert, Modal, SafeAreaView, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import tiers from "../lib/tiers";
import { PlatformPayButton, isPlatformPaySupported, PlatformPay, confirmPlatformPayPayment } from '@stripe/stripe-react-native';
// import { paymentStripe } from './ ../../config/authService';
import { paymentStripe } from '../config/authService';
import { showMessage } from 'react-native-flash-message';

const TIERS = {
    PATHFINDER: 'pathfinder',
    TRAILBLAZER: 'trailblazer',
};

// const PRICING_TIERS = {
//     [TIERS.PATHFINDER]: { price: 0 },
//     [TIERS.TRAILBLAZER]: { price: 9.99 },
// };

const features = [
    {
        name: 'Number of Habits',
        pathfinder: '1 habit',
        basic: '1 habit',
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
        name: 'Push Notifications',
        pathfinder: true,
        trailblazer: true,
        basic: true,
        description: 'Get Push notifications for habit reminders',
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
        basic: false,
        description: 'Receive SMS notifications for habit reminders',
    },
    {
        name: 'Priority Support',
        pathfinder: false,
        trailblazer: true,
        basic: false,
        description: 'Get faster responses from our support team',
    },
    {
        name: 'Advanced Analytics',
        pathfinder: false,
        basic: false,
        trailblazer: 'Coming soon',
        description: 'Access detailed progress metrics and trends (coming soon)',
    },
];

const SubscriptionComparison = ({ visible, onClose, stripePayment, selectPlan, loading, user }) => {
    const { TIERS, PRICING_TIERS } = tiers;

    const navigation = useNavigation();
    const [packageError, setPackageError] = useState(null);
    const [selectedPlan, setSelectedPlan] = useState(TIERS.TRAILBLAZER);
    console.log(user);
    if (!user) {
        // showMessage({
        //     message: "Error",
        //     description: 'User not found',
        //     type: "danger",
        // });
        // return null;
    }


    const handleSelectPlan = (plan) => {
        console.log('PLAN:: ', plan);
        console.log(user?.packageType);
        if (plan === user?.packageType && user?.stripeSubscriptionStatus !== 'trial' ) {
            setPackageError(true);
            return;
        }
        setPackageError(false);
        setSelectedPlan(plan);
        selectPlan(plan)
    };

    const getBorderColor = (plan) => {
        return selectedPlan === plan ? 'rgb(83,121,166)' : 'lightgrey'; // Change border color when selected
    };

    const [isApplePaySupported, setIsApplePaySupported] = useState(false);

    useEffect(() => {
        (async function () {
            setIsApplePaySupported(await isPlatformPaySupported());
        })();
    }, [isPlatformPaySupported]);

    // ...


    const fetchPaymentIntent = async () => {
        //   console.log('select plan', selectPlan)

        //   setIsLoading(true);
        //   setIsUpgrading(true)
        try {
            let plan = {
                packageType: 'trailblazer',
            }

            const response = await paymentStripe(selectedPlan)
            console.log('get payment client scret', response)
            return response;
            // setClientSecret(response);
            // initializePaymentSheet(response);
        } catch (error) {
            showMessage({
                message: "Error",
                description: error?.message || 'Something went wrong!',
                type: "danger",
            });
        } finally {
            // setIsLoading(false);
            // setIsUpgrading(false)
        }
    };

    const pay = async () => {
        console.log('PSSSSL: ', selectedPlan);
        let price = 0;
        if (selectedPlan === TIERS.BASIC) {
            price = 0;
        } else if (selectedPlan === TIERS.PATHFINDER) {
            price = 6.99;
        } else if (selectedPlan === TIERS.TRAILBLAZER) {
            price = 9.99;
        }
        const clientSecret = await fetchPaymentIntent()
        const { error, paymentIntent } = await confirmPlatformPayPayment(
            clientSecret,
            {
                applePay: {
                    cartItems: [
                        {
                            label: selectedPlan,
                            amount: price.toString(),
                            paymentType: PlatformPay.PaymentType.Immediate,
                        },
                    ],
                    merchantCountryCode: 'US',
                    currencyCode: 'USD',
                    requiredShippingAddressFields: [
                        PlatformPay.ContactField.PostalAddress,
                    ],
                    requiredBillingContactFields: [PlatformPay.ContactField.PhoneNumber],
                },
            },
        );
        if (error) {
            console.log(error);
        } else {
            console.log(paymentIntent);
            //   Alert.alert('Success', 'Check the logs for payment intent details.');
            showMessage({
                message: "Success",
                description: 'Payment completed!',
                type: "success",
            });
            
        }
        onClose()
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
                    {packageError && (
                        <Text
                            style={{
                                textAlign: 'center',
                                marginBottom: 20,
                                color: 'white',
                                backgroundColor: 'red',
                                padding: 10,
                                borderRadius: 8,
                            }}
                        >
                            You are already subscribed to {user?.packageType} plan
                        </Text>
                    )}



                    <ScrollView>
                        <TouchableOpacity style={{ borderWidth: 2, borderColor: getBorderColor(TIERS.BASIC), borderRadius: 15, padding: 20, marginBottom: 20 }} onPress={() => handleSelectPlan(TIERS.BASIC)}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>BASIC</Text>
                            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
                                ${PRICING_TIERS[TIERS.BASIC].price}/month
                            </Text>
                            {features.map((feature) => (
                                <View key={feature.name} style={{ flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 12 }}>
                                    {typeof feature.basic === 'boolean' ? (
                                        feature.basic ? (
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
                                            {typeof feature.basic === 'string' ? feature.basic : feature.description}
                                        </Text>
                                    </View>
                                </View>
                            ))}
                        </TouchableOpacity>

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
                            <View style={{
                                position: 'absolute',
                                top: -10,
                                right: 10,
                                backgroundColor: '#5379a6',
                                paddingVertical: 4,
                                paddingHorizontal: 10,
                                borderRadius: 20,
                            }}>
                                <Text style={{ color: 'white', fontSize: 12 }}>Recommended</Text>
                            </View>
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

                        {
                            selectedPlan !== TIERS.BASIC && isApplePaySupported ? (
                                <PlatformPayButton
                                    onPress={pay}
                                    type={PlatformPay.ButtonType.Order}
                                    appearance={PlatformPay.ButtonStyle.Automatic}
                                    borderRadius={4}
                                    marginTop={10}
                                    style={{
                                        width: '100%',
                                        height: 50,
                                    }}
                                />
                            ) : (
                                <TouchableOpacity
                                    style={{
                                        backgroundColor: 'rgb(83,121,166)',
                                        padding: 12,
                                        borderRadius: 15,
                                        alignItems: 'center',
                                        marginBottom: 20,
                                        marginTop: 10,
                                    }}
                                    onPress={() => {
                                        stripePayment();
                                        onClose();
                                    }}
                                >
                                    {loading ? (
                                        <ActivityIndicator size="small" color="#fff" />
                                    ) : (
                                        <Text style={{ color: 'white', textAlign: 'center' }}>
                                            Upgrade to {selectedPlan}
                                        </Text>
                                    )}
                                </TouchableOpacity>
                            )
                        }

                    </ScrollView>
                </View>
            </SafeAreaView>
        </Modal>
    );
};

export default SubscriptionComparison;



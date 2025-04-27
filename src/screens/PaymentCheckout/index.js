import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, SafeAreaView, Alert, ActivityIndicator, StatusBar, Platform } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { paymentStripe } from '../../config/authService';
import { useStripe } from '@stripe/stripe-react-native';
import { showMessage } from "react-native-flash-message";
import tiers from "../../lib/tiers";
import styles from "./styles";

const PaymentCheckout = ({ navigation }) => {
    const [clientSecret, setClientSecret] = useState('');
    const [isLoading, setIsLoading] = useState(false)
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const { TIERS } = tiers;

    // Fetch the client secret from the backend
    const fetchPaymentIntent = async () => {
        setIsLoading(true)
        try {
            let plan = {
                packageType: TIERS.TRAILBLAZER,
            }

            const response = await paymentStripe(plan)
            console.log('get payment client scret', response)

            setClientSecret(response);
            initializePaymentSheet(response);
        } catch (error) {
            showMessage({
                message: "Error",
                description: error?.message || 'Something went wrong!',
                type: "danger",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const initializePaymentSheet = async (clientSecret) => {
        const { error } = await initPaymentSheet({
            paymentIntentClientSecret: clientSecret,
            merchantDisplayName: "Your Business Name",
        });

        if (!error) {
            const { error: paymentError } = await presentPaymentSheet();
            if (paymentError) {
                showMessage({
                    message: "Error",
                    description: paymentError.message || 'Payment Failed',
                    type: "danger",
                });
            } else {
                showMessage({
                    message: "Success",
                    description: 'Payment completed!',
                    type: "success",
                });
            }
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            {/* Header */}
                  <StatusBar
                    barStyle={Platform.OS === 'ios' ? 'dark-content' : 'dark-content'}
                    backgroundColor="rgb(243,249,254)"
                  />
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Icon name="arrow-left" size={28} color="#fff" />
                </TouchableOpacity>
            </View>

            {/* Subscription Details */}
            <View style={styles.content}>
                <Text style={styles.subscribeText}>Subscribe to</Text>
                <Text style={styles.planName}>TRAILBLAZER Plan</Text>

                <View style={styles.priceContainer}>
                    <Text style={styles.price}>$19.99</Text>
                    <Text style={styles.perMonth}>/month</Text>
                </View>
            </View>

            {/* Pay Now Button */}
            <TouchableOpacity style={styles.payNowButton} onPress={fetchPaymentIntent}>
                {isLoading ? (
                    <ActivityIndicator size="small" color="#fff" />
                ) : (
                    <Text style={styles.payNowText}>Pay Now</Text>
                )}
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default PaymentCheckout;

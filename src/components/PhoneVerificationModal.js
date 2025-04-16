import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    Modal,
    ActivityIndicator,
    Linking
} from "react-native";
import CountryPicker from "react-native-country-picker-modal";
import Entypo from "react-native-vector-icons/Entypo"; // Import Ionicons

const PhoneVerificationModal = ({ isVisible, onClose, onVerify, handleOnStart, isLoading }) => {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [isChecked, setIsChecked] = useState(false);
    const [smsOptin, setSMSOptin] = useState(false);

    const [countryCode, setCountryCode] = useState("US"); // Default country
    const [callingCode, setCallingCode] = useState("1"); // Default calling code

    return (
        <Modal visible={isVisible} transparent animationType="fade">
            <View style={styles.overlay}>
                <View style={styles.container}>
                    {/* Close Button */}
                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <Text style={styles.closeText}>×</Text>
                    </TouchableOpacity>

                    <Text style={styles.title}>Verify Phone Number</Text>
                    <Text style={styles.subtitle}>
                        Enter your phone number to receive SMS notifications for your habits.
                    </Text>

                    {/* Phone Number Input with Country Picker */}
                    <View style={styles.phoneContainer}>
                        <CountryPicker
                            withCallingCode
                            countryCodes={["US", "CA", "MX"]} // Add more country codes as needed
                            withFilter
                            withFlag

                            countryCode={countryCode}
                            onSelect={(country) => {
                                setCountryCode(country.cca2);
                                setCallingCode(country.callingCode[0]);
                            }}
                        />
                        <Text style={styles.callingCode}>+{callingCode}</Text>
                        <TextInput
                            style={styles.phoneInput}
                            placeholder="Enter phone number"
                            keyboardType="phone-pad"
                            value={phoneNumber}
                            onChangeText={setPhoneNumber}
                        />
                    </View>

                    {/* Checkbox */}
                    <TouchableOpacity
                        style={styles.checkboxContainer}
                        onPress={() => setIsChecked(!isChecked)}
                    >
                        <View style={[styles.checkbox, isChecked && styles.checkedBox, {color: '#1E90FF'}]}>
                            {isChecked && (
                                <Entypo name="check" size={18} color="white" />
                            )}
                        </View>
                        <Text style={styles.checkboxText}
                            onPress={() => Linking.openURL('https://habitizr.com/?tos=true')}>
                            I accept the <Text style={styles.link}>Terms of Service</Text>
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.checkboxContainer}
                        onPress={() => setSMSOptin(!smsOptin)}
                    >
                        <View style={[styles.checkbox, smsOptin && styles.checkedBox]}>
                            {setSMSOptin && (
                                <Entypo name="check" size={18} color="white" />
                            )}
                        </View>
                        <Text style={[styles.checkboxText, { width: '90%' }]}>
                            I consent to receive automated text messages (SMS) from Habitizr at the phone number provided for habit tracking reminders, progress follow-ups, and service-related notifications. Message and data rates may apply.
                            I understand that consent is not required to use the service and that I may opt out at any time by replying STOP.
                            <Text
                                style={{ color: '#1E90FF', textDecorationLine: 'underline' }}
                                onPress={() => Linking.openURL('https://habitizr.com/?privacy=true')}
                            >
                                SMS Opt In Policy
                            </Text>
                        </Text>
                    </TouchableOpacity>

                    {/* Verify Button */}
                    <TouchableOpacity
                        style={[styles.disabledButton]}
                        // onPress={() => onVerify(`+${callingCode} ${phoneNumber}`)}
                        onPress={() => { handleOnStart(phoneNumber) }}
                        disabled={!isChecked || phoneNumber.length < 7}
                    >
                        {isLoading ? (
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <ActivityIndicator size="small" color="#fff" />
                                <Text style={styles.buttonText}>  Verifying...</Text>
                            </View>
                        ) : (
                            <Text style={styles.buttonText}>{isLoading ? "Verifying..." : "Verify Number"}</Text>
                        )}

                    </TouchableOpacity>

                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        justifyContent: "center",
        alignItems: "center",
    },
    container: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
        width: "100%",
        alignItems: "center",
        position: "relative",
    },
    closeButton: {
        position: "absolute",
        top: 5,
        right: 15,
    },
    closeText: {
        fontSize: 30,
        color: "gray",
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 14,
        color: "gray",
        textAlign: "center",
        marginBottom: 20,
    },
    phoneContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "lightgrey",
        borderRadius: 20,
        padding: 5,
        marginBottom: 15,
        width: "100%",
    },
    callingCode: {
        fontSize: 16,
        marginLeft: 8,
    },
    phoneInput: {
        flex: 1,
        fontSize: 16,
        marginLeft: 8,
    },
    checkboxContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
        width: '100%'
    },
    checkboxText: {
        marginLeft: 8,
        fontSize: 14,
    },
    link: {
        color: "blue",
        textDecorationLine: "underline",
    },
    button: {
        backgroundColor: "#4A90E2",
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 5,
    },
    disabledButton: {
        backgroundColor: "rgb(85,121,167)",
        paddingVertical: 12,
        width: "100%",
        borderRadius: 15,
        alignItems: "center",
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 2,
        borderColor: "gray",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 8,
    },
    checkedBox: {
        backgroundColor: "#1E90FF",
        borderColor: "#1E90FF",
    },
    checkmark: {
        color: "white",
        fontSize: 14,
    },
    checkboxText: {
        fontSize: 14,
    },
});

export default PhoneVerificationModal;

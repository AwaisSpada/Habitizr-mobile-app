// import React, { useState } from "react";
// import {
//   Modal,
//   View,
//   Text,
//   TouchableOpacity,
//   FlatList,
//   ActivityIndicator,
//   Alert,
// } from "react-native";
// import Icon from "react-native-vector-icons/AntDesign";
// import Entypo from "react-native-vector-icons/Entypo";

// const TIERS = {
//   PATHFINDER: "pathfinder",
//   TRAILBLAZER: "trailblazer",
// };

// const PRICING_TIERS = {
//   [TIERS.PATHFINDER]: { price: 5.99 },
//   [TIERS.TRAILBLAZER]: { price: 12.99 },
// };

// const features = [
//   {
//     name: "Number of Habits",
//     pathfinder: "1 habit",
//     trailblazer: "Up to 3 habits",
//     description: "Maximum number of habits you can track",
//   },
//   {
//     name: "Habit Tracking",
//     pathfinder: true,
//     trailblazer: true,
//     description: "Track your daily habits and routines",
//   },
//   {
//     name: "Basic Analytics",
//     pathfinder: true,
//     trailblazer: true,
//     description: "View simple progress charts",
//   },
//   {
//     name: "AI-Powered Insights",
//     pathfinder: "Basic insights",
//     trailblazer: "Advanced personalized insights",
//     description: "Get AI-generated recommendations",
//   },
//   {
//     name: "SMS Reminders",
//     pathfinder: true,
//     trailblazer: true,
//     description: "Receive SMS notifications for habit reminders",
//   },
//   {
//     name: "Priority Support",
//     pathfinder: false,
//     trailblazer: true,
//     description: "Get faster responses from our support team",
//   },
//   {
//     name: "Advanced Analytics",
//     pathfinder: false,
//     trailblazer: "Coming soon",
//     description: "Access detailed progress metrics and trends (coming soon)",
//   },
// ];

// export default function SubscriptionComparison({ visible, onClose }) {
//   const [loading, setLoading] = useState(false);

//   const handleUpgrade = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch("https://your-api.com/api/create-checkout-session", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ packageType: TIERS.TRAILBLAZER }),
//       });

//       if (!response.ok) throw new Error("Failed to create checkout session");

//       const { url } = await response.json();
//       console.log('check url', url)
//       if (url) {
//         // Open Stripe URL
//         Alert.alert("Redirecting...", "You will be redirected to Stripe.", [
//           { text: "OK", onPress: () => Linking.openURL(url) },
//         ]);
//       } else {
//         throw new Error("No checkout URL received");
//       }
//     } catch (error) {
//       Alert.alert("Error", "Failed to start upgrade process. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Modal visible={visible} transparent animationType="slide">
//       <View style={styles.overlay}>
//         <View style={styles.modalContainer}>
//           <Text style={styles.title}>Choose Your Plan</Text>
//           <Text style={styles.subtitle}>
//             Select the plan that best fits your habit-building journey
//           </Text>

//           <FlatList
//             data={[TIERS.PATHFINDER, TIERS.TRAILBLAZER]}
//             keyExtractor={(item) => item}
//             renderItem={({ item }) => (
//               <View
//                 style={[
//                   styles.card,
//                   item === TIERS.TRAILBLAZER ? styles.highlightedCard : {},
//                 ]}
//               >
//                 {item === TIERS.TRAILBLAZER && (
//                   <View style={styles.recommendedTag}>
//                     <Text style={styles.recommendedText}>Recommended</Text>
//                   </View>
//                 )}
//                 <Text style={styles.planName}>
//                   {item === TIERS.PATHFINDER ? "Pathfinder" : "Trailblazer"}
//                 </Text>
//                 <Text style={styles.price}>
//                   ${PRICING_TIERS[item].price}/month
//                 </Text>
//                 <Text style={styles.description}>
//                   {item === TIERS.PATHFINDER
//                     ? "Perfect for getting started with habit tracking"
//                     : "For serious habit builders who want all features"}
//                 </Text>

//                 {features.map((feature) => (
//                     <View key={feature.name} style={{ flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 12 }}>
//                     {typeof feature.pathfinder === 'boolean'? (
//                         feature.pathfinder ? (
//                         <Icon name="check" size={20} color="green" />
//                         ) : (
//                         <Entypo name="cross" size={24} color="red" />
//                         )
//                     ) : (
//                         <Icon name="check" size={20} color="green" />
//                     )}
//                     <View>
//                         <Text style={{ fontWeight: "bold" }}>{feature.name}</Text>
//                         <Text style={{ color: "#6b7280", width:250 }}> 
//                         {typeof feature.pathfinder === "string" ? feature.pathfinder : feature.description}
//                         </Text>
//                     </View>
//                     </View>
//                 ))}

//                 {item === TIERS.TRAILBLAZER && (
//                   <TouchableOpacity
//                     style={styles.upgradeButton}
//                     onPress={handleUpgrade}
//                     disabled={loading}
//                   >
//                     {loading ? (
//                       <ActivityIndicator color="white" />
//                     ) : (
//                       <Text style={styles.buttonText}>
//                         Upgrade to Trailblazer
//                       </Text>
//                     )}
//                   </TouchableOpacity>
//                 )}
//               </View>
//             )}
//           />

//           <TouchableOpacity style={styles.closeButton} onPress={onClose}>
//             <Text style={styles.closeButtonText}>Close</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </Modal>
//   );
// }

// const styles = {
//   overlay: {
//     flex: 1,
//     backgroundColor: "rgba(0,0,0,0.5)",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   modalContainer: {
//     width: "90%",
//     backgroundColor: "#fff",
//     borderRadius: 10,
//     padding: 20,
//     maxHeight: "90%",
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: "bold",
//     textAlign: "center",
//   },
//   subtitle: {
//     fontSize: 14,
//     color: "gray",
//     textAlign: "center",
//     marginBottom: 10,
//   },
//   card: {
//     padding: 15,
//     borderRadius: 10,
//     marginVertical: 10,
//     backgroundColor: "#f8f9fa",
//   },
//   highlightedCard: {
//     borderWidth: 2,
//     borderColor: "#007AFF",
//   },
//   recommendedTag: {
//     backgroundColor: "#007AFF",
//     paddingHorizontal: 10,
//     paddingVertical: 3,
//     alignSelf: "flex-end",
//     borderRadius: 20,
//   },
//   recommendedText: {
//     color: "#fff",
//     fontSize: 12,
//   },
//   planName: {
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   price: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginTop: 5,
//   },
//   description: {
//     fontSize: 12,
//     color: "gray",
//     marginBottom: 10,
//   },
//   featureRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     paddingVertical: 3,
//   },
//   featureText: {
//     fontSize: 14,
//     fontWeight: "500",
//   },
//   featureValue: {
//     fontSize: 14,
//   },
//   upgradeButton: {
//     marginTop: 10,
//     backgroundColor: "#007AFF",
//     padding: 10,
//     borderRadius: 5,
//     alignItems: "center",
//   },
//   buttonText: {
//     color: "white",
//     fontWeight: "bold",
//   },
//   closeButton: {
//     marginTop: 10,
//     padding: 10,
//     alignItems: "center",
//   },
//   closeButtonText: {
//     color: "red",
//   },
// };



import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert, Modal, SafeAreaView, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import { upgradePlans } from '../config/authService';
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

const SubscriptionComparison = ({ visible, onClose }) => {
    const navigation = useNavigation();
    const { TIERS } = tiers;

    const handleUpgrade = async () => {
        let plan = {
            packageType: TIERS.TRAILBLAZER,
        }
        const response = await upgradePlans(plan)

        if (response) {
            await Linking.openURL(response); // Open Stripe checkout in the browser
        } else {
            throw new Error('No checkout URL received');
        }
        console.log('check response', response)
    };

    return (
        <Modal visible={visible} animationType="slide" transparent={true}>
            <SafeAreaView style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, width: '90%', maxHeight: '90%', position: 'relative' }}>

                    {/* Close Icon */}
                    <TouchableOpacity
                        onPress={onClose}
                        style={{ position: 'absolute', alignSelf: 'flex-end', top: 10, right: 10 }}
                    >
                        <Entypo name="cross" size={24} color="black" />
                    </TouchableOpacity>

                    <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center' }}>
                        Choose Your Plan
                    </Text>
                    <Text style={{ textAlign: 'center', marginBottom: 20 }}>
                        Select the plan that best fits your habit-building journey
                    </Text>

                    <ScrollView>
                        <View style={{ borderWidth: 1, borderColor:'lightgrey', borderRadius: 15, padding: 20, marginBottom: 20 }}>
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
                        </View>

                        <View style={{ borderWidth: 2, borderColor: 'rgb(83,121,166)',  borderRadius: 15, padding: 20 }}>
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
                            <TouchableOpacity style={{
                                backgroundColor: 'rgb(83,121,166)',
                                padding: 12,
                                borderRadius: 15,
                                alignItems: 'center',
                            }} onPress={handleUpgrade}>
                                <Text style={{ color: 'white', textAlign: 'center' }}>Upgrade to Trailblazer</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
        </Modal>
    );
};

export default SubscriptionComparison;



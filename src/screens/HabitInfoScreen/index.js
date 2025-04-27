import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, ScrollView, StatusBar, Platform } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import styles from './styles'

const HabitInfoScreen = (props) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={Platform.OS === 'ios' ? 'dark-content' : 'dark-content'}
        backgroundColor="rgb(243,249,254)"
      />
      <View style={styles.header}>
        <Text style={styles.logo}>habitizr</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity onPress={() => props.navigation.navigate('Login')}>
            <Text style={styles.logo}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={{ padding: 30 }}>
          <Text style={styles.title}>Transform Your Life Through Better Habits</Text>
          <Text style={styles.subtitle}>
            Whether you're looking to build positive habits or break free from negative ones,
            Habitizr helps you achieve lasting change with AI-powered SMS tracking.
          </Text>

          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <AntDesign name="checkcircleo" size={20} color="#5A7BEF" style={{ top: 10, right: 10 }} />
              <Text style={styles.cardTitle}>Build positive habits:</Text>
            </View>
            <Text style={styles.cardText}>exercise, reading, meditation</Text>
          </View>

          <View style={[styles.card, { marginTop: 20 }]}>
            <View style={styles.cardHeader}>
              <AntDesign name="checkcircleo" size={20} color="#5A7BEF" style={{ top: 10, right: 10 }} />
              <Text style={styles.cardTitle}>Break negative patterns:</Text>
            </View>
            <Text style={styles.cardText}>smoking, procrastination</Text>
          </View>

          <View style={[styles.card, { marginTop: 20 }]}>
            <View style={styles.cardHeader}>
              <AntDesign name="checkcircleo" size={20} color="#5A7BEF" style={{ top: 10, right: 10 }} />
              <Text style={styles.cardTitle}>Al-powered progress tracking</Text>
            </View>
            <Text style={styles.cardText}>and insights</Text>
          </View>
          <View style={styles.submitButton} >
            <TouchableOpacity onPress={() => props.navigation.navigate('Login')}>
              <Text style={styles.submitText}>
                Start Free Today
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.sectionTitle}>How It Works</Text>
          <View style={styles.howItWorksCard}>
            <Image
              source={require('../../assets/images/goal.jpeg')}
              style={styles.image}
            />
            <Text style={styles.cardTitle}>Set Your Goals</Text>
            <Text style={styles.cardText}>
              Choose habits to build or break, set your schedule
            </Text>
          </View>
          <View style={[styles.howItWorksCard, { marginTop: 50 }]}>
            <Image
              source={require('../../assets/images/guitar.jpeg')}
              style={styles.image}
            />
            <Text style={styles.cardTitle}>Get Daily Check-ins</Text>
            <Text style={styles.cardText}>
              Choose habits to build or break, set your schedule
            </Text>
          </View>
          <View style={[styles.howItWorksCard, { marginTop: 50 }]}>
            <Image
              source={require('../../assets/images/yoga.jpeg')}
              style={styles.image}
            />
            <Text style={styles.cardTitle}>Track Progress</Text>
            <Text style={styles.cardText}>
              Choose habits to build or break, set your schedule
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HabitInfoScreen;

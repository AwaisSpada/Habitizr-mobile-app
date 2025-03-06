import React, { useState } from "react";
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from "react-native";
import styles from './styles';

const LoginScreen = (props) => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <View style={styles.container}>
      {/* Logo */}
      {/* <Image
          source={require('../../assets/images/logo.png')}
          style={styles.logo}
        /> */}
      <View style={{ paddingTop: 60, alignSelf: 'flex-start', paddingLeft: 10 }}>
        <Text style={styles.mainTitle}>Habitizr</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>

        {/* Header Text */}
        <Text style={styles.header}>
          Start Your Journey to Better Habits Today!
        </Text>
        <Text style={styles.subHeader}>
          Join thousands of others who have transformed their lives with AI-powered habit tracking and personalized guidance through SMS.
        </Text>

        {/* Login Container */}
        <View style={styles.loginContainer}>
          <Text style={styles.title}>Welcome to Habitizr</Text>
          <Text style={styles.subtitle}>
            Create an account or log in to get started
          </Text>

          {/* Social Login Buttons */}
          <View style={{ alignItems: 'center', paddingTop: 20 }}>
            <View style={styles.socialContainer}>
              <TouchableOpacity style={styles.socialButton}>
                <Text style={styles.socialText}>G Google</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton}>
                <Text style={styles.socialText}>f Facebook</Text>
              </TouchableOpacity>
            </View>

            {/* Separator */}
            <View style={styles.separatorContainer}>
              <View style={styles.line} />
              <Text style={styles.separatorText}>OR CONTINUE WITH</Text>
              <View style={styles.line} />
            </View>

            {/* Toggle Login/Register */}
            <View style={styles.switchContainer}>
              <TouchableOpacity
                style={[styles.switchButton, isLogin && styles.activeButton]}
                onPress={() => setIsLogin(true)}
              >
                <Text style={[styles.switchText, isLogin && styles.activeText]}>Login</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.switchButton, !isLogin && styles.activeButton]}
                onPress={() => setIsLogin(false)}
              >
                <Text style={[styles.switchText, !isLogin && styles.activeText]}>Register</Text>
              </TouchableOpacity>
            </View>

            {/* Form Inputs - Only this part changes dynamically */}
            <View style={styles.formContainer}>
              <TextInput
                style={styles.input}
                placeholder="Username"
                placeholderTextColor="#888"
              />
              {!isLogin && (
                <TextInput
                  style={[styles.input, { marginTop: 12 }]}
                  placeholder="Email"
                  placeholderTextColor="#888"
                />
              )}
              <TextInput
                style={[styles.input, { marginTop: 12 }]}
                placeholder="Password"
                secureTextEntry
                placeholderTextColor="#888"
              />

              {/* Terms Checkbox for Register */}
              {!isLogin && (
                <View style={styles.termsContainer}>
                  <TouchableOpacity style={styles.checkbox} />
                  <Text style={styles.termsText}>
                    I agree to the <Text style={styles.link}>terms of service</Text>
                  </Text>
                </View>
              )}
            </View>

            {/* Submit Button */}
            <TouchableOpacity style={styles.submitButton} onPress={() => props.navigation.navigate('Dashboard')}>
              <Text style={styles.submitText}>
                {isLogin ? "Login" : "Register"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.sectionTitle}>Why Choose Habitizr?</Text>

        <View style={styles.featureCard}>
          <Text style={styles.featureTitle}>Simple & Effective</Text>
          <Text style={styles.featureText}>
            Track your habits via SMS - no apps to install, no notifications to ignore.
          </Text>
        </View>

        <View style={[styles.featureCard, { marginTop: 20 }]}>
          <Text style={styles.featureTitle}>AI-Powered Insights</Text>
          <Text style={styles.featureText}>
            Get personalized feedback and motivation based on your responses.
          </Text>
        </View>

        <View style={[styles.featureCard, { marginTop: 20 }]}>
          <Text style={styles.featureTitle}>Proven Results</Text>
          <Text style={styles.featureText}>
            Join thousands who have successfully built lasting habits with our platform.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default LoginScreen;

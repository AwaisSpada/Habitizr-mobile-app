import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import styles from "./styles";
import { showMessage } from "react-native-flash-message";
import { loginUser, registerUser } from '../../config/authService';
import { AuthContext } from '../../context/AuthContext';
import Entypo from "react-native-vector-icons/Entypo"; // Import Ionicons

const LoginScreen = (props) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const { login } = useContext(AuthContext);

  const handleAuth = async () => {
    if (!username || !password || (!isLogin && !email)) {
      showMessage({
        message: "Error",
        description:'Please fill in all fields',
        type: "danger",
      });
      return;
    }

    if (username.length < 3) {
      showMessage({
        message: "Error",
        description:'Username must be at least 3 characters',
        type: "danger",
      });
      return;
    }

    if (!isLogin && !/\S+@\S+\.\S+/.test(email)) {
      showMessage({
        message: "Error",
        description:'Please enter a valid email address',
        type: "danger",
      });
      return;
    }

    if (password.length < 6) {
      showMessage({
        message: "Error",
        description:'Password must be at least 6 characters',
        type: "danger",
      });
      return;
    }

    if (!isLogin && !isChecked) {
      showMessage({
        message: "Error",
        description:'You must agree to the terms of service',
        type: "danger",
      });
      return;
    }

    setLoading(true);

    try {
      const response = isLogin
        ? await loginUser({ username, password })
        : await registerUser({ username, email, password });
      showMessage({
        message: 'Success',
        description: isLogin ? "Login Successful!" : "Registration Successful!",
        type: "success",
      });

      setUsername("");
      setEmail("");
      setPassword("");
      setIsChecked(false);

      if (isLogin) {
        login(response);
        setTimeout(() => props.navigation.navigate("Dashboard"), 100);
      }
    } catch (error) {
      showMessage({
        message: "Error",
        description: error?.message || 'Something went wrong!',
        type: "danger",
      });
    } finally {
      setLoading(false);
    }
  };


  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={{ paddingTop: 10, alignSelf: "flex-start", paddingLeft: 10 }}>
        <Text style={styles.mainTitle}>Habitizr</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.header}>Start Your Journey to Better Habits Today!</Text>
        <Text style={styles.subHeader}>
          Join thousands of others who have transformed their lives with AI-powered habit tracking.
        </Text>

        <View style={styles.loginContainer}>
          <Text style={styles.title}>Welcome to Habitizr</Text>
          <Text style={styles.subtitle}>
            {isLogin ? "Log in to continue" : "Create an account to get started"}
          </Text>

          {/* Social Login Buttons */}
          <View style={{ alignItems: "center", paddingTop: 20 }}>
            <View style={styles.socialContainer}>
              <TouchableOpacity style={styles.socialButton} activeOpacity={0.7}>
                <Text style={styles.socialText}>G Google</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton} activeOpacity={0.7}>
                <Text style={styles.socialText}>f Facebook</Text>
              </TouchableOpacity>
            </View>

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

            {/* Input Fields */}
            <View style={styles.formContainer}>
              <TextInput
                style={styles.input}
                placeholder="Username"
                placeholderTextColor="#888"
                value={username}
                onChangeText={setUsername}
              />
              {!isLogin && (
                <TextInput
                  style={[styles.input, { marginTop: 12 }]}
                  placeholder="Email"
                  placeholderTextColor="#888"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                />
              )}
              <TextInput
                style={[styles.input, { marginTop: 12 }]}
                placeholder="Password"
                secureTextEntry
                placeholderTextColor="#888"
                value={password}
                onChangeText={setPassword}
              />

              {/* Terms Checkbox for Register */}
              {!isLogin && (
                <TouchableOpacity
                  style={styles.checkboxContainer}
                  onPress={() => setIsChecked(!isChecked)}
                >
                  <View style={[styles.checkbox, isChecked && styles.checkedBox]}>
                    {isChecked && (
                      <Entypo name="check" size={15} color="white" />
                    )}
                  </View>
                  <Text style={styles.checkboxText}>
                    I agree to the <Text style={styles.link}>terms of service</Text>
                  </Text>
                </TouchableOpacity>
              )}
            </View>
            {/* Submit Button */}
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleAuth}
              disabled={loading}
              activeOpacity={0.8}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.submitText}>{isLogin ? "Login" : "Register"}</Text>
              )}
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
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;


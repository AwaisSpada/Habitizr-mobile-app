import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Image
} from "react-native";
import styles from "./styles";
import { showMessage } from "react-native-flash-message";
import { loginUser, registerUser, googleLogin, sendNotification, appleLogin } from '../../config/authService';
import { AuthContext } from '../../context/AuthContext';
import Entypo from "react-native-vector-icons/Entypo"; // Import Ionicons
import { GoogleSignin, statusCodes, } from '@react-native-google-signin/google-signin';
import { appleAuth, AppleButton } from '@invertase/react-native-apple-authentication';
import ForgotPasswordModal from '../../components/ForgotPasswordModal';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = (props) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { login } = useContext(AuthContext);

  useEffect(() => {
    if (Platform.OS === 'android') {
      GoogleSignin.configure({
        webClientId: '727936511077-987cakqcr6t40ga1t39e1ebmvft240qf.apps.googleusercontent.com',
        forceCodeForRefreshToken: true,
        offlineAccess: true,
      })
    } else {
      GoogleSignin.configure({
        webClientId: '727936511077-987cakqcr6t40ga1t39e1ebmvft240qf.apps.googleusercontent.com',
        forceCodeForRefreshToken: true,
        iosClientId: '727936511077-l8e593r10l4ke7cb6l59tegqsdkb4e2j.apps.googleusercontent.com',
      })
    }
  }, [])

  const saveUserInfo = async (email, fullName) => {
    try {
      await AsyncStorage.setItem('apple_user_email', email);
      await AsyncStorage.setItem('apple_user_name', fullName);
    } catch (error) {
      console.error('Failed to save Apple user info:', error);
    }
  };
  
  const getUserInfo = async () => {
    try {
      const email = await AsyncStorage.getItem('apple_user_email');
      const name = await AsyncStorage.getItem('apple_user_name');
      return { email, fullName: name };
    } catch (error) {
      console.error('Failed to get Apple user info:', error);
      return {};
    }
  };

  // const signInWithApple = async () => {
  //   try {
  //     const appleAuthRequestResponse = await appleAuth.performRequest({
  //       requestedOperation: appleAuth.Operation.LOGIN,
  //       requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
  //     });

  //     if (!appleAuthRequestResponse.identityToken) {
  //       throw new Error("Apple Sign-In failed - no identity token received");
  //     }

  //     const { identityToken, user, email, fullName } = appleAuthRequestResponse;
  //     console.log("Apple ID Token:", identityToken);
  //     console.log("User ID:", user);
  //     console.log("Email:", email);
  //     console.log("Full Name:", fullName?.givenName?.familyName);
  //     let response = await appleLogin(email, fullName?.givenName);
  //     if (response?.user) {
  //       login(response?.user);
  //       setTimeout(() => props.navigation.navigate("Dashboard"), 100);
  //     }
  //     console.log('Apple API Response:', response);
  //   } catch (error) {
  //     console.error("Apple Sign-In Error:", error);
  //     showMessage({
  //       message: "Error",
  //       description: error.message,
  //       type: "danger",
  //     });    
  //   }
  // };

  const signInWithApple = async () => {
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });
  
      if (!appleAuthRequestResponse.identityToken) {
        throw new Error("Apple Sign-In failed - no identity token received");
      }
  
      const { identityToken, user, email, fullName } = appleAuthRequestResponse;
  
      let storedEmail = email;
      let storedName = fullName?.givenName;
  
      // If email or name not available, fetch from local storage
      if (!email || !fullName) {
        const savedInfo = await getUserInfo();
        storedEmail = savedInfo.email;
        storedName = savedInfo.fullName;
      } else {
        // Save info on first login
        await saveUserInfo(email, fullName?.givenName);
      }
  
      let response = await appleLogin(storedEmail, storedName);
      if (response?.user) {
        login(response?.user);
        setTimeout(() => props.navigation.navigate("Dashboard"), 100);
      }
      console.log('Apple API Response:', response);
    } catch (error) {
      console.error("Apple Sign-In Error:", error);
      showMessage({
        message: "Error",
        description: error.message,
        type: "danger",
      });
    }
  };
  

  const handleGoogleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signOut();
      const userInfo = await GoogleSignin.signIn();
      console.log('Google Login Success:', userInfo);

      // Ensure 'idToken' exists
      if (!userInfo.data.idToken) {
        throw new Error('No ID token received');
      }

      let response = await googleLogin(userInfo.data.idToken);
      if (response?.user) {
        login(response?.user);
        setTimeout(() => props.navigation.navigate("Dashboard"), 100);
      }
      console.log('Google API Response:', response);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User cancelled the login process');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Sign-in is already in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Play Services not available or outdated');
      } else {
        console.log('Google Sign-In Error:', error);
      }
    }
  };

  const handleAuth = async () => {
    if (!username || !password || (!isLogin && !email)) {
      showMessage({
        message: "Error",
        description: 'Please fill in all fields',
        type: "danger",
      });
      return;
    }

    if (username.length < 3) {
      showMessage({
        message: "Error",
        description: 'Username must be at least 3 characters',
        type: "danger",
      });
      return;
    }

    if (!isLogin && !/\S+@\S+\.\S+/.test(email)) {
      showMessage({
        message: "Error",
        description: 'Please enter a valid email address',
        type: "danger",
      });
      return;
    }

    if (password.length < 6) {
      showMessage({
        message: "Error",
        description: 'Password must be at least 6 characters',
        type: "danger",
      });
      return;
    }

    if (!isLogin && !isChecked) {
      showMessage({
        message: "Error",
        description: 'You must agree to the terms of service',
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
              <TouchableOpacity style={styles.socialButton} activeOpacity={0.7} onPress={() => handleGoogleLogin()}>
                <View style={styles.socialButton1}>
                  <Image source={require('../../assets/images/google.png')} style={{ width: 20, height: 20 }} />
                  <Text style={styles.socialText}> Google</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton} activeOpacity={0.7} onPress={() => signInWithApple()}>
                <View style={styles.socialButton1}>
                  <Image source={require('../../assets/images/apple.png')} style={{ width: 20, height: 20 }} />
                  <Text style={styles.socialText}> Apple</Text>
                </View>

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
            <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', paddingTop: 15 }} onPress={() => setIsModalVisible(true)}>
              <Text style={{ color: 'rgb(32, 139, 216)' }}>Forgot Password ?</Text>
            </TouchableOpacity>

            <ForgotPasswordModal
              visible={isModalVisible}
              onClose={() => setIsModalVisible(false)}
            />
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


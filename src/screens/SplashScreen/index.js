import React, { useEffect, useState } from 'react';
import { View, Image, Text, Animated, StyleSheet } from 'react-native';

const SplashScreen = (props) => {
    const [fadeAnim] = useState(new Animated.Value(0));

    useEffect(() => {
        Animated.timing(
            fadeAnim,
            {
                toValue: 1,
                duration: 5000,
                useNativeDriver: true
            }
        ).start(() => {
            // Navigate to the login screen after the animation is completed
            props.navigation.navigate('Login');
        });
    }, []);

    return (
        <View style={[styles.container, {backgroundColor: 'white'}]}>
            {/* <Image source={require('../../../assets/images/logo_screen.png')} style={styles.image} resizeMode='contain' /> */}
            <Animated.View style={{ opacity: fadeAnim }}>
                <View style={styles.title}>
                    <Text style={styles.mainTitle}>Habitizr</Text>
                </View>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
      image: {
        width: 250,
        height: 200
      },
      title: {
        alignItems: 'center'
      },
      mainTitle: {
        fontSize: 40,
        fontWeight: 'bold',
        color: 'rgb(113,177,224)'
      },
      animationText: {
        fontSize: 12,
        fontWeight: 'bold',
      },
  });

export default SplashScreen;

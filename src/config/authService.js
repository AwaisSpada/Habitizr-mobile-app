import api from "./api";
import ENDPOINTS from "./endpoints";
import { showMessage } from "react-native-flash-message";

// ✅ Register User
export const registerUser = async ({ username, email, password }) => {
    try {
        const response = await api.post(ENDPOINTS.REGISTER, {
            username,
            email,
            password,
            tosAccepted: false,
        });
        showMessage({
            message: 'Success',
            description: "Registration successful!",
            type: "success",
        });

        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Registration failed";

        showMessage({
            message: 'Error',
            description: errorMessage,
            type: "danger",
        });

        throw errorMessage;
    }
};

// ✅ Login User
export const loginUser = async ({ username, password }) => {
    try {
        const response = await api.post(ENDPOINTS.LOGIN, { username, password });
        console.log('checek login response', response)

        showMessage({
            message: 'Success',
            description: "Login successful!",
            type: "success",
        });

        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Login failed";

        showMessage({
            message: 'Error',
            description: errorMessage,
            type: "danger",
        });

        throw errorMessage;
    }
};

//Google Login
// export const googleLogin = async (data) => {
//     console.log('check token', data)
//     try {
//         const response = await api.post(ENDPOINTS.GOOGLE_LOGIN, {token: data });
//         console.log('checek google login response', response)

//         showMessage({
//             message: 'Success',
//             description: "Login successful!",
//             type: "success",
//         });

//         return response.data;
//     } catch (error) {
//         console.log('checek google error', error)
//         const errorMessage = error.response?.data?.message || "Login failed";

//         showMessage({
//             message: 'Error',
//             description: errorMessage,
//             type: "danger",
//         });

//         throw errorMessage;
//     }
// };

// ✅ Logout User
export const logoutUser = async () => {
    try {
        const response = await api.post(ENDPOINTS.LOGOUT);
        console.log('checek logout response', response)

        return response;
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Login failed";

        showMessage({
            message: 'Error',
            description: errorMessage,
            type: "danger",
        });

        throw errorMessage;
    }
};

//get Habits

export const getHabits = async () => {
    try {
        const response = await api.get(ENDPOINTS.HABITS);
        const habits = response.data;

        // Process habits data
        return habits.map((habit) => {
            const completions = habit.completions || [];
            const yesResponses = completions.filter((c) => c.completed).length;
            const totalCheckIns = completions.length;

            // Calculate streak
            let currentStreak = 0;
            const sortedCompletions = [...completions].sort(
                (a, b) => new Date(b.completedAt) - new Date(a.completedAt)
            );

            for (const completion of sortedCompletions) {
                if (completion.completed) {
                    currentStreak++;
                } else {
                    break;
                }
            }

            // Calculate completion rate
            const completionRate = totalCheckIns > 0
                ? Math.round((yesResponses / totalCheckIns) * 100)
                : 0;

            // Calculate progress towards 66-day goal
            const progressToTarget = Math.round((yesResponses / 66) * 100);

            return {
                ...habit,
                currentStreak,
                completionRate,
                progressToTarget,
            };
        });

    } catch (error) {
        const errorMessage = error.response?.data?.message || "Failed to fetch habits";

        showMessage({
            message: 'Error',
            description: errorMessage,
            type: "danger",
        });

        throw errorMessage;
    }
};

//fetch user
export const fetchUser = async () => {
    try {
        const response = await api.get(ENDPOINTS.USER);
        console.log('checek user response', response)

        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Unable to fetch user";

        showMessage({
            message: 'Error',
            description: errorMessage,
            type: "danger",
        });

        throw errorMessage;
    }
};

//create Habit
export const newCreateHabit = async (habit) => {
    try {
        const response = await api.post(ENDPOINTS.HABITS, habit); // Send habit directly
        return response;
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Failed to Create Habit";

        showMessage({
            message: 'Error',
            description: errorMessage,
            type: "danger",
        });

        throw errorMessage;
    }
};

const BASE_URL = "https://habitizr.com";

//HabitInsights

export const habitInsights = async (habitId) => {
    try {
        const response = await fetch(`${BASE_URL}/api/habits/${habitId}/insights`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
            throw new Error("Failed to habitInsights");
        }

        const data = await response.json();
        console.log("Habit started successfully:", data);
        return data;
    } catch (error) {
        console.error("Error starting habit:", error.message);
        throw new Error(error.message || "Failed to habitInsights habit");
    }
};

//Start Habit
export const startHabit = async (habitId) => {
    try {
        const response = await fetch(`${BASE_URL}/api/habits/${habitId}/start`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
            throw new Error("Failed to start habit");
        }

        const data = await response.json();
        console.log("Habit started successfully:", data);
        return data;
    } catch (error) {
        console.error("Error starting habit:", error.message);
        throw new Error(error.message || "Failed to start habit");
    }
};

//Stop Habit

export const stopHabit = async (habitId) => {
    try {
        const response = await fetch(`${BASE_URL}/api/habits/${habitId}/stop`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
            throw new Error("Failed to start habit");
        }

        const data = await response.json();
        console.log("Habit stop successfully:", data);
        return data;
    } catch (error) {
        console.error("Error starting habit:", error.message);
        throw new Error(error.message || "Failed to stop habit");
    }
};

//update Habit
export const editHabit = async (habitId, habit) => {
    console.log("Called editHabit with:", habitId);
    try {
        const response = await fetch(`${BASE_URL}/api/habits/${habitId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(habit),
        });

        if (!response.ok) {
            throw new Error("Failed to update habit");
        }

        const data = await response.json();
        console.log("Habit updated successfully", data);
        return data;
    } catch (error) {
        console.error("Error starting habit:", error.message);
        throw new Error(error.message || "Failed to update habit");
    }
};

// ✅ Delete Habit
export const deleteHabit = async (habitId) => {
    try {
        const response = await fetch(`${BASE_URL}/api/habits/${habitId}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            const text = await response.text();
            let errorData;
            try {
                errorData = text ? JSON.parse(text) : {};
            } catch {
                errorData = { message: text || 'Failed to delete habit' };
            }
            throw new Error(errorData.message || 'Failed to delete habit');
        }
        return { success: true };
    } catch (error) {
        Alert.alert('Error', error.message);
        return { success: false };
    }
};

export const upgradePlans = async (plan) => {
    console.log('body', plan)
    try {
        const response = await fetch(`${BASE_URL}/api/create-checkout-session`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(plan),
        });
        console.log("stripe response", response);

        if (!response.ok) {
            throw new Error("Failed to create checkout session");
        }

        const { url } = await response.json();
        console.error("url stripe", url);
        return url;
    } catch (error) {
        console.error("Error creating checkout session:", error);
    }
}

export const paymentStripe = async (plan) => {
    try {
        const response = await fetch(`${BASE_URL}/api/get-client-secret`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(plan),
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
        }

        const rawText = await response.text(); // Get raw text response
        console.log("Raw Response:", rawText);

        const data = JSON.parse(rawText); // Manually parse JSON
        console.log("Client Secret:", data.clientSecret);

        return data.clientSecret;
    } catch (error) {
        console.error("Error in Stripe Payment:", error.message);
    }
};

export const updateProfile = async (data) => {
    console.log('Received data:', data);
    const { phoneNumber, currentPassword, newPassword } = data;

    const url = `${api.defaults.baseURL}${ENDPOINTS.UPDATE_PROFILE}`;
    console.log('API URL:', url);
    console.log('Request Data:', { phoneNumber, currentPassword, newPassword });

    try {
        const response = await fetch(`${BASE_URL}/api/user/update-profile`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: data,
        });

        console.log('Response:', response);
        return response.data;
    } catch (error) {
        console.error('Error Response:', error.response);

        const errorMessage = error.response?.data?.message || "Failed to update profile";
        showMessage({
            message: 'Error',
            description: errorMessage,
            type: "danger",
        });

        throw errorMessage;
    }
};

export const googleLogin = async (data) => {
    const requestBody = JSON.stringify({ token: data });
    try {
        const response = await fetch(`${BASE_URL}/api/auth/google-signin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: requestBody,
        });

        console.log('Google Api Response:', response);

        // Check response body
        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.log('Check Google error:', error);
        const errorMessage = error.response?.data?.message || "Login failed";

        showMessage({
            message: 'Error',
            description: errorMessage,
            type: "danger",
        });

        throw errorMessage;
    }
};

export const appleLogin = async (email, fullName) => {
    console.log('apple Api Response:', email, fullName);
    const requestBody = JSON.stringify({ email: email,  name: fullName});
    try {
        const response = await fetch(`${BASE_URL}/api/auth/apple-signin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: requestBody,
        });

        // Check response body
        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.log('Check appleLogin error:', error);
        const errorMessage = error.response?.data?.message || "Login failed";

        showMessage({
            message: 'Error',
            description: errorMessage,
            type: "danger",
        });

        throw errorMessage;
    }
};

export const sendNotification = async () => {
    const response = await fetch('https://habitizr.com/api/push-notification', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            fcmToken: 'camXDQ4_SVum_WSwLv5yx6:APA91bFxU873h7f-KI2PrSa5mx3gAKKOVfQCodAMY_s3cS7_Eqa0Tvi1ajcBi5spRLckDtqj-VZ4Qa6CY9ZtaEjp1iQ94fMozXPjIOBNwTIspi0oVnfeQPA',
            title: 'Hello World',
            body: 'This is a test notification',
        }),
    });

    const result = await response.json();
    console.log('Notification Response:', result);
};


//cancel Subscription
export const cancelSubscription = async () => {
    try {
        const response = await fetch(`${BASE_URL}/api/stripe/cancel-subscription`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log('check the cancel response', response)
        if (!response.ok) {
            throw new Error('Failed to cancel subscription');
        }
        return response;
    } catch (error) {
        console.error('Error canceling subscription:', error);
    }
};

//forgot apssword
export const handleForgotPassword = async (data) => {
    const requestBody = JSON.stringify({ email: data });

    try {
        const response = await fetch(`${BASE_URL}/api/forgot-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: requestBody
        });
        console.log('check the forgot response', response)
        if (!response.ok) {
            throw new Error('Failed to forgot subscription');
        }
        return response;
    } catch (error) {
        console.error('Error forgot Password:', error);
    }
};

//Delete Account
export const deleteUser = async () => {
    try {
        const response = await fetch(`${BASE_URL}/api/delete-user`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error('Failed to delete account');
        }
        return response;
    } catch (error) {
        console.error('Error:', error);
    }
};

export const changePassword = async (newPassword) => {
    try {
        const response = await fetch(`${BASE_URL}/api/user/change-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ newPassword }),
        });

        if (!response.ok) {
            throw new Error('Failed to change password');
        }

        return await response.json();
    } catch (error) {
        console.error("Error changing password:", error);
        throw new Error(error.message || "Failed to change password");
    }
};

// UPDATE PHONE NO API
export const updatePhoneNumber = async (phoneNumber) => {
    console.log('Received data:', phoneNumber);
    try {
        const response = await fetch(`${BASE_URL}/api/user/phone`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ phoneNumber }),
        });

        if (!response.ok) {
            throw new Error('Failed to update phone number');
        }

        return await response.json();
    } catch (error) {
        console.error("Error updating phone number:", error);
        throw new Error(error.message || "Failed to update phone number");
    }
};
// import { StyleSheet } from 'react-native';

// const styles = StyleSheet.create({
//     backButton: {
//         position: 'absolute',
//         top: 20,
//         left: 15,
//         zIndex: 10,
//     },
//     mainContainer: {
//         flex: 1,
//         backgroundColor: 'white'
//     },
//     container: {
//         height:400,
//         backgroundColor: 'black',
//         paddingHorizontal: 20,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     header: {
//         position: 'absolute',
//         top: 20,
//         left: 10,
//         flexDirection: 'row',
//         alignItems: 'center'
//     },
//     companyName: {
//         color: 'white',
//         fontSize: 18,
//         fontWeight: 'bold',
//         marginLeft: 10
//     },
//     subscribeText: {
//         color: 'rgb(148,148,148)',
//         fontSize: 18,
//         fontWeight: '500',
//     },
//     priceContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginTop: 10
//     },
//     price: {
//         color: 'white',
//         fontSize: 28,
//         fontWeight: 'bold',
//     },
//     perMonth: {
//         color: 'rgb(148,148,148)',
//         fontSize: 16,
//         marginLeft: 5,
//         paddingTop:15
//     },
//     payNowButton: {
//         backgroundColor: '#ff9800',
//         paddingVertical: 12,
//         alignItems: 'center',
//         borderRadius: 8,
//         marginBottom: 20,
//     },
//     payNowText: {
//         color: 'white',
//         fontSize: 18,
//         fontWeight: 'bold'
//     }
// });

// export default styles;


import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#000",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 40,
    },
    header: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "flex-start",
    },
    backButton: {
        padding: 10,
    },
    content: {
        alignItems: "center",
    },
    subscribeText: {
        color: "#aaa",
        fontSize: 18,
        fontWeight: "400",
    },
    planName: {
        color: "#fff",
        fontSize: 24,
        fontWeight: "700",
        marginVertical: 5,
    },
    priceContainer: {
        flexDirection: "row",
        alignItems: "baseline",
        marginTop: 10,
    },
    price: {
        color: "white",
        fontSize: 38,
        fontWeight: "bold",
    },
    perMonth: {
        color: "#bbb",
        fontSize: 18,
        marginLeft: 5,
    },
    payNowButton: {
        width: "90%",
        backgroundColor: "#2979FF",
        paddingVertical: 15,
        borderRadius: 30,
        alignItems: "center",
        marginBottom: 30,
        shadowColor: "#ff9800",
        shadowOpacity: 0.4,
        shadowOffset: { width: 0, height: 4 },
        elevation: 5,
    },
    payNowText: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "600",
    },
});

export default styles;

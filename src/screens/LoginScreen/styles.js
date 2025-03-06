import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: 'rgb(53,101,208)',
    paddingTop:30
  },
  subHeader: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: 'rgb(105,112,126)',
  },
  container: { 
    flex: 1, 
    alignItems: "center", 
    justifyContent: "center", 
    backgroundColor: "rgb(243,249,254)", 
    padding: 20 
  },
  title: { 
    fontSize: 24, 
    fontWeight: "bold", 
    marginBottom: 5 
  },
  subtitle: { 
    fontSize: 14, 
    color: "#666", 
    marginBottom: 20 
  },
  socialContainer: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    width: "90%", 
    marginBottom: 10,
  },
  socialButton: { 
    flex: 1, 
    padding: 12, 
    borderRadius: 12, 
    backgroundColor: "white", 
    borderWidth:1,
    borderColor:'lightgrey',
    alignItems: "center", 
    marginHorizontal: 5 
  },
  socialText: { 
    fontSize: 14, 
    fontWeight: "bold" 
  },
  orText: { 
    marginVertical: 10, 
    color: "#777", 
    fontSize: 12 
  },
  switchContainer: { 
    flexDirection: "row", 
    backgroundColor: "rgb(245,245,245)", 
    borderRadius: 10, 
    width: "95%", 
    padding: 5, 
    marginBottom: 20,
    marginTop:20
  },
  switchButton: { 
    flex: 1, 
    padding: 8, 
    alignItems: "center", 
    borderRadius: 10 
  },
  activeButton: { 
    backgroundColor: "#fff", 
    shadowColor: "#000", 
    shadowOpacity: 0.1, 
    shadowRadius: 3, 
    elevation: 2 
  },
  switchText: { 
    fontSize: 16, 
    color: "#888" 
  },
  activeText: { 
    color: "#000" 
  },
  input: { 
    width: "100%", 
    height: 50, 
    borderWidth: 1, 
    borderColor: "#ddd",
    borderRadius: 12, 
    paddingHorizontal: 10, 
    marginBottom: 10, 
    backgroundColor: "white" 
  },
  termsContainer: { 
    flexDirection: "row", 
    alignItems: "center", 
    width: "100%",
    paddingLeft:10, 
    marginBottom: 10 
  },
  checkbox: { 
    width: 18, 
    height: 18, 
    borderRadius: 5, 
    borderWidth: 1, 
    borderColor: "#aaa", 
    marginRight: 5 
  },
  termsText: { 
    fontSize: 12, 
    color: "#777" 
  },
  link: { 
    color: "#777",
    fontWeight: "500",
    textDecorationLine: "underline",
  },
  submitButton: { 
    width: "95%", 
    backgroundColor: "#2979FF", 
    padding: 15, 
    borderRadius: 14, 
    alignItems: "center", 
    marginTop: 10 
  },
  submitText: { 
    color: "#fff", 
    fontSize: 16, 
    fontWeight: "bold" 
  },
  loginContainer:{
    width:'100%', 
    // alignItems:'center', 
    backgroundColor:'white', 
    padding:20,
    borderRadius:20,
    marginTop:30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  separatorContainer: {
    flexDirection: "row", 
    alignItems: "center", 
    width: "80%", 
    marginVertical: 10,
    paddingTop:20
  },
  line: {
    flex: 1, 
    height: 1, 
    backgroundColor: "#ccc",  // Light gray line
  },
  separatorText: {
    marginHorizontal: 10, 
    fontSize: 14, 
    color: "#777", // Slightly darker gray text
    fontWeight: "500",
  },
  logo:{
    width: 120,
    height: 120,
    alignSelf:'flex-start',
    paddingTop:20
  },
  formContainer: {
    width: "95%",
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "rgb(53,101,208)", // Blue text
    textAlign: "center",
    marginBottom: 15,
    paddingTop:30
  },
  featureCard: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 15,
    padding: 30,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3, // Shadow for Android
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
  },
  featureText: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
  },
});

export default styles;
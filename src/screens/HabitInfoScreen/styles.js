import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFF6FF', // Light blue background
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
    padding:20,
    backgroundColor:'white'
  },
  logo: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1c5c84", // Blue color
  },
  upgradeButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1c5c84", // Blue button
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    right: 10
  },
  upgradeText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 5,
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#3464D4',
  },
  subtitle: {
    fontSize: 18,
    color: '#555',
    marginTop: 10,
    marginBottom: 20,
    lineHeight: 30,
  },
  card: {
    backgroundColor: 'white',
    padding: 25,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    // borderWidth:1,
    // borderColor: 'lightgrey'
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight:'bold',
    marginLeft:20,
    paddingTop:10
  },
  cardText: {
    fontSize: 15,
    color: '#333',
    marginLeft: 20, // Align with the icon
    paddingTop:15
  },
  submitButton: { 
    width: "50%", 
    backgroundColor: "#2979FF", 
    padding: 15, 
    borderRadius: 14, 
    alignItems: "center", 
    justifyContent:'center',
    marginTop: 10 ,
    alignSelf:'center'
  },
  submitText: { 
    color: "#fff", 
    fontSize: 16, 
    fontWeight: "bold" 
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 10,
  },
  howItWorksCard: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    // alignItems: 'center',
    borderWidth:1,
    borderColor: 'lightgrey'
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    marginBottom: 10,
  },
  scrollContainer: {
    paddingBottom: 20,  // Prevent content from getting cut off at the bottom
  },
});

export default styles;
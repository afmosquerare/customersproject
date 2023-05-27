import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Customer from "./Customer";
import ListCustomer from "./ListCustomer";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();


export default function HomeTabs(){
    return(
        <Tab.Navigator>
            <Tab.Screen name="Customer" component={Customer} options={{
        tabBarIcon:({color, size})=>{
         return <Ionicons name="home-outline" size={size} color={color} />
        }
      }}></Tab.Screen>
            <Tab.Screen name="ListCustomer" component={ListCustomer}
            
            options={{
                tabBarIcon:({color, size})=>{
                 return <Ionicons name="list" size={size} color={color} />
                }
              }}
              
              
              ></Tab.Screen>
        </Tab.Navigator>
    )
}
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabs from "./BottomTabs";
import Login from "../screen/Login";
import Registro from "../screen/Registro";


const Stack = createNativeStackNavigator();

export default function StackNavigation() {


    <Stack.Navigator>
        <Stack.Screen

            name='Registro' 
            component={Registro}
            options={
                {
                    headerShown: false
                }
            }

        />

         <Stack.Screen

            name='Login' 
            component={Login}
            options={
                {
                    headerShown: false
                }
            }

        />

        <Stack.Screen
            name='Tab'
            component={BottomTabs}
            options={{
                headerShown:false
            }}
        />


    </Stack.Navigator>



}
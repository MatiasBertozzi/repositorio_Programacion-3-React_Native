import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabs from "./BottomTabs";
import Login from "../screen/Login";
import Registro from "../screen/Registro";


const Stack = createNativeStackNavigator();

export default function StackNavigation() {
    return(
    <Stack.Navigator>
        <Stack.Screen
<<<<<<< HEAD

            name='Registro' 
=======
        name='Registro' 
>>>>>>> f69c5d179cb8e0e1b6acecc5964c8b099e8f1f11
            component={Registro}
            options={
                {headerShown: false}}/>

         <Stack.Screen
<<<<<<< HEAD

=======
>>>>>>> f69c5d179cb8e0e1b6acecc5964c8b099e8f1f11
            name='Login' 
            component={Login}
            options={
                {headerShown: false}}/>

        <Stack.Screen
<<<<<<< HEAD
            name='Tab'
            component={BottomTabs}
            options={{
                headerShown:false
            }}
        />

=======
         name='Tab'
        component={BottomTabs}
        options={{
            headerShown:false
            }}/>
>>>>>>> f69c5d179cb8e0e1b6acecc5964c8b099e8f1f11

    </Stack.Navigator>

    )



}
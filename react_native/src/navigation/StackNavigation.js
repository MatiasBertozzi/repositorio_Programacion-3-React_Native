import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabs from "./BottomTabs";
import Login from "../screen/Login";
import Registro from "../screen/Registro";


const Stack = createNativeStackNavigator();

export default function StackNavigation() {


    <Stack.Navigation>
        <Screen.Stack

        name='Registro' 
            component={Registro}
            options={
                {
                    headerShown: false
                }
            }

        />

         <Screen.Stack

        name='Login' 
            component={Login}
            options={
                {
                    headerShown: false
                }
            }

        />

        <Screen.Stack
         name='Tab'
            component={BottomTabs}
            options={{
                headerShown:false
            }}
        />


    </Stack.Navigation>



}
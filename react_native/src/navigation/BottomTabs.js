import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { FontAwesome } from '@expo/vector-icons'
import Feed from '../screen/Feed';
import Perfil from '../screen/Perfil';
import CrearPosteo from '../screen/CrearPosteo';

 

const Tab= createBottomTabNavigator();

export default function BottomTabs(props) {
    console.log(props);
    
/* si el loggedIn es true va a mostrar el Tab navigation, caso contrario no lo hara por lo que no se podra acceder 
a las distintas paginas- !! no se si funciona o no ya que la base de datos no esta creada aun en el momento de escribir este codigo
si el codigo no funciona, modificarlo para que funcione !! */

    return(
        <Tab.Navigator>
          <Tab.Screen
            name='Feed' 
                    component={Feed}
                    options={{
                      headerShown:false,
                      tabBarIcon: () => <FontAwesome name='home' size={24} color={'#FDF0D5'} />,
                      tabBarActiveBackgroundColor:'#669BBC',
                      tabBarInactiveBackgroundColor: "#003049",
                      tabBarActiveTintColor:"#780000"
                    }}
                    />

          <Tab.Screen
            name='Mi perfil' 
                    component={Perfil}
                    options={{
                      headerShown:false,
                      tabBarIcon: () => <FontAwesome name='user' size={24} color={'#FDF0D5'} />,
                        tabBarActiveBackgroundColor:'#669BBC',
                      tabBarInactiveBackgroundColor: "#003049",
                      tabBarActiveTintColor:"#780000",
                    }}/>
                    
            <Tab.Screen name="Postear" component={CrearPosteo} 
            options={{
              headerShown:false,
              tabBarIcon: () => <FontAwesome name="upload" size={24} color={'#FDF0D5'} />,
              tabBarActiveBackgroundColor:'#669BBC',
              tabBarInactiveBackgroundColor: "#003049",
              tabBarActiveTintColor:"#780000"}} />


        </Tab.Navigator>

        )

  
}
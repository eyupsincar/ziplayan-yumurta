import * as React from 'react';
import {View, Text, Button} from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GameStart from "./src/GameStart";
import {Image} from "react-native";
import Images from "./constants/Images";

function HomeScreen() {
    const navigation = useNavigation();
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
           <View style={{height: "30%"}}>
               <Image source={Images.arkaPlan}/>
           </View>
            <View style={{height: "30%", alignItems: "center", justifyContent: "center"}}>
                <Button title={"Başlat"} onPress={() => navigation.navigate('Game')}/>
            </View>
        </View>
    );
}
function GameScreen() {
    return (
            <GameStart />
    );
}

const Stack = createNativeStackNavigator();

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}}/>
                <Stack.Screen name="Game" component={GameScreen} options={{headerShown: false}}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;

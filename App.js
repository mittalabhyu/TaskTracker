/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React,{useState,useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,Modal,
  StatusBar,Dimensions,TouchableOpacity,TextInput,Image
} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator,CardStyleInterpolators } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {AuthContext} from './component/context';
import {home} from './component/Home';
import {DrawerContent} from './component/Drawer';
import {loggedin} from './component/Login';
import AsyncStorage  from '@react-native-community/async-storage';

const RootStack=createStackNavigator();
const Root1Stack=createStackNavigator();
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const RootStackScreen=({navigation})=>(
  <RootStack.Navigator  screenOptions={{
 headerStyle:{
  backgroundColor:'white',
},
headerTintColor:'white',
headerTitleAlign:'center',
//headerShown:false,
cardStyleInterpolator:CardStyleInterpolators.forNoAnimation
}}>
  <RootStack.Screen name="first" component={home}options={{title:'TaskTracker',headerTitleAlign:'center',headerTintColor:'red'}}/>

</RootStack.Navigator>
);
const RootStackScreen1=({navigation})=>(
  <Root1Stack.Navigator  screenOptions={{
 headerStyle:{
  backgroundColor:'white',
},
headerTintColor:'white',
headerTitleAlign:'center',
//headerShown:false,
cardStyleInterpolator:CardStyleInterpolators.forNoAnimation
}}>
  <Root1Stack.Screen name="first" component={loggedin}options={{title:'TaskTracker',headerTitleAlign:'center',headerTintColor:'red', headerLeft:()=>(
           <Icon name='menu' size={30} backgroundColor='white'color="black" onPress={()=>
              navigation.openDrawer()
            }/>
          )}}/>

</Root1Stack.Navigator>
);
 function App() {
  
  const initialLoginState={
    isLoading:true,
    userName:null,
    userToken:null,
  };
     const loginReducer = (prevState, action) =>{
       switch (action.type) {
         case 'RETRIEVE_TOKEN':
           return {
             ...prevState,
             userToken: action.token,
             isLoading: false,
           };
         case 'LOGIN':
           return {
             ...prevState,
             userName: action.id,
             userToken: action.token,
             isLoading: false,
           };
         case 'LOGOUT':
           return {
             ...prevState,
             userName: null,
             userToken: null,
             isLoading: false,
            
           };
         case 'REGISTER':
           return {
             ...prevState,
             userName: action.id,
             userToken: action.token,
             isLoading: false,
           };
       }
     }
  const [loginState,dispatch]=React.useReducer(loginReducer,initialLoginState);
     const authContext=React.useMemo(()=>
     ({
       signin:async(token,uname,data)=>{
        
           AsyncStorage.setItem(
            'Data',
            JSON.stringify(data),
            () => {});
         dispatch({type:'LOGIN',id:uname,token:token});
       },
       signout:async()=>{
        const aa= await AsyncStorage.removeItem('Data');
         dispatch({type:'LOGOUT'});
       },
     }),[]);
     useEffect(()=>{
       setTimeout(()=>{
       Gettoken();
       },1000);
     },[]);
     async function Gettoken()
     {
      try {
        const myArray = await AsyncStorage.getItem('Data');
       // const myArray=null;
        if(myArray!=null){
     global.dataa=JSON.parse(myArray);
       console.log("Retrieved ",global.dataa);
          dispatch({type:'RETRIEVE_TOKEN',token:"token"});
        }
        else
        {
          dispatch({type:'RETRIEVE_TOKEN',token:null});
        }
      } catch (error) {
        console.log(error);
      }
     }
     //const [userToken, setUserToken]=useState(null);
    if(loginState.isLoading){
      return(
        <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:"#fff"}}>
           <Image style={{width: 158, height: 153}}
                  source={require('./android/app/src/main/assets/task.png')}/>
        </View>
      );
    }
    return( 
      <AuthContext.Provider value={authContext} >
    <NavigationContainer>
      { loginState.userToken !=null ?(
       <Drawer.Navigator drawerContent={props => <DrawerContent{...props}/>}>
       <Drawer.Screen name="Home" component={RootStackScreen1} />
     </Drawer.Navigator>
      )
      :
      /*<RootStackScreen/>*/
      <Drawer.Navigator>
        <Drawer.Screen name="Home" component={RootStackScreen} />
      </Drawer.Navigator>
      }
      </NavigationContainer>
      </AuthContext.Provider>
   
  );
};


export default App;


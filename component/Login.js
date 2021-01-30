import React,{useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,Modal,Alert,
  StatusBar,Dimensions,TouchableOpacity,TextInput,Image
} from 'react-native';
import './global'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AuthContext } from './context';
import firestore from '@react-native-firebase/firestore';
export function loggedin(){
  const [tname, settName] = useState("");
  const Add = () => {
    if(tname=='')
    {
      Alert.alert("Name Cannot be empty")
    }
   
    else{
    
       firestore()
       .collection('Task')
       .add({
         Taskname: tname,
         email: global.dataa.email,
         created:firestore.FieldValue.serverTimestamp()
       })
       .then((data) => {
         console.log('User added! ');
         Alert.alert("Task Created Successfully")
         settName('');
         setVisibility(false);
       }).catch((error)=>console.log(error));
       
     
       /* ... */
     
 



}
  }
  const { signout } = React.useContext(AuthContext);
    const [visibility,setVisibility]=useState(false);
    return (
    <View style={{flex:1}}>
     
    
    {/*<TouchableOpacity onPress={() => setVisibility(true)}>
    <Icon style={{marginTop:((Dimensions.get("screen").height)*0.7),alignSelf:'flex-end',padding:10,elevation:2,
         }} name="plus-circle-outline" size={60} color={'orange'} />
    
       </TouchableOpacity>*/}
         <TouchableOpacity
                      
                      // onPress={() => {loginHandle( data.username, data.password )}}
                    
                     onPress={() => setVisibility(true)}
                      style={{ shadowColor: "#000",
                      shadowOffset: {
                          width: 0,
                          height: 2,
                      },
                      shadowOpacity: 0.5,
                      shadowRadius: 4, 
                      elevation: 7,padding:"5%", backgroundColor: 'blue',borderRadius: 20, height: 40, justifyContent: 'center' , marginTop:((Dimensions.get("screen").height)*0.75),alignSelf:'center' }}>
                      <Text style={{fontSize: 20, color: 'white' ,textAlign:'center',paddingBottom:5,paddingRight:2}}> New Task</Text>
                  </TouchableOpacity>
                  
    <Modal transparent={true} visible={visibility} animationType="fade">
                      <View style={{flex:1,backgroundColor:'lightgrey'}}>
                      <TouchableOpacity onPress={() => setVisibility(false)}>
    <Icon style={{alignSelf:'flex-start',elevation:2,marginTop:10,marginLeft:10
         }} name="arrow-left" size={40} color={'black'} />
    
    </TouchableOpacity>
                      <View style={{justifyContent:'center',padding:20,backgroundColor:'white',marginTop:'50%',borderRadius:10,marginHorizontal:'10%',shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.5,
                        shadowRadius: 4,
                        
                        elevation: 7}}>
                    
                      <TextInput
                 style={{ marginTop:10, margin: 5,alignSelf:'center', padding: 5, paddingLeft: 20, backgroundColor: '#EBEDEF', width: 200, borderRadius: 20, fontSize: 15,height:40 }}
                 placeholder='Task Name'
                 value={tname}
                onChangeText={text => settName(text)}
                 placeholderTextColor='black'
                // onChangeText={(val) => textInputChange(val)}
             />
              <TouchableOpacity
                      
                      // onPress={() => {loginHandle( data.username, data.password )}}
                     onPress={() =>Add() }
                      style={{ shadowColor: "#000",
                      shadowOffset: {
                          width: 0,
                          height: 2,
                      },
                      shadowOpacity: 0.5,
                      shadowRadius: 4, 
                      elevation: 7,padding:"5%", backgroundColor: '#E71D36',borderRadius: 20, height: 40, justifyContent: 'center' , marginVertical: 10,alignSelf:'center' }}>
                      <Text style={{fontSize: 20, color: 'white' ,textAlign:'center',paddingBottom:5,paddingRight:2}}> Create</Text>
                  </TouchableOpacity>
             </View>
                      
                      </View>
                  </Modal>       
    </View>
    )
  }
  
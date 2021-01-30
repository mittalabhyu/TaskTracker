import React,{useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,Modal,
  StatusBar,Dimensions,TouchableOpacity,TextInput,Image, Alert
} from 'react-native';
import './global';
import { AuthContext } from './context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import firestore from '@react-native-firebase/firestore';
export function home(){
  const { signin } = React.useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [pass, setPassword] = useState("");
    const [name, setName] = useState("");
    const [suemail, setsuEmail] = useState("");
    const [supass, setsuPassword] = useState("");
    const submitdata = () => {
     
       if(name==''||suemail==''||supass=='')
       {
         Alert.alert("All Fields are Manadatory")
       }
      
       else{
        firestore()
        .collection('Users')
        // Filter results
        .where('email', '==', suemail)
        .get()
        .then(querySnapshot => {if(querySnapshot.size>=1){
          Alert.alert("Mail Already Exists")
        }
        else{
          firestore()
          .collection('Users')
          .add({
            name: name,
            email: suemail,
            password:supass
          })
          .then((data) => {
            console.log('User added! ');
            Alert.alert("Account added Successfully")
          }).catch((error)=>console.log(error));
          
        }
          /* ... */
        });
    
  setName('');
  setsuEmail('');
  setsuPassword('');
 
}
    }
    const Login = () => {
      if(email==''||pass=='')
      {
        Alert.alert("All Fields are Manadatory")
      }
      else{
        firestore()
        .collection('Users')
        // Filter results
        .where('email', '==', email)
        .get()
        .then(querySnapshot => {if(querySnapshot.size>=1){
          if(querySnapshot._docs[0]._data.password==pass){
            global.dataa=querySnapshot._docs[0]._data;
            signin("token",querySnapshot._docs[0]._data.email, querySnapshot._docs[0]._data);
          }
          else{
            Alert.alert("Invalid Password")
          }
        }
        else{
         Alert.alert("Email Not Found. Please Signup First")
          
        }
          /* ... */
        });
      {/*firestore()
      .collection('Users')
      .get()
      .then(querySnapshot => {
        console.log('Total users: ', querySnapshot.size);
    
        querySnapshot.forEach(documentSnapshot => {
          console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
        });
      });*/}
      setEmail('');
      setPassword('');
     }
    }
    return(
        <ScrollView style={{flex:1,backgroundColor:'pink'}}>
  
   <Image style={{width: 100, height: 103,marginTop:10,alignSelf:'center'}}
                  source={require('../android/app/src/main/assets/task.png')}/>
                 
                  <Text style={{fontSize:25,alignSelf:'center',padding:5,fontWeight:'bold',color:'black',marginVertical:10}}>Signin</Text>
                  <TextInput
                 style={{ marginVertical:10,alignSelf:'center', padding: 5, paddingLeft: 20, backgroundColor: '#EBEDEF', width: 350, borderRadius: 20, fontSize: 15,height:40 }}
                 placeholder='Email'
                 
                 placeholderTextColor='black'
                // onChangeText={(val) => textInputChange(val)}
                value={email}
                onChangeText={text => setEmail(text)}
                
             />
               <TextInput
                 style={{ marginVertical:10,alignSelf:'center', padding: 5, paddingLeft: 20, backgroundColor: '#EBEDEF', width: 350, borderRadius: 20, fontSize: 15,height:40 }}
                 placeholder='Password'
                 
                 placeholderTextColor='black'
                // onChangeText={(val) => textInputChange(val)}
                value={pass}
                onChangeText={text => setPassword(text)}
             />
              <TouchableOpacity
                      
                      // onPress={() => {loginHandle( data.username, data.password )}}
                     onPress={() =>Login() }
                      style={{ shadowColor: "#000",
                      shadowOffset: {
                          width: 0,
                          height: 2,
                      },
                      shadowOpacity: 0.5,
                      shadowRadius: 4, 
                      elevation: 7,padding:"5%", backgroundColor: 'orange',borderRadius: 20, height: 40, justifyContent: 'center' , marginVertical: 10,alignSelf:'center' }}>
                      <Text style={{fontSize: 20, color: 'white' ,textAlign:'center',paddingBottom:5,paddingRight:2}}> Login</Text>
                  </TouchableOpacity>
                  <Text style={{fontSize:25,alignSelf:'center',padding:5,fontWeight:'bold',color:'black',marginVertical:10}}>Create New Account</Text>
                  <TextInput
                 style={{ marginVertical:10,alignSelf:'center', padding: 5, paddingLeft: 20, backgroundColor: '#EBEDEF', width: 350, borderRadius: 20, fontSize: 15,height:40 }}
                 placeholder='Full Name'
                 value={name}
                onChangeText={text => setName(text)}
                 placeholderTextColor='black'
                // onChangeText={(val) => textInputChange(val)}
             />
                  <TextInput
                 style={{ marginVertical:10,alignSelf:'center', padding: 5, paddingLeft: 20, backgroundColor: '#EBEDEF', width: 350, borderRadius: 20, fontSize: 15,height:40 }}
                 placeholder='Email'
                 
                 placeholderTextColor='black'
                // onChangeText={(val) => textInputChange(val)}
                value={suemail}
                onChangeText={text => setsuEmail(text)}
             />
               <TextInput
                 style={{ marginVertical:10,alignSelf:'center', padding: 5, paddingLeft: 20, backgroundColor: '#EBEDEF', width: 350, borderRadius: 20, fontSize: 15,height:40 }}
                 placeholder='Password'
                 value={supass}
                 onChangeText={text => setsuPassword(text)}
                 placeholderTextColor='black'
                // onChangeText={(val) => textInputChange(val)}
             />
              <TouchableOpacity
                      
                      // onPress={() => {loginHandle( data.username, data.password )}}
                     onPress={() =>submitdata() }
                      style={{ shadowColor: "#000",
                      shadowOffset: {
                          width: 0,
                          height: 2,
                      },
                      shadowOpacity: 0.5,
                      shadowRadius: 4, 
                      elevation: 7,padding:"5%", backgroundColor: 'orange',borderRadius: 20, height: 40, justifyContent: 'center' , marginVertical: 10,alignSelf:'center' }}>
                      <Text style={{fontSize: 20, color: 'white' ,textAlign:'center',paddingBottom:5,paddingRight:2}}> Signup</Text>
                  </TouchableOpacity>
                  
  </ScrollView>
    )
  }
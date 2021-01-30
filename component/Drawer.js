import React from 'react';

import {
    createDrawerNavigator,
    DrawerContentScrollView, DrawerItem
} from '@react-navigation/drawer';
import './global'
import { StyleSheet, View,Image,Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AuthContext } from './context';

export function DrawerContent(props) {
    const { signout } = React.useContext(AuthContext);
    const signoutt=()=>{
        props.navigation.closeDrawer();
        signout();
    }
    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                <View style={{ flexDirection:'row',paddingVertical:'5.5%',padding:'6%',marginTop:'-3%',
                 marginHorizontal:'-1%',
                borderBottomWidth:0,
                borderBottomColor:'#000000',
                 //shadowColor: "#525252",
                 //shadowOffset: { width: 0, height: 2 }, // change this for more shadow
                 //shadowOpacity: 0.9,
                 //shadowRadius: 1,
                 // elevation:2,
                 
                 shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 1,
},
shadowOpacity: 0.18,
shadowRadius: 1.00,
elevation: 3,}}>
                        <Icon  name="arrow-left" size={30} color={'black'}onPress={()=>{ props.navigation.closeDrawer()}} /> 
                         <Text style={{color:'blue',paddingLeft:20,fontSize:20}}>{global.dataa.name}</Text>   
                         
                    </View>
                   
                    <Text style={{color:'blue',paddingLeft:20,fontSize:20}}>{global.dataa.email}</Text>
                     <DrawerItem style={styles.item}
                    icon={({ color, size }) => (
                        <Icon name='logout' size={30} style={{alignSelf:'center',marginVertical:10}} backgroundColor='white'color="red" 
                          />
                    )}
                    label="Log Out"
                    labelStyle={styles.labels}
                    onPress={() => { signoutt() }}
                />
                </View>
            </DrawerContentScrollView>
          <Text style={{ alignSelf:'center',fontFamily:'JosefinSans-Regular',paddingBottom:"1%",fontSize:18}}>All Rights Reserved </Text>
        </View>
    );
}
const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
        
    },
    userInfosection: {
        paddingLeft: '25%',
        paddingLeft: 20,
        
    },
    
   
    item: {
        marginVertical:1
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        
        borderBottomWidth:1,
        borderColor:'#525252'
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: 'black',
        borderTopWidth: 1
    },
   
    labels:{
       fontFamily:"JosefinSans-Regular",
       color:'black',
       fontSize:15
    }
});
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  TextInput,
  Image,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';



export function Chat({route,navigation}) {

    const[chatText,setChatText] = useState();
    const [chatHistory, setChatHistory] = useState([]);

    
    async function sendRequest(){

    const form = new FormData();
    var userJsonText = await AsyncStorage.getItem('user');
    var userJSObject = JSON.parse(userJsonText);
    form.append("id1",userJSObject.id);
    form.append("id2",route.params.id);


    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
      if (request.readyState == 4 && request.status == 200) {
        var responseText = request.responseText;
        var responseArray = JSON.parse(responseText);
        setChatHistory(responseArray);
      }
    };
    request.open('POST', 'http://10.0.2.2/hello_mango_php/load_chat.php', true);
    request.send(form);
  }

    const ui = (
      <SafeAreaView style={styles.chat}>
        <Text style={styles.chatText1}> Chat </Text>
        
        <Image
        source={{ uri: route.params.img }} style={styles.itemImage}
      />
        <Text style={styles.chatText2}>{route.params.name}</Text>

        <FlatList
          data={chatHistory}
          renderItem={chaItem}
          style={styles.chatList}
        />

        <View style={styles.chatsendView}>
          <TextInput
            style={styles.chatInput1}
            autoCorrect={false}
            placeholder={'Enter your massage'}
            onChangeText={setChatText}
          />

          <TouchableOpacity onPress={saveChat}>
            <Icon name="md-send" style={styles.chatIcon1} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );

    function start(){
      setInterval(sendRequest,500);
    }

    useEffect(start,[]);

    return ui;

    async function saveChat(){
      var userJsonText = await AsyncStorage.getItem('user');
      var fromUserObject = JSON.parse(userJsonText);
  
      var requestObject ={
        "from_user_id":fromUserObject.id,
       "to_user_id":route.params.id,
       "message":chatText,
          };
  
          const formData = new FormData();
          formData.append('requestJSON',JSON.stringify(requestObject));
  
          var request = new XMLHttpRequest();
          request.onreadystatechange=function(){
            if(request.readyState==4&& request.status==200){

            }
          };
  
          request.open('POST','http://10.0.2.2/hello_mango_php/save_chat.php', true);
          request.send(formData);
    }



  }




  function chaItem({item}) {
    const itemUI = (
      <View
        style={item.side == 'right' ? styles.chatViewRight : styles.chatViewLeft}>
        <Text>{item.msg}</Text>
        <View style={styles.chatView1}>
          <Text style={styles.chatText3}>{item.time}</Text>
          {item.side=="right"?<Icon name="checkmark-done-sharp" size={14} style={item.status=="seen"?styles.chatIconSeen:styles.chatIconSent}/>:null}
        </View>
      </View>
    );
    return itemUI;
  }


  const styles = StyleSheet.create({
    
    chatsendView: {
      flexDirection: 'row',
      width: '90%',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 15,
    },
    chatInput1: {
      width: '90%',
      height: 40,
      borderWidth: 2,
      borderRadius: 10,
      fontSize: 20,
      paddingLeft: 10,
      borderColor: '#6F6F6F',
      textAlign:'center',
    },
    chatIcon1: {
      paddingHorizontal: 15,
      color: 'green',
      fontSize: 24,
    },
    chatText3: {
      fontSize: 10,
      color: '#2b2b2b',
    },
    chatIconSeen: {
      paddingLeft: 10,
      color: 'green',
    },
    chatIconSent: {
      paddingLeft: 10,
      color: 'gray',
    },
    chatList: {
      width: '100%',
      paddingVertical: 10,
    },
    chatViewLeft: {
      backgroundColor: '#C1E8FF',
      paddingVertical: 5,
      paddingHorizontal: 15,
      borderRadius: 10,
      alignSelf: 'flex-start',
      marginLeft: 10,
    },
    chatViewRight: {
      backgroundColor: '#C1E8FF',
      paddingVertical: 5,
      paddingHorizontal: 15,
      borderRadius: 10,
      alignSelf: 'flex-end',
      marginRight: 10,
    },
    chatView1: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    chat: {
      flex: 1,
      alignItems: 'center',
    },
    chatText1: {
      fontSize: 28,
      paddingVertical: 15,
      color: '#66adab',
      fontFamily: 'Itim',
    },
    chatText2: {
      fontSize: 22,
      color: '#303030',
      fontWeight: 'bold',
      paddingVertical: 10,
    },
    itemImage: {
      width: 64,
      height: 64,
      borderRadius: 50,
    },
  });
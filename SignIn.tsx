import React, {useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  TextInput,
  Image,
  View,
  Pressable,
  Alert,

} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';


 export function SignIn({navigation}) {
    const [mobile, setMobile] = useState(null);
    const [password, setPassword] = useState(null);
  
    const ui = (
      <SafeAreaView style={styles.signInMain}>
        <Image
          source={require('./images/Hello_Mango.png')}
          style={styles.signInImage}
        />
  
        <View style={styles.signInView1}>
          <Icon style={styles.signInIcon1} name="mobile-phone" />
          <TextInput
            style={styles.signInInput1}
            autoCorrect={false}
            inputMode={'numeric'}
            maxLength={10}
            placeholder={'Your Mobile.'}
            onChangeText={setMobile}
          />
        </View>
  
        <View style={styles.signInView1}>
          <Icon style={styles.signInIcon1} name="lock" />
          <TextInput
            style={styles.signInInput1}
            secureTextEntry={true}
            autoCorrect={false}
            placeholder={'Your Password.'}
            onChangeText={setPassword}
          />
        </View>
  
        <Pressable style={styles.signInButton1} onPress={signInProcess}>
          <Text style={styles.signInButtonText1}>Sign In</Text>
        </Pressable>
        <Pressable style={styles.signInButton2} onPress={signUpPage}>
          <Text style={styles.signInButtonText1}>New User? Go to Sign Up</Text>
        </Pressable>
  
  
      </SafeAreaView>
    );
    return ui;

    function signUpPage(){
      navigation.navigate('Sign Up');
    }
  
    function signInProcess() {
      var jsRequestObject = {mobile: mobile, password: password};
      var jsRequestText = JSON.stringify(jsRequestObject);
  
      var formData = new FormData();
      formData.append('jsonRequestText', jsRequestText);
  
      var request = new XMLHttpRequest();
      request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) {
          var jsonResponseText = request.responseText;
          var jsResponseObject = JSON.parse(jsonResponseText);
  
          if (jsResponseObject.msg == 'Error') {
            Alert.alert('Message', 'Invalid Details');
          } else {
            var userObject = jsResponseObject.user;
            Alert.alert('Message', 'Hello ' + userObject.name);
  
            AsyncStorage.setItem('user', JSON.stringify(userObject));

            //Navigate to Home
            navigation.navigate('Home');
          }
        }
      };
      request.open('POST', 'http://10.0.2.2/hello_mango_php/signIn.php', true);
      request.send(formData);
    }
  }



  const styles = StyleSheet.create({

    signInButtonText1: {
      fontSize: 17,
      color: 'white',
      fontWeight: 'bold',
    },
    signInButton1: {
      width: '80%',
      height: 45,
      backgroundColor: '#303030',
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    signInButton2: {
      width: '80%',
      height: 45,
      backgroundColor: '#36C462',
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    signInView1: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    signInIcon1: {
      fontSize: 29,
      position: 'absolute',
      start: 15,
    },
    signInInput1: {
      width: '80%',
      height: 50,
      fontSize: 20,
      borderRadius: 10,
      borderColor: 'black',
      borderWidth: 2,
      paddingStart: 40,
    },
  
    signInImage: {
      width: 100,
      height: 100,
      borderRadius: 50,
    },
    signInMain: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      gap: 25,
    },
    
  });
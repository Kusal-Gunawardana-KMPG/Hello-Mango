import React, {useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  TextInput,
  Image,
  View,
  Button,
  Alert,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import SelectDropdown from 'react-native-select-dropdown';

export function SignUp({navigation}) {
  const [mobileNumber, setMobileNumber] = useState('');
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [password, setPassword] = useState('');
  const [verifyPassword, setverifyPassword] = useState('');
  const [email, setEmail] = useState('');
  const [profileImage, setProfileImage] = useState(null);

  const [countries, setCountries] = useState('');

  const ui = (
    <SafeAreaView style={styles.signUnMain}>
      
      <View style={styles.logoBackground}>
        <Image
          style={styles.signUpLogo}
          source={require('./images/Hello_Mango.png')}
        />
      </View>

      <View style={styles.signInView1}>
        <Icon style={styles.signInIcon1} name="user" />
        <TextInput
          style={styles.signInInput1}
          maxLength={100}
          placeholder={'Type Name.'}
          onChangeText={setName}
        />
      </View>

      <View style={styles.signInView1}>
        <Icon style={styles.signInIcon1} name="mobile-phone" />
        <TextInput
          style={styles.signInInput1}
          keyboardType={'numeric'}
          maxLength={10}
          placeholder={'Type Mobile.'}
          onChangeText={setMobileNumber}
          autoCorrect={false}
        />
      </View>

      <View style={styles.signInView1}>
        <Icon style={styles.signInIcon1} name="envelope" />
        <TextInput
          style={styles.signInInput1}
          keyboardType={'email-address'}
          maxLength={100}
          placeholder={'  Type Email.'}
          onChangeText={setEmail}
          autoCorrect={false}
        />
      </View>

      <View style={styles.signInView1}>
        <Icon style={styles.signInIcon1} name="lock" />
        <TextInput
          style={styles.signInInput1}
          secureTextEntry={true}
          autoCorrect={false}
          placeholder={'Type Password.'}
          onChangeText={setPassword}
        />
      </View>

      <View style={styles.signInView1}>
        <Icon style={styles.signInIcon1} name="lock" />
        <TextInput
          style={styles.signInInput1}
          secureTextEntry={true}
          autoCorrect={false}
          placeholder={'Re-type Password.'}
          onChangeText={setverifyPassword}
        />
      </View>

      <View style={styles.signInView1}>
        <Text style={styles.countryName}>Country : </Text>
        <SelectDropdown
          data={countries}
          onSelect={setCountry}
          defaultButtonText={'Select Your Country'}
          
        />
      </View>

      <Button title="Select Profile Picture" onPress={selectProfilePicture} />

      <Button title="Sign Up" onPress={signUpRequest} />
     
    </SafeAreaView>
  );

  function loadCountries() {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
      if (request.readyState == 4 && request.status == 200) {
        var countryArray = JSON.parse(request.responseText);
        setCountries(countryArray);
      }
    };
    request.open(
      'GET',
      'http://10.0.2.2/hello_mango_php/load_countries.php',
      true,
    );
    request.send();
  }

  loadCountries();

  async function selectProfilePicture() {
    const options = {
      mediaType: 'photo',
    };

    const result = await launchImageLibrary(options);

    if (result.didCancel) {
      Alert.alert('Message', 'No Image');
    } else {
      const imageObject = {
        uri: result.assets[0].uri,
        name: 'profile.png',
        type: 'image/png',
      };
      setProfileImage(imageObject);
    }
  }

  function signUpRequest() {
    var form = new FormData();
    form.append('mobile', mobileNumber);
    form.append('name', name);
    form.append('password', password);
    form.append('verifyPassword', verifyPassword);
    form.append('country', country);
    form.append('profile_picture', profileImage);
    form.append('email', email);

    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
      if (request.readyState == 4 && request.status == 200) {
        Alert.alert('Response', request.responseText);
      }
    };
    request.open('POST', 'http://10.0.2.2/hello_mango_php/signUp.php', true);
    request.send(form);
  }

  return ui;
}

const styles = StyleSheet.create({
  signUpSelect: {
    width: '80%',
    height: 40,
    borderStyle: 'solid',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    start: 40,
  },
  signUpLogo: {
    width: 150,
    height: 150,
  },
  logoBackground:{
    borderColor: 'black',
    borderStyle: 'solid',
    borderRadius: 100,
    borderWidth: 2,
  },
  signUnMain: {
    flex: 1,
    alignItems: 'center',
    gap: 25,
    backgroundColor: '#b1a998',
  },
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
    borderColor: '#70746b',
    borderWidth: 4,
    paddingStart: 40,
    color:"black",
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
  countryName: {
    fontSize: 20,
  },
});

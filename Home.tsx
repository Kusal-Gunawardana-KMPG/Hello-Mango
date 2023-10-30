import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  TextInput,
  Image,
  View,
  FlatList,
  Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function Home({navigation}) {
  const [searchText, setSearchText] = useState("");

  const [items, setItems] = useState([]);

  async function loadFriendList(text){
    const userJSONText = await AsyncStorage.getItem('user');
    const formData = new FormData();
    formData.append('userJSONText', userJSONText);
    formData.append('text',text);

    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
      if (request.readyState == 4 && request.status == 200) {
        setItems(JSON.parse(request.responseText));
      }
    };
    request.open('POST', 'http://10.0.2.2/hello_mango_php/load_users.php', true);
    request.send(formData);
  }

  function start() {
    loadFriendList("");
  }

  useEffect(start,[]);

  const ui = (
    <SafeAreaView style={styles.home}>
      <View style={styles.homeView1}>
        <Icon
          name="user-circle-o"
          size={24}
          color="#0a0c0f"
          style={styles.profileInput2Image}
        />
        <Text style={styles.homeText1}>Message</Text>

        {/* <Icon
          name="sign-out"
          size={24}
          color="#0a0c0f"
          style={styles.profileInput1Image}
        /> */}
      </View>

      <View style={styles.homeView1}>
        <TextInput
          style={styles.homeInput1}
          autoCorrect={false}
          onChangeText={p}
          placeholder={"Search User"}
        />
        <Icon
          name="search"
          size={24}
          color="#303030"
          style={styles.homeInput1Image}
        />
      </View>

      <FlatList data={items} renderItem={itemUI} />
    </SafeAreaView>
  );
  return ui;

  function p(text){
    setSearchText(text);
    loadFriendList(text);
  }

  function itemUI({item}) {
    const ui = (
      <Pressable onPress={m}>
        <View style={styles.item}>
          <Image
            source={{uri: 'http://10.0.2.2/hello_mango_php/' + item.pic}}
            style={styles.itemImage}
          />

          <View style={styles.itemView1}>
            <Text style={styles.itemText1}>{item.name}</Text>
            <Text style={styles.itemText2}>{item.msg}</Text>
          </View>

          <View style={styles.itemView2}>
            <Text style={styles.itemText3}>{item.time}</Text>
            <View style={styles.itemShape1}>
              <Text style={styles.itemText4}>{item.count}</Text>
            </View>
          </View>
        </View>
      </Pressable>
    );
    return ui;

    function m() {
      // Alert.alert("Message",item.name);

      const obj = {
        name: item.name,
        id: item.id,
        img: 'http://10.0.2.2/hello_mango_php/' + item.pic,
      };

      navigation.navigate('Chat', obj);
    }
  }
}

const styles = StyleSheet.create({
  itemView1: {
    justifyContent: 'center',
    paddingHorizontal: 20,
    width: '60%',
  },
  itemView2: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    width: '20%',
  },
  itemShape1: {
    width: 24,
    height: 24,
    backgroundColor: '#6e58e8',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText4: {
    fontSize: 14,
    color: 'white',
    fontWeight: 'bold',
  },
  itemText3: {
    fontSize: 14,
    color: '#160a30',
    paddingBottom: 5,
  },
  itemText2: {
    fontSize: 16,
    color: '#ba9225',
  },
  itemText1: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 5,
  },
  item: {
    flexDirection: 'row',
    paddingVertical: 15,
  },
  home: {
    flex: 1,
    alignItems: 'center',
  },
  homeText1: {
    fontSize: 30,
    paddingVertical: 10,
    color: '#66adab',
    fontFamily: 'Itim',
  },
  homeInput1: {
    height: 45,
    borderStyle: 'solid',
    borderWidth: 2,
    width: '90%',
    borderRadius: 20,
    fontSize: 20,
    paddingLeft: 15,
    paddingEnd: 45,
    color: 'gray',
    textAlign: 'center',
    
  },
  homeView1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeInput1Image: {
    position: 'absolute',
    end: 20,
  },
  itemImage: {
    width: 64,
    height: 64,
    borderRadius: 50,
  },
  profileInput2Image: {
    fontSize: 30,
    start:1,
    color:"teal",
    marginRight:10,
  },
});

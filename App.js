import { StyleSheet, Text, View, TextInput, Button, SafeAreaView, ScrollView } from 'react-native';
import { MESSAGES, addDoc, collection, firestore , serverTimestamp} from './firebase/Config';
import { useEffect, useState } from 'react';
import { querySnapshot, onSnapshot, query, orderBy } from 'firebase/firestore';
import { convertFirebaseTimeStampToJS } from './helper/Functions';


export default function App() {

  const [messages, setMessages] = useState([])
  const [newMessage, setnewMessage] = useState('')
  

  useEffect(() => {
    const q = query(collection(firestore, MESSAGES),orderBy('created','desc'))

    const unsubscribe = onSnapshot(q,(querySnapshot) => {
      const tempMessages = []

      querySnapshot.forEach((doc) => {
        const messageObject = {
          id: doc.id,
          text: doc.data().text,
          created: convertFirebaseTimeStampToJS(doc.data().created)
        }
        tempMessages.push(messageObject)
        console.log(messageObject)
      })
      setMessages(tempMessages)
      
    })
  return() => {
    unsubscribe()
    
  }
    
  }, [])
  
  

  const save = async() => {
    const docRef = await addDoc(collection(firestore, MESSAGES), {
      text: newMessage,
      created: serverTimestamp()
    }).catch(error => console.log(error))

    setnewMessage('')
    console.log('Message saved.')
  }


  return (
  <SafeAreaView style={styles.container}>
    <ScrollView>
      {
        messages.map((message) => (
          <View style={styles.message} key={message.id}>
            <Text style={styles.messageInfo}>{message.created}</Text>
            <Text>{message.text}</Text>
          </View>
          
      
        ))
      }
        <View style={styles.buttoncontainer}>
        <TextInput style={styles.input} placeholder='Enter message' value={newMessage} onChangeText={text => setnewMessage(text)}/>
        <Button title="Send" type="button" onPress={save}/>
      </View>
    </ScrollView>
  </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    marginTop:50
  },
  message: {
    padding: 10,
    marginTop:10,
    marginBottom:10,
    backgroundColor: '#f5f5f5',
    borderColor: '#ccc',
    borderWidth:1,
    borderRadius: 5,
    marginLeft: 10,
    marginRight:10
  },
  messageInfo: {
    fontSize:12,
  },
  buttoncontainer:{
    flexDirection: 'row',
  },
  input: {
    flex: 1,
    paddingHorizontal: 8,
    marginRight: 10, // Add spacing between input and button
  },
});

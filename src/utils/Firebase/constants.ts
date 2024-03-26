import firestore from '@react-native-firebase/firestore';

export const ChatColRef = firestore()
    .collection('Chats')


export const UserColRef = firestore()
    .collection('Users')


export const MessageColRef = (id: string, newChat: boolean) => {

    let IDs = id.split('-')
    // console.log('IDs : ' + IDs + ' new : ' + newChat)
    if (newChat == true) {
        ChatColRef.doc(id).set({
            user1: IDs[0], user2: IDs[1]
        })
    }
    return ChatColRef
        .doc(id)
        .collection('messages')
}


export const getFirebaseuserData = async (id: string) => {

    const val = await UserColRef.doc(id).get();
    // console.log(val);
    return val;

}
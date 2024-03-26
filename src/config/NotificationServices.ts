import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { getFirebaseuserData } from "../utils/Firebase/constants";

type NotificationMessageType = {
    roomId: string,
    body: string,
    title: string,
    senderId?: string,
    receiverId: string,
    // sender?: FirebaseFirestoreTypes.DocumentData | undefined,
    // receiver: FirebaseFirestoreTypes.DocumentData | undefined,
}

export const sendMessageNotification = async (data: NotificationMessageType) => {

    let receiver = await getFirebaseuserData(data.receiverId)

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "key=AAAAZM0Z4Hs:APA91bFSKEvQd4BlE17TnMtthFXzSSu-Fhh45fSBxHFJDaPj0_5Sx6vXgLifjibTOI-f6e9TkBEGkTGVsz4KzEuh0uvgaPxdXh-ZeYfd7LEgFpok549Eqlo64de6i1KSLwRJrCv5BA-j");

    var raw = JSON.stringify({
        "data": {
            roomId: data.roomId,
            userData: data.senderId
            // userData: data.sender
        },
        "notification": {
            "body": data.body,
            "title": data.title
        },
        "to": receiver?.data()?.FCMToken
        // "dSnhSfTtQf2EKcWOdDSzwG:APA91bHwa36q22-0GHBZLVvZ7tsvVkY4e6WIIsLcixFfVHkxqVpcnfb4OomMiR_buOOVS4q1yMpSAQjixSRTsYuBymEFk1FAVl-AvQnWOzoE7O6aF6QavbWLPsbYS67nTrXWe2t47_a8"
        // "dsFj-9Y3SJufVE82DVfcuv:APA91bGWJ5iwVnIKE7iGD_fpmgpUCNA3KMo9UhbjktX3984QNkSybQpv7qS3yJrCBPeZqDY_v9s1QWW-1GTr6uyjM_E8oB8oOPCeUmXxq0l4CkKyCJGEHVe0g7dUf3fi9MNJkyHEnplu"
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("https://fcm.googleapis.com/fcm/send", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}
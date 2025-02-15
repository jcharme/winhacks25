// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAcp9mLAkaVOm77GjeEciuIFe8tOjf_nEM",
  authDomain: "twocents-19b16.firebaseapp.com",
  projectId: "twocents-19b16",
  storageBucket: "twocents-19b16.firebasestorage.app",
  messagingSenderId: "606274909309",
  appId: "1:606274909309:web:3ff84b92f8682f772aad14",
  measurementId: "G-X7D2D74010"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export default function Page() {
    return (
      <div className="grid grid-cols-10">
            <div id="user" className="col-span-3 h-screen bg-green-800">
              
            </div>
            <div id="expenses" className="col-start-4 col-span-7 h-screen bg-red-100">
              
            </div>
        </div>
    );
  }
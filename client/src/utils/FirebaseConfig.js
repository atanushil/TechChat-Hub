import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
//mine 
// const firebaseConfig = {
//   apiKey: "AIzaSyD1DxttOlCI1UC4ji49wtyCQ1VGT7pFOEE",
//   authDomain: "whatsappclone-25137.firebaseapp.com",
//   projectId: "whatsappclone-25137",
//   storageBucket: "whatsappclone-25137.appspot.com",
//   messagingSenderId: "118967376359",
//   appId: "1:118967376359:web:5f72121a749c2c88c5c542",
//   measurementId: "G-9LMVGFXZHY"
// };
//youtube
// const firebaseConfig = {
//   apiKey: "AIzaSyD2i-vW6JTBnx8EzkIauU3QG081R_zEOAM",
//   authDomain: "whatsapp-clone-55b30.firebaseapp.com",
//   projectId: "whatsapp-clone-55b30",
//   storageBucket: "whatsapp-clone-55b30.appspot.com",
//   messagingSenderId: "180279867664",
//   appId: "1:180279867664:web:4012ccc45a5ab1d0d58d95",
//   measurementId: "G-KHVXD75VD7",
// };
const firebaseConfig = {
  apiKey: "AIzaSyCRK4-HCXf9xEzIyKI4WqOd8PpVLHqz04g",
  authDomain: "techchathub.firebaseapp.com",
  projectId: "techchathub",
  storageBucket: "techchathub.appspot.com",
  messagingSenderId: "1037852806704",
  appId: "1:1037852806704:web:628258a4875bf9c08927f5",
  measurementId: "G-PTX0R0Q5H2"
};

const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);

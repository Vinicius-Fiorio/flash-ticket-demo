import { initializeApp } from 'firebase/app';
import { getAuth, signOut, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword  } from "firebase/auth";
import { getFirestore, collection, getDocs, query, where, addDoc, orderBy, limit } from 'firebase/firestore/lite';
import { TatumPolygonSDK } from '@tatumio/polygon'

import firebaseConfig from './firebaseConfig'
import tantumConfig from './tantumConfig'

const app = initializeApp(firebaseConfig)
const database = getFirestore(app)
const polygonSDK = TatumPolygonSDK({apiKey: tantumConfig.apiKey})

export default {
    createAccount: async (email, password) =>{
        const auth = getAuth();
        const result = await createUserWithEmailAndPassword(auth, email, password)
        
        return result 
    },

    loginAccount: async (email,password) => {
        const auth = getAuth();
        const result = await signInWithEmailAndPassword(auth, email, password)
        
        return result
    },

    authGoogle: async () => {
        const provider = new GoogleAuthProvider();
        const auth = getAuth();

        const result = await signInWithPopup(auth, provider)

        return result
    },

    signOut: async () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            console.log("Usuário deslogado")
        }).catch((error) => {
            console.log(`Error: ${error}`)
        });
    },

    getUserInfo: async (id) =>{
        const usersRef = collection(database, "users");

        //consulta
        const q = query(usersRef, where("userUid", "==", id));
        const querySnapshot = await getDocs(q);

        return querySnapshot.docs[0].data()
    },

    createAddresWallet: async (user) => {
        const usersRef = collection(database, "users");

        //consulta Usuário
        const q = query(usersRef, where("userUid", "==", user.id));
        const querySnapshot = await getDocs(q);

        //consulta index wallet
        const q2 = query(usersRef, orderBy("wallet.index", "desc"), limit(1))
        const querySnapshot2 = await getDocs(q2);

        let lastWallet = {
            wallet: {
                index: -1
            }
        }

        if (!querySnapshot2.empty){
            lastWallet = querySnapshot2.docs[0].data()
        }
        
        //cria endereço caso usuário n tiver
        if (querySnapshot.empty){
            const { key } = await polygonSDK.api.polygonGenerateAddressPrivateKey({index: lastWallet.wallet.index + 1,mnemonic: tantumConfig.mnemonic})
            const wallet = polygonSDK.wallet.generateAddressFromPrivateKey(key)

            try {
                const docRef = await addDoc(collection(database, "users"), {
                  userUid: user.id,
                  name: user.name,
                  email: user.email,
                  wallet: {
                    index: lastWallet.wallet.index + 1,
                    address: wallet,
                    privateKey: key,
                    publicKey: tantumConfig.xpub,
                    phrase: tantumConfig.mnemonic
                  }
                });
                console.log("Document written with ID: ", docRef.id);
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        }
    }
}
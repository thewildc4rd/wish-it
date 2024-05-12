import { addDoc, getDocs, collection, setDoc, doc } from 'firebase/firestore';
import { db } from '@/config/firebase';

export const getUsers = async () => {
  try {
    const data = await getDocs(collection(db, 'users'));
    const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    return filteredData;
  } catch (err) {
    console.error(err);
  }
};

export const addUser = async (uid, data) => {
  try {
    return setDoc(doc(db, 'users', uid), data);
    // return addDoc(collection(db, 'users'), data);
  } catch (err) {
    console.error(err);
  }
};

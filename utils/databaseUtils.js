import { addDoc, getDocs, collection, setDoc, doc } from 'firebase/firestore';
import { db } from '@/config/firebase';

export const getCollection = async (coll) => {
  try {
    const data = await getDocs(collection(db, coll));
    const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    return filteredData;
  } catch (err) {
    console.error(err);
  }
};

export const addList = async (data) => {
  try {
    return addDoc(collection(db, 'lists'), data);
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

// helpers for specific queries

export const getUserFullName = async (creatorId) => {
  const users = await getCollection('users');
  const user = users.filter((user) => user.id == creatorId)[0];
  return user.first + ' ' + user.last;
};

export const getList = async (listId) => {
  const lists = await getCollection('lists');
  const list = lists.filter((list) => list.id == listId)[0];
  return list;
};

import { addDoc, getDocs, collection, setDoc, doc } from 'firebase/firestore';
import { db } from '@/config/firebase';
const cheerio = require('cheerio');
const axios = require('axios');

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

export const getItemsInList = async (listId) => {
  const allItems = await getCollection('items');
  const items = allItems.filter((item) => item.listId == listId);
  const itemsWithData = await Promise.all(
    items.map(async (item) => {
      const data = await getItemDataFromUrl(item.url);
      return { ...item, ...data };
    })
  );
  return itemsWithData;
};

export const getListWithItems = async (listId) => {
  const list = await getList(listId);
  const items = await getItemsInList(listId);
  return { ...list, items };
};

export const getListsWithItems = async () => {
  const lists = await getCollection('lists');
  const allItems = await getCollection('items');
  const listsWithItems = lists.map((list) => {
    const items = allItems.filter((item) => item.listId == list.id);
    return { ...list, items };
  });
  return listsWithItems;
};

export const getItemDataFromUrl = async (url) => {
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);
  const image = $('[property="og:image"]').attr('content');
  const price = $('[property="product:price:amount"]').attr('content');
  const title = $('[property="og:title"]').attr('content');
  const availability = $('[property="product:availability"]').attr('content');

  return { image, price, title, availability };
};

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDOC,
  deleteDoc,
  doc,
  query,
  orderBy,
  updateDOC
} from "https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js";


const firebaseConfig = {
  apiKey: "AIzaSyD_N_5Tjv9zh_eJyfTXxUOICM2XX86--IM",
  authDomain: "datasiswa-aebb3.firebaseapp.com",
  projectId: "datasiswa-aebb3",
  storageBucket: "datasiswa-aebb3.appspot.com",
  messagingSenderId: "1049128187878",
  appId: "1:1049128187878:web:e1879710f4b5252a68c827",
  measurementId: "G-VR3EKXDV0M"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function ambilDaftarSiswa () {
  const siswaRef = collection(db, "siswa");
  const q = query(siswaRef, orderBy("nama"));
  const querySnapshot = await getDocs(q);
  
  let retval = [];
  querySnapshot.forEach((doc) => {
    retval.push({ id: doc.id, nama: doc.data().nama });
  });
  
  return retval;
}

export async function tambahSiswa(val) {
  try {
   const docRef = await addDoc(collection(db, "siswa"), {
     nama: val
   });
   console.log('Berhasil menyimpan dokumen dengan ID: ' + docRef.id);
  } catch (e) {
    console.log('Error menambah dokumen: ' + e);
  }
}

export async function hapusSiswa(docId) {
  await deleteDoc(doc(db,"siswa", docId));
}

export async function ubahSiswa(docId, val) {
  await updateDOC (doc(db, "siswa", docId), { nama: val });
}
export async function ambilSiswa(docId) {
  const docRef = await doc(db, "siswa", docId);
  const docSnap = await getDOC(docRef);
  
  return await docSnap.data();
}

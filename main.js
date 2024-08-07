import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  updateDoc
  }
  from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
  
const firebaseConfig = {
  apiKey: "AIzaSyCRlnLBhUHGOF7Lfg9iy_SbfK6coM_7f1U",
  authDomain: "insan-cemerlang-6640c.firebaseapp.com",
  projectId: "insan-cemerlang-6640c",
  storageBucket: "insan-cemerlang-6640c.appspot.com",
  messagingSenderId: "917464283158",
  appId: "1:917464283158:web:3a6179cd71818d68f6dd37"
};
// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function ambilmatapelajaran() {
  const refDokumen = collection(db, "matapelajaran");
  const kueri = query(refDokumen, orderBy("id"));
  const cuplikanKueri = await getDocs(kueri);

  let hasil = [];
  cuplikanKueri.forEach((dok) => {
    hasil.push({
      id: dok.id,
      guru: dok.data().guru,
      hari: dok.data().hari,
      jam: dok.data().jam,
      kelas: dok.data().kelas,
      mapel: dok.data().mapel,
      waktu: dok.data().waktu,

    });
  });



  return hasil;
}

export function formatAngka(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export async function tambahjadwalmatapelajaran(tanggal, nis, nama, alamat, noTlpn, kelas, keterangan) {
  try {
    const dokRef = await addDoc(collection(db, 'matapelajaran'), {
      tanggal: tanggal,
      guru: guru,
      hari: hari,
      jam: jam,
      kelas: kelas,
      mapel: mapel,
      waktu: waktu
    });
    console.log('berhasil menembah ' + dokRef.id);
  } catch (e) {
    console.log('gagal menambah ' + e);
  }
}

export async function hapusmatapelajaran(docId) {
  await deleteDoc(doc(db, "matapelajaran", docId));
}

export async function ubahmatapelajaran(docId, tanggal, nis, nama, alamat, noTlpn, kelas, keterangan) {
  await updateDoc(doc(db, "matapelajaran", docId), {
    guru: guru,
    hari: hari,
    jam: jam,
    kelas: kelas,
    mapel: mapel,
    waktu: waktu,
  });
}

export async function ambilpelajaran(docId) {
  const docRef = await doc(db, "matapelajaran", docId);
  const docSnap = await getDoc(docRef);

  return await docSnap.data();
}
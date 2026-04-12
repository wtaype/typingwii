import { db } from './firebase.js';
import { doc, getDoc, setDoc, deleteDoc, updateDoc, serverTimestamp } from 'firebase/firestore';

const COL = 'publico';
const ref = (id) => doc(db, COL, String(id));

export const existe = async (id) => { try { return (await getDoc(ref(id))).exists(); } catch { return false; } };

export const buscar = async (id) => {
  try { const s = await getDoc(ref(id)); return s.exists() ? { id, ...s.data() } : null; }
  catch (e) { console.error('publico.buscar:', e); return null; }
};

export const guardar = async (id, data) => {
  try { await setDoc(ref(id), { ...data, fecha: serverTimestamp() }); return id; }
  catch (e) { console.error('publico.guardar:', e); return false; }
};

export const eliminar = async (id) => {
  try { await deleteDoc(ref(id)); return true; }
  catch (e) { console.error('publico.eliminar:', e); return false; }
};

export const actualizar = async (id, data) => {
  try { await updateDoc(ref(id), data); return true; }
  catch (e) { console.error('publico.actualizar:', e); return false; }
};
import firebase from 'firebase/app';
import 'firebase/firestore';

// Este archivo es una muestra de como llamar datos de firebire

const firestore = firebase.firestore();

firestore.collection('users').doc('ydJNQKIoSokSIqzorB8l').collection('cartItems').doc('gH1Va3H9M2j2McGYLAex')
/** tambien podemos escribir la misma consulta asi: */
firestore.doc('/users/ydJNQKIoSokSIqzorB8l/cartItems/gH1Va3H9M2j2McGYLAex');
firestore.collection('/users/ydJNQKIoSokSIqzorB8l/cartItems');
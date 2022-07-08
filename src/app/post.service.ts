import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/compat/firestore';

import { Post } from './post.model';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  storareRef = firebase.app().storage().ref();

  constructor( private angularFirestore: AngularFirestore ) { }

  //Metodos para el CRUD
  getPosts(){
    return this.angularFirestore
    .collection("competidores")
    .snapshotChanges()
  }

  getPostById(id){
    return this.angularFirestore
    .collection("competidores")
    .doc(id)
    .valueChanges()
  }

  createPost(post: Post){
    return new Promise<any> ((reject)=> {
      this.angularFirestore
      .collection("competidores")
      .add(post)
      .then((response)=>{
        console.log(response)
      },
      (error)=>{
        reject(error)
      })
    })
  }

  updatePost(post: Post, id){
    return this.angularFirestore
    .collection("competidores")
    .doc(id)
    .update({
      cbu: post.cbu,
      cuit: post.cuit
    })

  }

  deletePost(post){
    return this.angularFirestore
    .collection("competidores")
    .doc(post.id)
    .delete()
  }

  async subirImagen(nombre: string, imgBase64: any) {
    try {
      let respuesta = await this.storareRef.child("users/" + nombre).putString(imgBase64, 'data_url');
      console.log(respuesta);
      return await respuesta.ref.getDownloadURL();
    } catch (err) {
      console.log(err);
      return null;
    }
  }

}

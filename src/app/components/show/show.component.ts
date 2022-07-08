import { Component, OnInit } from '@angular/core';

import { Post } from 'src/app/post.model';
import { PostService } from 'src/app/post.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss'],
})
export class ShowComponent implements OnInit {
  Posts: Post[];

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.postService.getPosts().subscribe((res) => {
      this.Posts = res.map((e) => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as Post),
        };
      });
    });
  }

  deleteRecord(post) {
    Swal.fire({
      title:"Estás seguro de que desea eliminarlo?",
      text: "No se podrá revertir",
      icon:"warning",
      showCancelButton:true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    }).then((result)=>{
      if(result.isConfirmed){
        this.postService.deletePost(post)
        Swal.fire(
          'Eliminado!',
          'El competidor se ha eliminado',
          'success'
        )
      }
    })
  }
}

import { Component, OnInit } from '@angular/core';

import { PostService } from 'src/app/post.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';



@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  public postForm: FormGroup

  imagen: any []=[];

  constructor(
    public postService: PostService,
    public formBuilder: FormBuilder,
    public router: Router,
    private almacenarImagen: PostService
  ) {
    this.postForm = this.formBuilder.group({
      cbu: [''],
      cuit:[''],
      certDom:['']
    })
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.postService.createPost(this.postForm.value)
    this.router.navigate([''])
  }

  cargarImagen(event:any){
    let archivo = event.target.files;
    let reader = new FileReader();
    let nombre = "SED";

    reader.readAsDataURL(archivo[0]);
    reader.onload = ()=> {
      console.log(reader.result)
      this.imagen.push(reader.result)
      this.almacenarImagen.subirImagen(nombre +"_"+ Date.now(), reader.result).then(urlImagen =>{
        console.log(urlImagen)
      });
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Categorias } from 'src/app/model/Categorias';
import { Produtos } from 'src/app/model/Produtos';
import { Usuario } from 'src/app/model/Usuario';
import { CategoriasService } from 'src/app/service/categorias.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-categoria-delete',
  templateUrl: './categoria-delete.component.html',
  styleUrls: ['./categoria-delete.component.css']
})
export class CategoriaDeleteComponent implements OnInit {

  listaCategorias: Categorias[]
  categorias: Categorias = new Categorias()
  idCategoria: number
  idProduto: number
  usuario: Usuario = new Usuario()
  produtos: Produtos = new Produtos()

  constructor(
    private categoriaService: CategoriasService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    if(environment.token =='')
    this.router.navigate(['/login'])

    this.idCategoria = this.route.snapshot.params['id']
    this.findByIdCategoria(this.idCategoria)
    }

    findByIdCategoria(id: number)
    {
      this.categoriaService.getByIdCategoria(id).subscribe((resp: Categorias)=>{
        this.categorias=resp
      })
    }

    apagar(){
      this.categoriaService.deleteCategoria(this.idCategoria).subscribe(()=>{ console.log("Categoria: "+JSON.stringify(this.categorias))
        alert('Tema apagado com sucesso!')
        this.router.navigate(['/home'])
      })
    }

}
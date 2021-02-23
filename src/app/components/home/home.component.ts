import { Component, OnInit } from '@angular/core';
import { MyNavComponent } from "../my-nav/my-nav.component";
import { PublicationsService } from "../../service/publications.service";
import { TranslateService } from "../../service/translate.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  posts= [];
  comment: any;
  lang_arr = ['en','es','de', 'ar']
  seleccionado: any;
  constructor(
    public navComp: MyNavComponent,
    public publicationService: PublicationsService,
    public translate: TranslateService
  ) {
    this.navComp.title = "Home";
    this.getPublicPost()
  }
  ngOnInit() {
    this.navComp.bool_login = true
    this.navComp.User = JSON.parse(localStorage.getItem('user'))
    if (JSON.parse(localStorage.getItem('user')) == null || JSON.parse(localStorage.getItem('user')).role === "anonymous"){

      this.navComp.bool_login = false
    }
  }

  getPublicPost(){
    let res;
    this.publicationService.getPostPublic().subscribe(data =>{
      this.posts = data
    },error => {
      console.log(error)
    })
  }

  sendComment(post_id, index){
    
    var comment = {
      content: this.comment,
      id_publication: post_id,
      createBy: JSON.parse(localStorage.getItem('user')).id
    }
    this.publicationService.sendComment(comment).subscribe(data => {
      this.posts[index].comments.push(data)
      this.comment = ""

    }, error => {
      console.log(error)
    })

  }

  getTranslate(index, text){
    let res;
    var data = {
      q: text,
      source: 'es',
      target: this.seleccionado,
      format: 'text'
    }
    this.translate.getTranslate(data).subscribe(data => {
      res = data
      this.posts[index]['text_translate'] = res.translatedText

    })
  }

}

import { Component } from '@angular/core';
import { MyNavComponent } from "../my-nav/my-nav.component";
import { PublicationsService } from "../../service/publications.service";

@Component({
    selector: 'app-consulting-post',
    templateUrl: './consulting-post.component.html',
    styleUrls: ['./consulting-post.component.css']
})
export class ConsultingPostComponent {
    posts = []
    user_posts = []
    content_update : any;
    update_txt = false;
    post_id_edit: any
    constructor(
        public navComp: MyNavComponent,
        public publicationService: PublicationsService,
    ) {
        this.navComp.title = "Consulting Post";
        this.getPost()
    }

    getPost() {
        let res;
        var user = JSON.parse(localStorage.getItem('user'))
        if (user.role == "writer"){
            this.publicationService.getPostByUser(user.id).subscribe(data => {
                res = data
                this.posts = res.publications
            }, error => {
                console.log(error)
            })
        }else{
            this.publicationService.getAllPost().subscribe(data => {
                this.user_posts = data
                console.log(this.user_posts)
            }, error => {
                console.log(error)
            })
        }
    }

    UpdatePost(index_u, index_p, post_id, str_action){
        var content = {
            // id_state: (str_action == 'approve') ? 2 : (str_action == 'reject') ? 3 : (str_action == 'pending') ? 1 : 4,
            state: str_action,
            updateBy: JSON.parse(localStorage.getItem('user')).id,
            content:  this.update_txt ? this.content_update : this.user_posts[index_u].publications[index_p].content
        }        
        this.publicationService.updatePost(post_id, content).subscribe(data => {
            this.update_txt = false
            this.post_id_edit = null
            this.content_update = null
            this.getPost()
        }, error => {
            console.log(error)
        })
    }

    EditPost(index){
        this.update_txt = true
        this.post_id_edit = this.posts[index].id
        this.content_update = this.posts[index].content
        this.posts[index]['update'] = true
        console.log(this.posts)

    }
}

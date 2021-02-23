import { Component } from '@angular/core';
import { MyNavComponent } from "../my-nav/my-nav.component";
import { PublicationsService } from "../../service/publications.service";
import { Router } from "@angular/router";


@Component({
    selector: 'app-writer',
    templateUrl: './writer.component.html',
    styleUrls: ['./writer.component.css']
})
export class WriterComponent {
    content: any;

    constructor(
        public navComp: MyNavComponent,
        public publicationService: PublicationsService,
        public route: Router
    ) {
        this.navComp.title = "Writer post";
    }

    sendPost() {
        let res;
        var content = {
            content: this.content,
            createBy: JSON.parse(localStorage.getItem('user')).id,
            updateBy: JSON.parse(localStorage.getItem('user')).id,
            state: "pending"
        }
        this.publicationService.sendPost(content).subscribe(data => {
            this.route.navigateByUrl('home')
        }, error => {
            console.log(error)
        })
    }
}



import { Component, OnInit } from '@angular/core';
import { OwnerService } from '../shared/owner/owner.service';

@Component({
  selector: 'app-owner-list',
  templateUrl: './owner-list.component.html',
  styleUrls: ['./owner-list.component.css']
})
export class OwnerListComponent implements OnInit {
  owners: Array<any>;

  constructor(private ownerService: OwnerService) { }

  ngOnInit() {
    this.ownerService.getAll().subscribe(data => {
      this.owners = data._embedded.owners;
      for (let i = 0; i < this.owners.length; i++) {
        this.owners[i].id = this.owners[i]._links.owner.href.split('http://thawing-chamber-47973.herokuapp.com/owners/')[1];
        console.log(this.owners[i]);
      }
    });
  }

}

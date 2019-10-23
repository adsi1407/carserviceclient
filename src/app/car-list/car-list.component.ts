import { Component, OnInit } from '@angular/core';
import { CarService } from '../shared/car/car.service';
import { GiphyService } from '../shared/giphy/giphy.service';
import { OwnerService } from '../shared/owner/owner.service';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {
  cars: Array<any>;
  owners: Array<any>;

  constructor(private carService: CarService, private giphyService: GiphyService, private ownerService: OwnerService) { }

  ngOnInit() {
    this.carService.getAll().subscribe(data => {
      this.cars = data;
      for (const car of this.cars) {
        this.giphyService.get(car.name).subscribe(url => car.giphyUrl = url);
      }
    });

    this.ownerService.getAll().subscribe(data => {
      this.owners = data._embedded.owners;
      for (let i = 0; i < this.cars.length; i++) {
        for (let j = 0; j < this.owners.length; j++) {
          if(this.cars[i].ownerDni == this.owners[j].dni) {
            this.cars[i].owner = this.owners[j];
          }
        }
      }
    });
  }
}

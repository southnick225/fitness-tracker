import { Component, OnDestroy, OnInit } from '@angular/core';
import { TrainingService } from './training.service';
import { Exercise } from './exercise.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit,OnDestroy{
  ongoingTraining = false;
  exerciseSubscription: Subscription;

  constructor(private trainingService: TrainingService){}

  ngOnInit(): void {
    this.exerciseSubscription = this.trainingService.exerciseChanged.subscribe((exercise) => {
     if(exercise){
      this.ongoingTraining = true;
     }else{
      this.ongoingTraining = false;
     }
    })
  }

  ngOnDestroy(): void {
    this.exerciseSubscription.unsubscribe();
  }

}
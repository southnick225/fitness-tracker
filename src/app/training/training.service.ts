import { Subject } from 'rxjs';
import { Injectable } from "@angular/core";
import { Exercise } from "./exercise.model";

@Injectable({providedIn: 'root'})
export class TrainingService{

exerciseChanged = new Subject<Exercise>();

private availableExercises: Exercise[] = [
{ id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
{ id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
{ id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
{ id: 'burpees', name: 'Burpees', duration: 60, calories: 8 }
];
//storing the running exercise so when 
private runningExercise: Exercise;
private exercises: Exercise[] = [];

//getter method for accesing private component property outside of the service.
//slice method returns a copy of the array.
getAvailableExercises(){
    return this.availableExercises.slice();
}

//method for getting the selected exercise and storing the object in the runningExercise property 
//uses find() method to run arrow function(anonymous) on each object in the availablExercises array
//and returns true/false when a match is found (for the ID of the object)
startExercise(selectedId: string){
    const selectedExercise = this.availableExercises.find(exercise => exercise.id  === selectedId)
    this.runningExercise = selectedExercise;
    this.exerciseChanged.next({...this.runningExercise}); //emits and returns new object that distributes all properties of runningExercise for the simple reason of not returning the same object that is in the service.
}

completeExercise(){
    this.exercises.push({
        ...this.runningExercise, 
        date: new Date(), 
        state: "completed"});
    this.runningExercise = null;
    this.exerciseChanged.next(null);
}

cancelExercise(progress: number){
    this.exercises.push({
        ...this.runningExercise,
        date: new Date(), 
        duration: this.runningExercise.duration * (progress / 100),
        calories: this.runningExercise.calories * (progress / 100),
        state: "cancelled"});
    this.runningExercise = null;
    this.exerciseChanged.next(null);
}

getRunningExercise(){
    return {...this.runningExercise}; //set getter methods so that you cant mutate it from outside the service
}

getCompletedOrCanceledExercises(){
    return this.exercises.slice();
}

}
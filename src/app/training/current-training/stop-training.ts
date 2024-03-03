import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
//create mat dialog like a service and inject it where needed. 
// mat dialog data defined and generated in this service

@Component({
    selector:'app-stop-training',
    template: `<h1 mat-dialog-title>Are you sure?</h1>
    <div mat-dialog-content>You already got {{passedData.progress}} %</div>
    <div mat-dialog-actions>
        <button mat-button [mat-dialog-close]="true">Yes</button>
        <button mat-button [mat-dialog-close]="false">No</button>
</div>
    `
})
export class StopTrainingComponent{
    constructor(@Inject(MAT_DIALOG_DATA) public passedData:any){}

}
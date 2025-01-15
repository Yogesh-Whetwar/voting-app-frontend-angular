import { Component, OnInit } from '@angular/core';
import { PollService } from '../../poll.service';
import { Poll } from '../../poll.models';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-poll',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './poll.component.html',
  styleUrl: './poll.component.css'
})
export class PollComponent implements OnInit{
    
polls:Poll[]=[];
newPoll:Poll ={
  question:'',
  options:[
    {
      voteOption:'',
      voteCount:0
    },
    {
      voteOption:'',
      voteCount:0
    }
  ]
}
constructor(private pollService:PollService){
}
ngOnInit(): void {
  this.loadPools();
  }
loadPools(){
  this.pollService.getPolls().subscribe({
    next:(data)=>{
   this.polls=data;
    }
    ,
    error:(error)=>{
      console.log("err fetching polls: ",error);
    }
  })
}    


trackByIndex(index:number):number{
  return index;
}
 

createNewPoll(){ 
  console.log(this.newPoll);
  this.pollService.createPoll(this.newPoll).subscribe({
    next: (createdPoll)=>{
      this.polls.push(createdPoll);
      this.resetPoll();
    },
    error: (error)=>{
      console.log("err in creating poll", error);
    }
  })
}

resetPoll(){
  this.newPoll = {
    question:'',
    options:[
      {
        voteOption:'',
        voteCount:0
      },
      {
        voteOption:'',
        voteCount:0
      }
    ]
  }
}

}

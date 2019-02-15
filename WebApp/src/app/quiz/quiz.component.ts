import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from '../shared/quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  constructor(private router: Router,
    private service: QuizService) { }

  ngOnInit() {

    if (parseInt((localStorage.getItem('seconds')), 10) > 0) {
      this.service.seconds = parseInt((localStorage.getItem('seconds')), 10);
      this.service.qnProgress = parseInt((localStorage.getItem('qnProgress')), 10);
      this.service.qns = JSON.parse(localStorage.getItem('qns'));
      if (this.service.qnProgress === 10) {
        this.router.navigate(['/result']);
      } else {
        this.startTimer();
      }
    } else {
      this.service.seconds = 0;
      this.service.qnProgress = 0;
      this.service.getQues().subscribe((data: any) => {
        this.service.qns = data;
        this.startTimer();
      });
    }
  }
  startTimer() {
    this.service.timer = setInterval(() => {
      this.service.seconds++;
      localStorage.setItem('seconds', this.service.seconds.toString());
    }, 1000);
  }
  Answer(qID, choice) {
    this.service.qns[this.service.qnProgress].answer = choice;
    localStorage.setItem('qns', JSON.stringify(this.service.qns));
    this.service.qnProgress++;
    localStorage.setItem('qnProgress', this.service.qnProgress.toString());
    if (this.service.qnProgress === 10) {
      // this.service.getAnswers();
      clearInterval(this.service.timer);
      this.router.navigate(['/result']);
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/shared/quiz.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  constructor(private service: QuizService,
    private router: Router) { }

  ngOnInit() {
    if (parseInt((localStorage.getItem('qnProgress')), 10) === 10) {
      this.service.seconds = parseInt((localStorage.getItem('seconds')), 10);
      this.service.qnProgress = parseInt((localStorage.getItem('qnProgress')), 10);
      this.service.qns = JSON.parse(localStorage.getItem('qns'));



      this.service.getAnswers().subscribe((data: any) => {
        this.service.correctAnswerCount = 0;
        this.service.qns.forEach((e, i) => {
          if (e.answer === data[i]) {
            this.service.correctAnswerCount++;
          }
          e.correct = data[i];
        });
      });
    } else {
      this.router.navigate(['/quiz']);
    }
  }
  OnSubmit() {
    this.service.updateOutput().subscribe(() => {
      this.restart();
    });
  }
  restart() {
    localStorage.setItem('qnProgress', '0');
    localStorage.setItem('qns', '');
    localStorage.setItem('seconds', '0');
    this.router.navigate(['/quiz']);
  }

}

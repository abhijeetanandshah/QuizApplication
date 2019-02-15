import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/shared/quiz.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-resgister',
  templateUrl: './resgister.component.html',
  styleUrls: ['./resgister.component.css']
})
export class ResgisterComponent implements OnInit {

  constructor(private service: QuizService,
    private route: Router) { }
  private aa = null;
  private bc = null;
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
  ngOnInit() {
  }
  OnSubmit(name: string, email: string) {
    this.service.insertUser(name, email).subscribe((data: any) => {
      localStorage.clear();
      localStorage.setItem('participant', JSON.stringify(data));
      this.route.navigate(['/quiz']);
    });
  }
}

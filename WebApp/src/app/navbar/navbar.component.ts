import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from 'src/app/shared/quiz.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router,
    private service: QuizService) { }

  ngOnInit() {
  }

  SignOut() {
    localStorage.clear();
    clearInterval(this.service.timer);
    this.router.navigate(['/register']);
  }

}

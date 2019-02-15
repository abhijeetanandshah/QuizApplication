import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http: HttpClient) { }

  qns: any[];
  seconds: number;
  timer;
  qnProgress: number;
  correctAnswerCount = 0;


  insertUser(name: string, email: string) {

    const body = {
      Name: name,
      Email: email
    };
    console.log(body);
    return this.http.post(environment.apiURL + '/InsertParticipant', body);
  }
  getQues() {
    return this.http.get(environment.apiURL + '/Questions');
  }
  displaytime() {
    return Math.floor(this.seconds / 3600) + ':' + Math.floor(this.seconds / 60) + ':' + Math.floor(this.seconds % 60);
  }
  getpartname() {
    const part = JSON.parse(localStorage.getItem('participant'));
    return part.Name;
  }
  getAnswers() {
    const body = this.qns.map(x => x.QnID);
    console.log(body);
    return this.http.post(environment.apiURL + '/Answers', body);
  }
  updateOutput() {
    const body = JSON.parse(localStorage.getItem('participant'));
    body.Score = this.correctAnswerCount;
    body.TimeSpent = this.seconds;
    return this.http.post(environment.apiURL + '/UpdateOutput', body);
  }
}

import { Injectable } from '@angular/core';
import { User } from './user';
import { USERS } from './mock-users';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private usersURL = 'api/users';

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  // getUsers(): Observable<User[]> {
  //   this.messageService.add('UserService: user list is updated!');
  //   return of(USERS);
  // }

  getUsers(): Observable<User[]> {
    this.log('Got user list!');
    return this.http.get<User[]>(this.usersURL)
      .pipe(
        tap(Users => this.log('fetched Users')),
        catchError(this.handleError('getUsers', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  getUser(id: number): Observable<User> {
    this.log(`Got user: id=${id}`);
  
    const url = `${this.usersURL}/${id}`;
    return this.http.get<User>(url)
      .pipe(
        tap(_ => this.log(`fetched user id=${id}`)),
        catchError(this.handleError<User>(`getUser id=${id}`))
      );
  }

  private log(message: string) {
    this.messageService.add(`UserService: ${message}`);
  }
}

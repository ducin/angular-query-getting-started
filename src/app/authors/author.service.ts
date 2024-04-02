import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

const url = 'https://jsonplaceholder.typicode.com'

export interface Author {
  id: number
  name: string
  username: string
  email: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  httpClient = inject(HttpClient)

  allAuthors = this.httpClient.get(`${url}/users`)

  getAllAuthors(){
    return this.httpClient.get<Author[]>(`${url}/users`)
  }

  getAuthorById(authorId: Author['id']){
    return this.httpClient.get<Author>(`${url}/users/${authorId}`)
  }

  deleteAuthor(authorId: Author['id']){
    return this.httpClient.delete(`${url}/users/${authorId}`)
  }
}

export const authorQueryKeys = {
  allAuthors: () => ['authors'],
  authorsList: () => ['authors', 'list'],
  authorDetails: (id: Author['id']) => ['authors', 'details', id]
}

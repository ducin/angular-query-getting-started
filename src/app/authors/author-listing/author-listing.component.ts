import { Component, inject, signal } from '@angular/core';
import { Author } from '../author.service';
import { injectAuthorDetailsQuery, injectAuthorsListQuery, injectDeleteAuthorMutation } from '../authorQueries';

@Component({
  selector: 'app-author-listing',
  standalone: true,
  imports: [],
  template: `
current authorId: {{ authorId() }}
<button (click)="inc()">inc</button>
<button (click)="dec()">dec</button>
current author: {{ authorQuery.data()?.name }}

@if(authorsQuery.isLoading()){
  <div>Loading...</div>
}
@if(authorsQuery.isError()){
  <div>Error...</div>
}
<ul>
  @for(author of authorsQuery.data(); track author.id){
    <li>{{ author.name }} 
      <button (click)="delete(author.id)">delete</button>
    </li>
  }
</ul>
  `
})
export class AuthorListingComponent {
  authorId = signal(1)

  authorsQuery = injectAuthorsListQuery()
  authorQuery = injectAuthorDetailsQuery(this.authorId)
  deleteAuthorMutation = injectDeleteAuthorMutation()


  inc (){
    this.authorId.update(p => p + 1)
  }
  dec (){
    this.authorId.update(p => p - 1)
  }

  delete(id: Author['id']){
    // this.deleteAuthorMutation.mutate(id)
    this.deleteAuthorMutation.mutate(this.authorId())
    // this.authorId.set(undefined)
  }


}

// SWR - STALE WHILE REVALIDATE

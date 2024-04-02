import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AngularQueryDevtools } from '@tanstack/angular-query-devtools-experimental'
import { AuthorListingComponent } from './authors/author-listing/author-listing.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AngularQueryDevtools, AuthorListingComponent],
  template: `
<h1>hello angular query</h1>
<app-author-listing />
<angular-query-devtools initialIsOpen />
`
})
export class AppComponent {

}

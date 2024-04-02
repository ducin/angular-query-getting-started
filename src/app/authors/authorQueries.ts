import { Signal, inject } from '@angular/core';
import { Author, AuthorService } from './author.service';
import { injectQuery, injectMutation, injectQueryClient } from '@tanstack/angular-query-experimental';
import { lastValueFrom } from 'rxjs';

export const authorQueryKeys = {
    allAuthors: () => ['authors'],
    authorsList: () => ['authors', 'list'],
    authorDetails: (id: Author['id']) => ['authors', 'details', id]
}

export function injectAuthorsListQuery () {
    const authorsSvc = inject(AuthorService)
    return injectQuery(() => ({
        queryKey: authorQueryKeys.authorsList(),
        staleTime: 1000 * 5,
        gcTime: 1000 * 120,
        queryFn: () => lastValueFrom(authorsSvc.getAllAuthors())
      }))
}

export function injectAuthorDetailsQuery(authorId: Signal<number>){
    const authorsSvc = inject(AuthorService)
    return injectQuery(() => ({
        queryKey: authorQueryKeys.authorDetails(authorId()),
        staleTime: 1000 * 60,
        queryFn: () => lastValueFrom(authorsSvc.getAuthorById(authorId()))
      }))
}

export function injectDeleteAuthorMutation(){
    const authorsSvc = inject(AuthorService)
    const queryClient = injectQueryClient()
    return injectMutation(() => ({
        mutationFn: (id: Author['id']) => lastValueFrom(authorsSvc.deleteAuthor(id)),
        onSuccess: (data, id) => {
          // invalidate both
          // this.#queryClient.invalidateQueries({ queryKey: authorQueryKeys.authorsList() })
          queryClient.removeQueries({ queryKey: ['authors', 'details', id] })
          queryClient.setQueryData(['authors', 'list'], (prev: Author[]) => prev.filter(p => p.id !== id))
          // this.#queryClient.invalidateQueries({ queryKey: ['authors'] })
        }
      }))
}
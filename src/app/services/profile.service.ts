import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from 'src/environments/environment'
import { Profile, ProfileResult } from '../types/profile'
import { from, Observable, of } from 'rxjs'
import { tap } from 'rxjs/operators'
import { SearchQuery } from '../types/search-query'

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  url = environment.apiURL + 'profiles'

  lastResult: ProfileResult
  readonly lastResultHandler = tap((r: ProfileResult) => this.lastResult = r)

  constructor(private http: HttpClient) { }

  search(query: SearchQuery) {
    const term = encodeURI(query.query)
    const page = query.page ? `&page=${query.page}` : ''
    return from(this.http.get(this.url + '?search=' + term + page))
    .pipe(this.lastResultHandler)
  }

  profile(id: number): Observable<Profile> {
    const profile = this.lastResult?.results
      .filter((p: Profile) => p.id == id)[0] || null
    return profile ? of(profile) : this.getProfile(id)
  }

  getProfile(id: number): Observable<Profile> {
    return from(this.http.get<Profile>(this.url + '/' + id))
  }

  private secure(url: string) {
    return url.startsWith("https://") ? url : url.replace("http://", "https://")
  }
}

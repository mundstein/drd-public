import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import { ProfileService } from '../services/profile.service';
import { Profile, ProfileResult } from '../types/profile';
import { SearchQuery } from '../types/search-query';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit, OnDestroy {

  private ngUnsubscribe = new Subject<void>()

  searching = false
  term = ''
  currentResult: ProfileResult
  profiles$: Observable<Profile[]>
  currentQuery = new Subject<SearchQuery>()
  currentQuery$ = this.currentQuery.asObservable()
  showInfo = false

  constructor(private profileService: ProfileService) { }

  ngOnInit() {
    this.profiles$ = this.currentQuery$.pipe(
      takeUntil(this.ngUnsubscribe),
      switchMap(q => this.profileService.search(q)),
      map(p => {
        this.currentResult = p
        this.searching = false
        return p.results;
      }),
    )
  }

  status(profile: Profile) {
    return Profile.openingHoursStatus(profile)
  }

  search() {
    if (this.term == "") {
      this.currentResult = null
      return
    }
    this.searching = true
    this.currentQuery.next({query: this.term})
  }

  nextPage() {
    this.more(true)
  }

  prevPage() {
    this.more(false)
  }

  private more(next: boolean) {
    this.searching = true
    const p = this.getPage()
    const query = {query: this.term, page: next ? p + 1 : p -1}
    this.currentQuery.next(query)
  }

  showing(): any {
    const s = 20 // page size
    const n = this.currentResult.next
    const p = this.currentResult.previous
    const c = this.currentResult?.count || 0

    if (c == 0) {
      return { count: 0, start: 0, end: 0}
    }
    if (c <= s) {
      return { count: c, start: 1, end: c}
    }
    if (!p) {
      return { count: c, start: 1, end: s}
    }
    if (!n) {
      return { count: c, start: Math.floor(c/s)*s, end: c}
    }
    let page =  parseInt(n.split("page=")[1].slice(0,1)) - 1
    return { count: c, start: (page - 1) * s + 1, end: page * s}
  }

  getPage(): number {
    if (!this.currentResult?.previous) { return 1 }
    const prev = this.currentResult.previous
    if (!prev.includes("page=")) { return 2 }
    return parseInt(prev.split("page=")[1].split("&")[0]) + 1
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next()
    this.ngUnsubscribe.complete()
  }

}
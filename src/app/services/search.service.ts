import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  accommodateSearch: any = "";
  accommodatePage: number = 0;

  constructor() { }

  savePreviousSearch(search: any, page: number) {
    this.accommodateSearch = search;
    this.accommodatePage = page;
  }

  getPreviousSearch() {
    return { search: this.accommodateSearch, page: this.accommodatePage };
  }
}

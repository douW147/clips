import { Component, OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router'; 

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {
  sortingOrder: string = "1";

  constructor(
    public router: Router,
    public route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params: Params) => {
      this.sortingOrder = params["sort"] === "2" ? params["sort"] : "1";
    });
  }

  sort(event: Event) {
    const { value } = (event.target as HTMLSelectElement);

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        sort: value
      }
    })
  }

}

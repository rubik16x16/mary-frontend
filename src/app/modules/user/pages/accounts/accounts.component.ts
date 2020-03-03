import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../../../services/account.service';
import { Account } from '../../../../models/Account';
import { LoadBarService } from '../../../../services/load-bar.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {

  accounts: Account[];
  displayedColumns: string[] = [
    'id', 'name', 'amount'
  ];

  loadBar: boolean;

  constructor(
    private accountService: AccountService,
  ) { }

  ngOnInit() {

    this.accountService.all().subscribe(res => {

      this.accounts = res;
      console.log(this.accounts);
    });
  }

}

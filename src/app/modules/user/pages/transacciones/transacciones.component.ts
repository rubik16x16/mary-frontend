import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-transacciones',
  templateUrl: './transacciones.component.html',
  styleUrls: ['./transacciones.component.scss']
})
export class TransaccionesComponent implements OnInit {

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) { }

  ngOnInit() {

    this.httpClient.get('http://127.0.0.1:8000/transacciones').subscribe(res => {

      console.log(res);
    });

    console.log(this.authService.getUserPermissions());
  }

}

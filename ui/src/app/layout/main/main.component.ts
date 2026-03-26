import { Component } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { NavComponent } from "../nav/nav.component";
import { DialogComponent } from "../../_share/dialog/dialog.component";

@Component({
  selector: 'app-main',
  imports: [NavComponent, RouterOutlet, DialogComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}

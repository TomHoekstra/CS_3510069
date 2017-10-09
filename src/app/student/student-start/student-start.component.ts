import { Component, OnInit } from '@angular/core';
import { AppStateService } from '../../services/app-state.service';

@Component({
  selector: 'app-student-start',
  templateUrl: './student-start.component.html',
  styles: []
})
export class StudentStartComponent implements OnInit {
  
  constructor(public appStateService: AppStateService) { }

  

  ngOnInit() {
    
  }

}

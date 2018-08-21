import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SessionForm } from '../../forms/session-form';
import { Session } from '../../resourses/factories';
import { BaseCollection } from '../../resourses/collections/base-collection';

@Component({
  selector: 'app-dashboard',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  path = 'routes.login'
  sessionForm: SessionForm;

  constructor(public session: Session, public router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.sessionForm = new SessionForm(this.session, new BaseCollection<Session>());
  }

  save() {
    this.sessionForm.save().then(() => this.router.navigate(['/']));
  }
}

import { Component } from '@angular/core';
import { AsyncValidatorFn, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { of, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ValidatorService } from './validator.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Client';
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private validatorService:ValidatorService)
  {
    this.registerForm = this.fb.group({
          displayName: [null, [Validators.required]],
          email: [null, 
            [Validators.required, Validators
            .pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')],
            [this.validateEmailNotTaken()]
          ],
          password: [null, Validators.required]
        });
  }

  ngOnInit(): void {
  }

  

  validateEmailNotTaken(): AsyncValidatorFn {
    return control => {
      return timer(500).pipe(
        switchMap(() => {
          if (!control.value) {
            return of(null);
          }
          return this.validatorService.checkEmailExists(control.value).pipe(
            map(res => {
               return res ? {emailExists: true} : null;
            })
          );
        })
      )
    }
  }

  onSubmit()
  {
    console.log('Form submited');
  }
}


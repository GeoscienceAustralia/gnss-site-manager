import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'gnss-text-input',
  templateUrl: 'text-input.component.html',
  styleUrls: ['text-input.component.css']
})
export class TextInputComponent {
  @Input() name: string = '';
  @Input() label: string = '';
  @Input() model: string = '';
  @Input() index: string = '0';
  @Input() required: string = '';
  @Input() minlength: string = '';
  @Input() maxlength: string = '';

  /* Output an event when the value in the field changes */
  @Output() modelChange = new EventEmitter();
  change(newValue:string) {
    console.log('newvalue', newValue);
    this.model = newValue;
    this.modelChange.emit(newValue);
  }
}

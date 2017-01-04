import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'textarea-input',
  templateUrl: 'textarea-input.component.html',
  styleUrls: ['form-input.component.css']
})
export class TextAreaInputComponent {
  @Input() model: string = '';
  @Input() index: string = '0';
  @Input() name: string = '';
  @Input() public label: string = '';
  @Input() public required: string = 'false';
  @Input() public rows: string = '';
  @Input() public maxlength: string = '';

  configurationObject: any = null;

  /* Output an event when the value in the field changes */
  @Output() modelChange = new EventEmitter();
  change(newValue:string) {
    console.log('newvalue', newValue);
    this.model = newValue;
    this.modelChange.emit(newValue);
  }
}

import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'text-input',
  templateUrl: 'text-input.component.html',
  styleUrls: ['form-input.component.css']
})
export class TextInputComponent {
  @Input() model: string = '';
  @Input() index: string = '0';
  @Input() name: string = '';
  @Input() public label: string = '';
  @Input() public required: string = 'false';
  @Input() public minlength: string = '';
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

import { Component, OnInit, ViewChild, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import Inputmask from 'inputmask';

@Component({
  selector: 'app-input-mask',
  templateUrl: './input-mask.component.html',
  styleUrls: ['./input-mask.component.scss']
})
export class InputMaskComponent implements AfterViewInit {

  @ViewChild('input', {static: false}) input;
  @Input()  value: number;
  @Output() newValue = new EventEmitter<number>();

  constructor() { }

  ngAfterViewInit() {

    let im = new Inputmask('$ (,999){+|1}.99', {
      numericInput: true,
      radixPoint: '.',
      _radixDance: true,
      positionCaretOnClick: 'radixFocus',
      placeholder: '0'
    });

    let selector = this.input.nativeElement;
    selector.value = this.value != null
      ? this.value.toFixed(2) : 0;
    im.mask(selector);

  }

  change(e) {

    let numeral = require('numeral');
    this.newValue.emit(numeral(e.target.value).value());
  }

}

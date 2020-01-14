import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-color-sketch-wrapper',
  templateUrl: './color-sketch-wrapper.component.html',
  styleUrls: ['./color-sketch-wrapper.component.scss']
})
export class ColorSketchWrapperComponent {

  @Output() color = new EventEmitter<string>();

  presetColors: string[] = ['#F74723', '#FF7C0B', '#F4D225', '#7BC25D', '#00BD78', '#45C0D6', '#2582F4', '#3C57FA', '#AF4DFF', '#F04391'];
  newColor: string;

  changeComplete(event): void {
    this.newColor = event.color.hex;
  }

  onSaveColor(): void {
    this.color.emit(this.newColor);
  }

}

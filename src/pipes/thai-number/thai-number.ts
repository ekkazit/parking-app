import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'thaiNumber',
})
export class ThaiNumberPipe implements PipeTransform {
  num_arabic = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
  num_thai = ["๑", "๒", "๓", "๔", "๕", "๖", "๗", "๘", "๙", "๐"];

  transform(value: string, ...args) {
    let output = '';
    let str = value + '';
    for (let i = 0; i < str.length; i++) {
      let index = this.num_arabic.indexOf(str[i]);
      if (index !== -1) {
        output += this.num_thai[index];
      } else {
        output += str[i];
      }
    }
    console.log(output);
    return output;
  }
}

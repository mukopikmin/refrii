import { Pipe, PipeTransform } from '@angular/core';

import { Food } from '../models/food';

@Pipe({
  name: 'foodOrder'
})
export class FoodOrderPipe implements PipeTransform {

  transform(array: Array<Food>): Array<object> {
    return array.sort((a, b) => {
        if(a.needsAdding > b.needsAdding) return -1;
        if(a.needsAdding < b.needsAdding) return 1;
        return 0;
      });
  }

}

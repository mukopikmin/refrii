import { Pipe, PipeTransform } from '@angular/core';

import { Food } from '../models/food';

@Pipe({
  name: 'foodFilter'
})
export class FoodFilterPipe implements PipeTransform {

  transform(array: Array<Food>, _query: string): any {
    const query = _query.toLowerCase();

    if (query === '') {
      return array;
    } else {
      return array.filter(item => {
        if (item.name.toLowerCase().indexOf(query) != -1) {
          return true;
        } else {
          return false;
        }
      });
    }
  }

}

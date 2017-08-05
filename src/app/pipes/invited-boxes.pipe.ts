import { Pipe, PipeTransform } from '@angular/core';
import { Box } from '../models/box';

@Pipe({
  name: 'invitedBoxes'
})
export class InvitedBoxesPipe implements PipeTransform {
  transform(boxes: Box[], isOwns: boolean): Box[] {
    return boxes.filter(box => {
      return box.isInvited == isOwns;
    });
  }
}

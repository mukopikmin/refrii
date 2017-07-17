import { FoodFilterPipe } from './food-filter.pipe';

describe('FoodFilterPipe', () => {
  it('create an instance', () => {
    const pipe = new FoodFilterPipe();
    expect(pipe).toBeTruthy();
  });
});

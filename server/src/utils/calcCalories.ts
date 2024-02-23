import { Macros } from '../types/macros';

export function calcCalories(macros: Macros) {
  return macros.carbs * 4 + macros.fat * 9 + macros.protein * 4;
}

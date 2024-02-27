import { Macros } from '../types/macros';

export function calcCalories(macros: Macros) {
  return macros.fat * 9 + macros.carbs * 4 + macros.protein * 4;
}

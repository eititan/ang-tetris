export const COLS = 10;
export const ROWS = 20;
export const BLOCK_SIZE = 33;
export const STATS_BLOCK_SIZE = 25;
export const LINES_PER_LEVEL = 10;
export const FILL_COLORS = [
  'none',
  'rgb(27, 203, 164)',  //cyan
  'rgb(0, 164, 255)',   //blue
  'rgb(247, 116, 34)',   //orange
  'rgb(254, 60, 138)',  //pink  
  'rgb(110, 198, 62)',  //green
  'rgb(136, 20, 255)',   //purple
  'rgb(255, 0, 0)'      //red
];
export const BORDER_COLORS = [
  'none',
  'rgb(89, 247, 212)',  //cyan
  'rgb(0, 220, 255)',   //blue
  'rgb(249, 201, 87)', //orange
  'rgb(255, 136, 209)', //pink  
  'rgb(180, 255, 73)',  //green
  'rgb(206, 80, 253)',  //purple
  'rgb(255, 162, 160)'      //red
];
export const SHAPES = [
  [],
  [[1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
  [[2, 0, 0], [2, 2, 2], [0, 0, 0]],
  [[0, 0, 3], [3, 3, 3], [0, 0, 0]],
  [[4, 4], [4, 4]],
  [[0, 5, 5], [5, 5, 0], [0, 0, 0]],
  [[0, 6, 0], [6, 6, 6], [0, 0, 0]],
  [[7, 7, 0], [0, 7, 7], [0, 0, 0]]
];

export class KEY {
  static readonly ESC = 27;
  static readonly SPACE = 32;
  static readonly LEFT = 37;
  static readonly UP = 38;
  static readonly RIGHT = 39;
  static readonly DOWN = 40;
}

export class POINTS {
  static readonly SINGLE = 100;
  static readonly DOUBLE = 300;
  static readonly TRIPLE = 500;
  static readonly TETRIS = 800;
  static readonly SOFT_DROP = 1;
  static readonly HARD_DROP = 2;
}

export class LEVEL {
  static readonly 0 = 800;
  static readonly 1 = 720;
  static readonly 2 = 630;
  static readonly 3 = 550;
  static readonly 4 = 470;
  static readonly 5 = 380;
  static readonly 6 = 300;
  static readonly 7 = 220;
  static readonly 8 = 130;
  static readonly 9 = 100;
  static readonly 10 = 80;
  static readonly 11 = 80;
  static readonly 12 = 80;
  static readonly 13 = 70;
  static readonly 14 = 70;
  static readonly 15 = 70;
  static readonly 16 = 50;
  static readonly 17 = 50;
  static readonly 18 = 50;
  static readonly 19 = 30;
  static readonly 20 = 30;
  // 29+ is 20ms
}
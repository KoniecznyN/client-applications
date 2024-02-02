class Item {
    name;
    flag;
    x;
    y;

    constructor(name, flag, x, y) {
        this.name=name
        this.flag=flag
        this.x=x
        this.y=y
    }
  }

  export const items = [
    new Item("", 1, 3, 1),
    new Item("", 1, 5, 1),
    new Item("", 1, 7, 1),
    new Item("", 1, 3, 2),
    new Item("", 1, 7, 2),
    new Item("", 1, 2, 3),
    new Item("", 1, 4, 4),
    new Item("", 1, 5, 5),
    new Item("", 1, 4, 6)
  ]
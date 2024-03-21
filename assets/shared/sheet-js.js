import { Helper } from "./helper.js";

export class SheetJS {

  static init(){
    SheetJS.__init__f();
  }

  static save(tableID, filename = `sheet`) {
    if (!SheetJS.__initilized__) SheetJS.__init__f();
    if (SheetJS.__holder__) {
      console.warn("SheetJS already have an instance. Use SheetJS.clear() to remove.");
      return;
    }
    return new Promise((next, err) => {
      setTimeout(() => {
        SheetJS.__holder__ = XLSX.utils.table_to_book(Helper.f(tableID));
        XLSX.writeFile(SheetJS.__holder__, `${filename}-${new Date().toLocaleDateString()}.xlsx`);
        next({ status: 1 });
        err({ status: 0 });
      }, 1500);
    });
  }

  static clear() {
    SheetJS.__holder__ = null;
  }

  static __init__f() {
    const js = document.createElement('script');
    js.setAttribute('src', 'https://cdn.sheetjs.com/xlsx-0.20.1/package/dist/xlsx.full.min.js');
    Helper.f("head").appendChild(js)
    SheetJS.__initilized__ = true;
  }

  static __initilized__ = false;
  static __holder__ = null;

}
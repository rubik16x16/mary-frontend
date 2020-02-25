export abstract class Model {

  protected abstract fillable: string[];

  fill(object: any): void {

    let props = Object.getOwnPropertyNames(object);
    props.forEach(prop => {

      if (this.fillable.indexOf(prop) > -1) {

        this[prop] = object[prop];
      } else if (this.fillable.indexOf(this.camelToSnake(prop)) > -1) {

        this[prop] = object[prop];
      } else if (this.fillable.indexOf(this.snakeToCamel(prop)) > -1) {

        this[this.snakeToCamel(prop)] = object[prop];
      }
    });
  }

  private snakeToCamel(word: string): string {

    return word.replace(/(_\w)/g, (m) => {
        return m[1].toUpperCase();
    });
  }

  private camelToSnake(word: string): string{

    return word.replace(/[\w]([A-Z])/g, (m) => {
        return m[0] + '_' + m[1];
    }).toLowerCase();
  }

  abstract toJSON();
}

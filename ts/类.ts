//定义类
//修饰符 public（都可以访问） protected（类和子类可以访问,外面不能访问）   private(类里面可以访问，子类和外面都不能访问)
class Person{
  public name:string;
  private age:number;
  //实例化类的时候触发的方法
  constructor(n:string,a:number){
    this.name  =n ;
    this.age  = a;
  }
  getName():string{
    return name;
  }
  setName():void{
    this.name = name;
  }
}
const p =new Person("xiaoming",23);

//继承

class Men extends Person{
  constructor(name:string,age:number){
    super(name,age);//初始化父类的构造函数
  }
}

let m = new Men("xiaozxao",23);
m.getName()




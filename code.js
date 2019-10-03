
class ISet{
    constructor(a, b){
        this.a = a;
        this.b = b;


        this.member = this.member.bind(this)
        this.union = this.union.bind(this)
        this.intersect = this.intersect.bind(this)
        this.compliment = this.compliment.bind(this)
        this.difference = this.difference.bind(this)
    }


    member(val){
        throw new Error("Idiot")
    }

    union(set){
        return new Union(this, set)
    }

    intersect(set){
        return new Intersect(this, set)
    }

    compliment(){
        return new Compliment(this)
    }

    difference(set){
        return new Difference(this, set)
    }

    toString(){
        return "-------------------IDIOT-------------------"
    }
}

class Difference extends ISet{
    member(val){
        return this.a.member(val) && ! this.b.member(val)
    }

    toString(){
        return ` (${this.a}-${this.b}) `
    }
}

class Compliment extends ISet{
    member(val){
        return ! this.a.member(val)
    }
    toString(){
        return ` !${this.a} `
    }
}

class Union extends ISet{
    member(val){
        return this.a.member(val) || this.b.member(val)
    }

    toString(){
        return ` (${this.a}U${this.b}) `
    }
}

class Intersect extends ISet{
    member(val){
        return this.a.member(val) && this.b.member(val)
    }

    toString(){
        return ` (${this.a}n${this.b}) `
    }
}

class Range extends ISet{
    member(val){
        if(this.a === null)
            return val <= this.b
            
        if(this.b === null)
            return val >= this.a

        return  val >= this.a && val <= this.b;
    }

    toString(){
        return ` [${this.a};${this.b}] `
    }
}

class Universal extends ISet{
    member(){
        return true;
    }
    toString(){
        return " U "
    }
}

class Empty extends ISet{
    member(){
        return false;
    }
    toString(){
        return " Ø "
    }
}


class Predicate extends ISet{
    member(val){
        return this.a(val);
    }
    toString(){
        return " "+this.a.toString()+" "
    }
}
// test range
{
    let a = new Range(5,10);

    console.assert(!a.member(4))
    console.assert(a.member(5))
    console.assert(a.member(10))
    console.assert(!a.member(11))
}

// test predicate
{
    let a = new Predicate((a) => a%2==0);

    console.assert(a.member(2))
    console.assert(!a.member(3))
}

// test union
{
    let a = new Range(5,10);
    let b = new Range(25,35);
    let u = a.union(b);

    
    console.assert(!u.member(4))
    console.assert(u.member(5))
    console.assert(u.member(10))
    console.assert(!u.member(11))

    console.assert(!u.member(24))
    console.assert(u.member(25))
    console.assert(u.member(35))
    console.assert(!u.member(36))

    let c = new Range(125,135);
    let u2 = u.union(c)

    console.assert(u2.member(10))
    console.assert(!u2.member(100))
    console.assert(u2.member(130))
}

// test Compliment
{
    let a = new Range(5,10);
    let c = a.compliment(); 
    

    console.assert(c.member(4))
    console.assert(!c.member(5))
    console.assert(!c.member(10))
    console.assert(c.member(11))  
}

// test intersect
{
    let a = new Range(5,10);
    let b = new Range(9,11);
    let i = a.intersect(b);
    

    console.assert(!i.member(4))
    console.assert(!i.member(8))
    console.assert(i.member(9))
    console.assert(i.member(10))
    console.assert(!i.member(11))
    console.assert(!i.member(12))
}

// test difference
{
    let a = new Range(5,10);
    let b = new Range(8,16);
    let d = a.difference(b);


    console.assert(!d.member(4))
    console.assert(d.member(5))
    console.assert(d.member(7))
    console.assert(!d.member(8))
}

// complex
{
    let a = new Range(10, null)
    let b = new Range(5, 30)
    let aIb = a.intersect(b);

    let c = new Range(-29, null);
    let nc = c.compliment()
    let cUab = nc.union(aIb)


    console.assert(cUab.member(-234567))
    console.assert(cUab.member(15))
    console.assert(!cUab.member(-4))

    console.log(cUab+"")

    let even = new Predicate((a) => a%2==0);
    let ncEven = nc.intersect(even);

    console.log(ncEven+"")
    console.assert(ncEven.member(-30))
    console.assert(!ncEven.member(-31))
    console.assert(!ncEven.member(30))

}

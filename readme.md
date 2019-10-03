# discrete mathematics - 5 - Set Theory

_by Benjamin & Jacob_

We have in javascript implemented a set api to create and evaluate set expressions.

We have implemented a Range set there can be created with `new Range(5,10)`, a predicate set `new Predicate((a) => a%2==0)` together with the Universal `new Universal()` and Empty `new Empty()` set.

All those sets can be combined with the following operators: union, intersect and difference.

Here is a example of union:

```
let a = new Range(5,10);
let b = new Range(25,35);
let u = a.union(b);
console.log(u.member(5)); // going to be true
```

A compliment set can be created with `someSet.compliment()`

## run it

Open a new chrome tab and go to the devtools (F12) console area and past the code, it should print some composed statements. Feel free to play with it, examples of every function is included.

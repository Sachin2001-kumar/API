// Classic -> This is undefined bug

const counter ={
    count:0,
    increment (){
        this.count++
        console.log(this.count)
    }
}

// const broken=counter.increment;
// broken()

const fixed = counter.increment.bind(counter)
fixed()
fixed()
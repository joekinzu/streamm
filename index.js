const {Readable,Writable,Transform} = require('stream');

class ReadArray extends Readable{
    constructor(arrayData,opt={}){
        super(opt)
        this._arrayData=arrayData;
        this.on('data',(chunk)=>{console.log(chunk)});
        this.on('end',()=>{console.log('end')});
    }

    _read(){
        let data=this._arrayData.shift()
        if(data){
            this.push(data);
        }else{
            this.push(null);
        }
    }
}


class WriteArray extends Writable{
    constructor(opt={}){
        super(opt)
        this.on('finish',(chunk)=>{console.log('finish')});
    }

    // _read(){
    //     let data=this._arrayData.shift()
    //     if(data){
    //         this.push(data);
    //     }else{
    //         this.push();
    //     }
    // }

    _write(chunk,encoding,done){
        console.log('write ' + chunk.toString());
        done();
    }
}

class TransformArray extends Transform{
    constructor(opt={}){
        super(opt)
        this.on('finish',(chunk)=>{console.log('finish')});
    }

    // _read(){
    //     let data=this._arrayData.shift()
    //     if(data){
    //         this.push(data);
    //     }else{
    //         this.push();
    //     }
    // }

    _transform(chunk,encoding,done){
        console.log('transform ' + chunk.toString());
        this.push(chunk.toString());
        done();
    }
}
var obj = [{name: 1},{name: 121}];
let arrayString = obj;
let opts = {objectMode:true};
const R = new ReadArray(obj,opts); 
const W = new WriteArray(opts); 
const T = new TransformArray(opts);
R.pipe(T).pipe(W);
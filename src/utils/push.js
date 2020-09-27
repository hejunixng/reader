// 数组不重复
Array.prototype.pushduplicate = function(){
    for(let i = 0;i<arguments.length;i++){
        const arg = arguments[i];
        // this指的是调用方法的数组
        if(this.indexOf(arg) === -1){
            this.push(arg)
        }
    }
}
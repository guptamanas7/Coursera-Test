(function (window){
    
    var yaakovgreeter={};
    window.yaakovgreeter=yaakovgreeter;
    yaakovgreeter.name="yaakov";
    yaakovgreeter.sayhello=function(){
        console.log("hello "+yaakovgreeter.name);
    };
    
    

})(window);

yaakovgreeter.sayhello();


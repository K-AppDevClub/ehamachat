export default {
  convert(msg){
    var res = new Object()
    var canvas = document.createElement("canvas")
    var ctx = canvas.getContext("2d")
    ctx.font = "20 serif";
    res.w = ctx.measureText(msg) , res.h = 20;
    canvas.width = res.w.width, canvas.height = res.h
    ctx.strokeText(msg, 0, 10);
    res.url = canvas.toDataURL()
    return Promise.resolve(res)
  }
}
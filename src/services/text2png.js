export default {
  convert(msgData, color){
    var msg = msgData.message
    var res = new Object();
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d")
    ctx.font = "bold 20px MSゴシック";
    var size = ctx.measureText(msg)
    res.w = size.width, res.h = 32;
    canvas.width = res.w; canvas.height = res.h;
    ctx.font = "bold 20px MSゴシック";
    ctx.fillStyle = color;    
    ctx.fillText(msg, 0, res.h/2);
    res.url = canvas.toDataURL()
    return Promise.resolve(res)
  }
}
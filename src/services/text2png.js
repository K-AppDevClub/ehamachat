export default {
  convert(msg){
    var res = new Object()
    var canvas = document.createElement("canvas")
    var ctx = canvas.getContext("2d")
    console.log(ctx.font)
    ctx.font = "italic bold 20px MSゴシック";
    var size = ctx.measureText(msg)
    res.w = size.width, res.h = 20;
    canvas.width = res.w; canvas.height = res.h;
    ctx.font = "italic bold 20px MSゴシック";
    ctx.fillText(msg, 0, 10);
    console.log(ctx.font)
    res.url = canvas.toDataURL()
    return Promise.resolve(res)
  }
}
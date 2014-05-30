var canvas = document.createElement('canvas');
    canvas.width = 16;canvas.height = 16;
    var ctx = canvas.getContext('2d');
    var img = new Image();
	var srcIm = 'data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACQ0lEQVQ4jZ2Ty0tUYRjGf9+Zi3Mcz5g5TsI0Tk42XkBsUbRLupHR39DK2rUNgiASAkNbRC3FXZKbFJMUK5F2piEmGaUljuaUgoyeuRxnzpk5LY6ecZb5rL7n5Xl+8L3wCvYV7I+Z/Ic2OsMCQBylfBgigv0xM5tJoi3PIpV5MfMGbqeEqKwlo+7g0DOWV/zs7eWQcikAXG4PcqQNJ4B3YYzTX9/gqPCRy+okdhI4fX6qZQmAzc0tTG8VjRUuADuTvXnPAnhWZ7jbeYuLV65h5PP0PX/G4s9fdPf0InvcjIyMMjg4QNf9HqKReox8nhe9T3g999YCbJvluMo8BEN1AISiLQQiZ2hqagSg9WwbsfUYl9rbAUgl06zF/xAqYAGyHh/ra2v2coJ1YRoi9bb3KQodHTdsPzY6zOf1BPrtPgtgyj7UdMoOXDh3nppAte1DJ0NEG6IAaJrG1OR7si1XccoK1pZcHtRd1S4clDVNAyAQqEHxVQCwsvSdL3/TGM3WdyQAUV5JJlUEAKhqksmpjzbkQK8GXhKrbkUcqy0CHN5KEulcSTAejzM9M10yW13+wfjcEkZzO2XlShGgmybZTLIk/G5igm+Li8iybM+Gh4b4XdOGwx+yZ04AjtexlUjx9HEXupEHYPzTPGZym+5HDwFIq7t8mF+C6w9wuT02QAT7Y6aRN9BnRzFjCwhJwqGpmP4weKsobK1gFgo409s4TpxCXL6DJCtFAFjHVNCS6Psn5RLY78NyCUrKG51hIQ7MUc/5H7v/5CNrgBusAAAAAElFTkSuQmCC';
    img.src = srcIm;
    img.onload = function() {
        ctx.drawImage(img, 0, 0);
        ctx.fillStyle = "#F00";
        ctx.fillRect(10, 7, 6, 8);
		ctx.rect(10,7,6,8);
		ctx.stroke();
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 10px sans-serif';
        ctx.fillText(turnCount.toString(), 10, 14);

        var link = document.createElement('link');
        link.type = 'image/x-icon';
        link.rel = 'shortcut icon';
        link.href = canvas.toDataURL("image/x-icon");
        document.getElementsByTagName('head')[0].appendChild(link);
    }
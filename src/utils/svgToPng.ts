import dataURLtoBlob from "./dataUrlToBlob";

const svgString2Image = (svgString: string, width: number, height: number, format: string = 'png', callback: Function) => {
    const svgData = svgString;
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = width;
    canvas.height = height;
    const image = new Image();
    image.onload = function () {
        context?.clearRect(0, 0, width, height);
        context?.drawImage(image, 0, 0, width, height);
        var pngData = canvas.toDataURL('image/' + format);
        callback(dataURLtoBlob(pngData));
    };
    image.src = svgData;
}

export default svgString2Image;
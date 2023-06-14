function start() {
  // Gaussian matrix variables
  var Gmatrix = {
    rows: 9,
    cols: 9,
    sigma: 1.5,
    brightness: 1/64,
    log: false,
    matrix: null
  };

  // Create Gaussian matrix
  generateGaussianMatrix(Gmatrix); //Gmatrix_rows,Gmatrix_cols,sigma,Gmatrix,false)

  // image vars
  var filename = "assets/images/Highimgnoise.jpg";//"https://upload.wikimedia.org/wikipedia/commons/8/87/Highimgnoise.jpg";
  var w = 480;
  var h = 480;

  // Load image
  var origin = document.getElementById("originalCanvas");
  
  var context = origin.getContext("2d");
  var imageObj = new Image();

  imageObj.onload = function() {
    context.drawImage(
      this,
      Math.floor(Gmatrix.cols / 2),
      Math.floor(Gmatrix.rows / 2)
    ); // draw image leave place for the edges
    // once the image is loaded start convolution process
    process(origin, Gmatrix);
  };
  imageObj.crossOrigin = "anonymous"; // to avoid cross origin security error
  imageObj.src = filename;
}

function generateGaussianMatrix(gmatrix) {
  sigmap2 = Math.pow(gmatrix.sigma, 2);
  output = "";
  gmatrix.matrix = [];
  for (i = 0; i < gmatrix.cols; i++) {
    gmatrix.matrix[i] = [];
    output += "\n";
    for (j = 0; j < gmatrix.rows; j++) {
      // var tmp = -(i^2+j^2)/sigmap2;
      // need to convert the (0,0) coordinates from top left to the center of the matrix
      corrected_row2 = Math.pow(i - Math.floor(gmatrix.cols / 2), 2);
      corrected_col2 = Math.pow(j - Math.floor(gmatrix.rows / 2), 2);
      var tmp = -(corrected_col2 + corrected_row2) / sigmap2;
      gmatrix.matrix[i][j] =
        1 / (2 * Math.PI * sigmap2) * Math.pow(Math.E, tmp);
      output += "\t" + gmatrix.matrix[i][j].toFixed(4);
    }
  }
  if (gmatrix.log) console.log(output);
}

function process(origin, gmatrix) {
  var cols = gmatrix.matrix.length;
  var rows = gmatrix.matrix[0].length;
  var cols_2 = Math.floor(cols / 2);
  var rows_2 = Math.floor(rows / 2);

  var w = origin.width;
  var h = origin.height;

  var ctx = origin.getContext("2d");
  
  var imgData=ctx.createImageData(w,h);
  
  for (var i = rows; i < h-rows_2; i++) {
    for (var j = cols; j < w-cols_2; j++) {
      var window = ctx.getImageData(j - cols_2, i - rows_2, cols, rows).data; // the window where the matrix is applied
      
      var sumR = 0;
      var sumG = 0;
      var sumB = 0;
      
      // for the matrix
      for (k = 0; k < rows; k++) {
        for (m = 0; m < cols; m++) {
          var r = (k*rows+m)*4;
          sumR += window[r];
          sumG += window[r+1];
          sumB += window[r+2];
        }
      }
      var r=(i*w+j)*4;
      imgData.data[r] = sumR*gmatrix.brightness;
      imgData.data[r+1] = sumG*gmatrix.brightness;
      imgData.data[r+2] = sumB*gmatrix.brightness;
      imgData.data[r+3] = 255;
   }
  }
  ctx.putImageData(imgData, cols_2, rows_2);
}

start();

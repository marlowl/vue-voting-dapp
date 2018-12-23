module.exports= {
    devServer: {
      open: process.platform === 'darwin',
      headers: { 'Access-Control-Allow-Origin': '*' },
      disableHostCheck: true
    }
  }
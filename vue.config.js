module.exports = {
  devServer: {
    open: process.platform === 'darwin',
    headers: { 'Access-Control-Allow-Origin': '*' },
    // disableHostCheck is removed in webpack-dev-server v4; allow all hosts instead (dev only)
    allowedHosts: 'all'
  }
}
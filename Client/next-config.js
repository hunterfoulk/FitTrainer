const withSass = require('@zeit/next-sass')
module.exports = withSass()
const withImages = require('next-images')
module.exports = withImages()
// module.exports = {
//     images: {
//         domains: ['https://fittrainer.blob.core.windows.net/fit-trainer/', 'fittrainer.blob.core.windows.net',],
//     },
// }

module.exports = {
    images: {
        loader: 'imgix',
        path: 'https://fittrainer.blob.core.windows.net',
    },
}

const withCSS = require('@zeit/next-css')

module.exports = withCSS({
    cssLoaderOptions: {
        url: false
    }
})
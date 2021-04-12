const withSass = require('@zeit/next-sass')
module.exports = withSass()

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
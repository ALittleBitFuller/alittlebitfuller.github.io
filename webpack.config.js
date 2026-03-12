const path = require( 'path' );
const { CleanWebpackPlugin } = require( 'clean-webpack-plugin' );
const CssMinimizerPlugin = require( 'css-minimizer-webpack-plugin' );
const HtmlMinimizerPlugin = require( "html-minimizer-webpack-plugin" );
const CopyPlugin = require( "copy-webpack-plugin" );

module.exports = () => {

    return [ {
        name: 'prodbuild',
        mode: 'production',
        target: 'web',
        entry: path.resolve(__dirname, 'src/empty.js'),
        output: {
            path: __dirname + '/docs/'
        },
        module: {
            rules: [
                {
                    test: /\.html$/i,
                    type: "asset/resource"
                },
                {
                    test: /.s?css$/,
                    use: [ 'css-loader', 'sass-loader' ]
                },
                {
                    test: /\.(jpe?g|png)$/i,
                    type: "asset",
                }
            ],
        },
        plugins: [
            new CleanWebpackPlugin(),
            new CopyPlugin( {
                patterns: [
                    {
                        from: "src",
                        globOptions: {
                            ignore: [ "**/index.js" ]
                        }
                    },
                    {
                        from: "CNAME",
                        to: ""
                    }
                ],
            } )
        ],
        optimization: {
            minimize: true,
            minimizer: [
                new CssMinimizerPlugin(),
                new HtmlMinimizerPlugin(),
            ],
        },
    } ]

};
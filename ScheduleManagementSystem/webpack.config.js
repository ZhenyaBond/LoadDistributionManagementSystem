const path = require("path");
const webpack = require("webpack");
const outputFolder = "./Scripts/bundles";

module.exports = (env, argv) => {
    return [{
        entry: { 'main': "./Scripts/app/bootstrap.js" },
        resolve: {
            extensions: [".js"],
            alias: {
                tools: path.join(__dirname, "./Scripts/app/tools")
            }
        },
        output: {
            path: path.resolve(__dirname, outputFolder),
            filename: "components.bundle.js"
        },
        mode: "development",
        devtool: 'eval-source-map',
        watch: true,
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                        query: {
                            presets: ["@babel/preset-env"],
                            plugins: ['transform-class-properties']
                        }
                    }
                },
                {
                    test: /\.html$/,
                    use: "raw-loader"
                }
            ]
        }
    }];
};
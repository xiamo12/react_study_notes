const path =require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");

const htmlPlugin = new htmlWebpackPlugin({
	template: path.join(__dirname, "./dist/index.html"),
	filename: "index.html",
});

module.exports = {
	mode: "development",
	plugins:[htmlPlugin],
	module: {
		rules:[
		{test:/\.js|jsx$/, use:["babel-loader"],exclude:/node_modules/},
		{test:/\.jpg|woff|woff2|eot|svg/, use:["url-loader"]},
		{test:/\.css$/, use:["style-loader","css-loader"]},
		{test:/\.scss$/, use:["style-loader","css-loader?modules", "sass-loader"]},
		]
	}
}
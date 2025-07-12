import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { VueLoaderPlugin } from 'vue-loader';
import WebpackBar from 'webpackbar';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
    mode: 'development',
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    devServer: {
        hot: true,
        open: true,
        compress: true,
        historyApiFallback: true,
        client: {
            progress: true,
            overlay: {
                errors: true,
                warnings: false
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },
    plugins: [
        new WebpackBar({
            name: '🚀 iChat',
            color: '#41b883',
            profile: true,
            fancy: true,
            basic: false,
            reporter: {
                start: (context) => {
                    // 只在第一次启动时显示
                    if (!context.state.isFirstRun) return;
                    console.log('\n' + '='.repeat(60));
                    console.log('🎯 Starting webpack compilation...');
                    console.log('📦 Project: iChat');
                    console.log('⏰ Time:', new Date().toLocaleTimeString());
                    console.log('='.repeat(60));
                },
                change: (context, { shortPath }) => {
                    if (shortPath) {
                        console.log(`\n🔄 File changed: ${shortPath}`);
                        console.log('⚡ Hot reloading...');
                    }
                },
                done: (context) => {
                    const { state, stats } = context;
                    const compilation = stats?.compilation;

                    console.log('\n' + '='.repeat(60));

                    if (state.hasErrors) {
                        console.log('❌ Build failed with errors!');
                        console.log('🔍 Please check the error messages above');
                    } else if (state.hasWarnings) {
                        console.log('⚠️  Build completed with warnings');
                        console.log('💡 Consider fixing the warnings for better performance');
                    } else {
                        console.log('✅ Build completed successfully!');
                        console.log('🎉 Your application is ready');
                    }

                    // 显示构建统计信息
                    if (compilation) {
                        const assets = compilation.getAssets();
                        const mainAsset = assets.find(asset => asset.name === 'bundle.js');

                        console.log('\n📊 Build Statistics:');
                        console.log(`⏱️  Compilation time: ${stats.endTime - stats.startTime}ms`);
                        console.log(`📁 Total assets: ${assets.length}`);
                        if (mainAsset) {
                            const sizeInKB = (mainAsset.info.size / 1024).toFixed(2);
                            console.log(`📦 Bundle size: ${sizeInKB} KB`);
                        }
                        console.log(`🔧 Modules processed: ${compilation.modules.size}`);
                    }

                    console.log('\n🌐 Development server info:');
                    console.log('🔗 Local:   http://localhost:8081/');
                    console.log('🔗 Network: http://192.168.31.143:8081/');
                    console.log('\n💡 Tips:');
                    console.log('   • Press Ctrl+C to stop the server');
                    console.log('   • Edit files to see hot reload in action');
                    console.log('='.repeat(60) + '\n');
                }
            }
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
        new VueLoaderPlugin()
    ],
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm-bundler.js',
            '@': path.resolve(__dirname, 'src')
        },
        extensions: ['*', '.js', '.vue', '.json']
    }
}

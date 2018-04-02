# flexedTable
简单的固定左右的table

配置babel的简单做法
cnpm install --save-dev babel-cli
cnpm install --save-dev babel-preset-env

.babelrc文件的内容
###
{
    "presets": [
      [
	      "env",
	      {
	        "targets": {
	          "browsers": ["last 2 versions", "ie >= 7"]
	        }
	      }
	    ]
    ],
    "plugins": []
  }
###

json 文件中的配置

###
"bBuild": "babel assets -d dist",
###

目前该项目的效果是通过simpleTest.html文件来查看的，因为用到了system.js所以需要自己启动服务器，具体看package.json文件。



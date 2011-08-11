echo off
echo Combining and minifying .js files...

cd ./js/
"D:\Program Files\SmallSharpTools\Packer for .NET\bin\Packer.exe" -o app.combined.js -m combine github.js badges.js app.js
"D:\Program Files\SmallSharpTools\Packer for .NET\bin\Packer.exe" -o app.min.js -m jsmin app.combined.js
del app.combined.js 
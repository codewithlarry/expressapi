# MacOS和Windows安装Docker Desktop
## MacOS安装Docker Desktop  
1. 点击左上角苹果图标，选择About this Mac菜单，查看苹果电脑是intel芯片组还是apple芯片组。
2. 打开浏览器，输入下载docker desktop的网址
https://www.docker.com/products/docker-desktop
然后选择芯片组对应的按钮下载Docker.dmg文件
3. 下载完成后，双击运行docker.dmg，拖拽Docker.app图标到Applications图标上，将docker的程序文件复制到applications目录下
4. 打开launchpad，运行docker，Docker在启动过程中左下角图标为橙色，当左下角的图标变成绿色时，可以确认docker在MacOS上成功安装。

## Windows上安装Docker Desktop 
### 查看Windows版本号
打开settings -> System ->About, 在windows specifications查看版本号
### 升级Windows
1. 如果版本号小于1903，windows10将无法安装docker desktop。在settings->update&Security->Window Update处点击Check for updates按钮，查看能升级到的版本并升级Windows10。
2. 如果上边的步骤不能将windows10版本升级到1903以上，则可以手工从
https://www.microsoft.com/en-us/software-download/windows10
下载最新的升级包安装程序，然后安装完成升级。
### 安装Windows Subsystem Linux 2
windows升级完成后，安装Windows Subsystem for Linux 2，简称WSL2
1. 用administrator角色打开windows powershell，运行:
```
   dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
```
2. 在powershell打开支持虚拟机功能
```
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
```
3. 下载Linux kernel升级包
https://wslstorestorage.blob.core.windows.net/wslblob/wsl_update_x64.msi
下载完成后，双击运行安装
4. 回到powershell，输入以下命令设置wsl2为默认版本
```
wsl --set-default-version 2
```
5. 访问网址 https://aka.ms/wslstore 打开Microsoft Store ，然后选择Ubuntu
6. 点击install按钮，安装Ubuntu。安装完成后设置Ubuntu的用户名和密码
### 安装docker desktop
1. 从 https://www.docker.com/products/docker-desktop 下载windows版docker-desktop
2. 下载完成后，双击安装文件，按提示完成安装
3. Docker在启动过程中左下角图标为橙色，当图标变成绿色时，可以确认docker在Windows上成功安装。

## 一键安装mysql postgres mongo redis 
1. 复制docker-compose.yml至一个空目录
2. 打开cmd或terminal窗口,cd至docer-compose.yml所在目录
3. 运行命令
```
docker-compose up
```
4. 大约2-3分钟，4个数据库可以安装完成。具体时间取决于网络速度和主机速度。

# Youtue教程地址
https://youtu.be/An01OT34O_U

# 参考链接
* https://www.microsoft.com/en-us/software-download/windows10
* https://docs.microsoft.com/en-us/windows/wsl/install-win10
* https://docs.docker.com/docker-for-windows/install/
* https://andrewlock.net/installing-docker-desktop-for-windows/

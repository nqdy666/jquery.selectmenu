# jquery.selectmenu
### 效果
![selectmenu.png](http://qjzd.qiniudn.com/FjpxhAKZ1DJYF20XDs2LXCbhBTmX)
### 依赖
jquery-1.11.2.min.js
jquery.mousewheel.min.js
### 使用
```
引用css
<link rel="stylesheet" type="text/css" href="selectmenu.css"/>
引用js
<script type="text/javascript" src="jquery.selectmenu.js"></script>
```
### 基本方法
```
<select class='select' id="mySelect">
    <option>请选择职业</option>
    <option value="3">IT</option>
    <option value="2">金融</option>
    <option value="1">教师</option>
</select>
$('#mySelect').selectMenu();
```
### 高级用法
```
初始化
var selectObjs = $.QjzdSelectMenu("select");
val() 获取值或设置值
selectObjs.selectMenu.val(); //获取当前值， 如果.select有多个元素，取第一个元素
selectObjs.selectMenu.val(1); //设置值
selectObjs.selectMenu.val($selectOne, 1); 给其中的$selectOne设置值
text() 获取值
selectObjs.selectMenu.text(); //获取当前text， 如果.select有多个元素，取第一个元素
selectObjs.selectMenu.text($selectOne); 给其中的$selectOne的text
```

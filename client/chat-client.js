/**
 * Created by lichun on 2018/3/20.
 */
	// 第一步   检测是否支持websocket  如果支持就创建websocket
var websocket = null;
var thread = {};//会话信息
var infos = {};//地址栏信息
var interfaceData = {};//接口返回的信息

if ('WebSocket' in window) {
	websocket = new WebSocket("ws://localhost:3000/");
} else {
	alert('当前浏览器不支持websocket')
}

// 连接成功建立的回调方法
websocket.onopen = function(e) {
	
	infos = GetRequest();
	//获取信息
	$.post("data/infoData.json",{oid:infos.oid},function(response){
		console.log(response);
		if(response.status == 'SUCCESS'){
			interfaceData = response.data;
			thread.type = 'enter';
			//判断是会员还是医生
			if(infos.types == "1"){
				thread.sendName = interfaceData.uname;
				thread.receiveName = interfaceData.dname;
				thread.headImg = interfaceData.uheadimg;
			}else{
				thread.sendName = interfaceData.dname;
				thread.receiveName = interfaceData.uname;
				thread.headImg = interfaceData.dheadimg;
			}
			
			//添加用户
			showUsers();
			
			//加入健康档案
			showArchive(interfaceData);
			
			//响应按钮操作
			btnHandler();
			
			//发起对话
			websocket.send(JSON.stringify(thread));
		}
		
	});
	
	
	
};

// 发送消息
function sendTextHandler(){
	var txt = document.getElementById("sendText").value;
	document.getElementById('sendText').value = '';
	if (txt) {
		thread.type = "message";
		thread.content = txt;
		websocket.send(JSON.stringify(thread));
	}
}


//接收到消息的回调方法
websocket.onmessage = function(e) {

	var mes = JSON.parse(e.data);
	//console.log('onmessage22=>',mes);
	if(mes.type!='enter'){
		showMessage(mes);
	}
	
	
};

//连接关闭的回调方法
websocket.onclose = function() {
	console.log("websocket close");
}


//连接发生错误的回调方法
websocket.onerror = function() {
	console.log("Webscoket连接发生错误");
}

//监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
window.onbeforeunload = function() {
	websocket.close();
}


//获取url参数
function GetRequest() {
	var url = location.search; //获取url中"?"符后的字串
	var theRequest = new Object();
	if (url.indexOf("?") != -1) {
		var str = url.substr(1);
		strs = str.split("&");
		for(var i = 0; i < strs.length; i ++) {
			theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
		}
	}
	return theRequest;
}


//处理收到的消息
function showMessage(obj){

	if (thread.sendName == obj.sendName) {
		// 自己发送的消息
		if (obj.content == undefined) {
			return;
		}
		createChatNode(obj, true);
		
	} else {
		
		if (obj.receiveName == thread.sendName) {
			createChatNode(obj, false);
		}
	}
}

//添加消息数据
function createChatNode(obj,isme){
	var el = '';
	el +='<div class="chat-text">';
	if (isme) {
		el +='	<div class="chat-area customer">';
	}else{
		el +='	<div class="chat-area service">';
	}
	el +='		<div class="face"><img src="'+obj.headImg+'" /></div>';
	el +='		<div class="text-wrapper">';
	el +='			<div class="arrow"></div>';
	el +='			<div class="text-content">';
	el +='				<p>'+obj.content+'</p>';
	el +='			</div>';
	el +='		</div>';
	el +='	</div>';
	el +='</div>';
	
	$('.chat-content').append(el);
	
}

//加入健康档案
function showArchive(obj){
	var el = '';
	el +='<div class="chat-text">';
	if (infos.types == "1") {
		el +='	<div class="chat-area customer">';
	}else{
		el +='	<div class="chat-area service">';
	}
	el +='		<div class="face"><img src="'+obj.uheadimg+'" /></div>';
	el +='		<div class="text-wrapper">';
	el +='			<div class="arrow"></div>';
	el +='			<div class="text-content">';
	el +='				<h3>健康档案：</h3>';
	el +='				<p class="blue">姓&nbsp;&nbsp;&nbsp;&nbsp;名：&nbsp;&nbsp;'+obj.uname+'</p>';
	el +='				<p class="blue">性&nbsp;&nbsp;&nbsp;&nbsp;别：&nbsp;&nbsp;'+obj.usex+'</p>';
	el +='				<p class="blue">出生日期：&nbsp;&nbsp;'+obj.ubirthdays+'</p>';
	el +='				<p class="blue">手&nbsp;机&nbsp;号：&nbsp;&nbsp;'+obj.uphone+'</p>';
	el +='				<p class="blue">生育状况：&nbsp;&nbsp;'+obj.ubirths+'</p>';
	el +='				<p class="blue">婚姻状况：&nbsp;&nbsp;'+obj.umarriage+'</p>';
	el +='				<p class="blue">病情描述：&nbsp;&nbsp;'+obj.introduce+'</p>';
	el +='			</div>';
	el +='		</div>';
	el +='	</div>';
	el +='</div>';
	
	$('.chat-content').append(el);
}

//添加会员信息
function showUsers(){

	var eles = '';
	var el = '';
	if (infos.types == "1"){
		el +='<a href="javascript:;" class="btn disabled">处方待开中</a>';
		el +='<span></span>';
		el +='<a href="javascript:;" class="quit">退出</a>';
		
		eles += '<h2 class="name">'+thread.sendName+'</h2>';
		eles += '<p class="state">（超24小时自动退款）....</p>';
		
		$(document).attr("title","在线咨询");
	}else {
		el +='<a href="javascript:;" class="btn" id="gameover">结束问诊</a>';
		el +='<a href="javascript:;" class="btn" id="chufang">诊断和处方</a>';
		el +='<span></span>';
		el +='<a href="javascript:;" class="quit">退出</a>';
		
		eles += '<h2 class="name">'+thread.sendName+'</h2>';
		eles += '<p class="state">接单中....</p>';
		
		$(document).attr("title","医生咨询");
	}
	
	$('.user-btn').empty();
	$('.user-btn').append(el);
	
	$('.info-m').empty();
	$('.info-m').append(eles);
	
	$('.face').append('<img src="'+thread.headImg+'">');
}

//响应按钮操作
function btnHandler(){
	$('.quit').click(function(){
		closeWindow();
	})
	
	$('#gameover').click(function(){
		closeWindow();
	})
	
	$('#chufang').click(function(){
		window.open("chufang.html");
	})
}

//关闭浏览器窗口并关闭链接
function closeWindow()
{
	window.opener = null;
	window.open(' ', '_self', ' ');
	window.close();
}
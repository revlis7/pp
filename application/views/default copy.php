<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title></title>
<meta name="description" content="" />
<meta name="keywords" content="" />
<meta name="robots" content="" />
<link href="/misc/css/common.css" rel="stylesheet" type="text/css" />
<script src="<?php echo base_url('misc/js/jquery-1.7.2.min.js'); ?>" type="text/javascript" charset="utf-8"></script>
</head>
<body>
<?php if($this->login->is_login()): ?>
<ul class="ul_menu">
<?php if(element('group', $this->session->userdata('user')) === 'administrator'): ?>
<li><a href="/user">账号管理</a></li>
<li><a href="/user/create">添加账号</a></li>
<?php endif; ?>
<li><a href="/user/pwd_change">修改密码</a></li>
<li><a href="/logout">登出</a></li>
</ul>
<?php else: ?>
<script>
$(document).ready(function() {
	$('#btn_login').click(function() {
		var S = {};
		S.data = {
			loginname : $('input[name="loginname"]').val(),
			password : $('input[name="password"]').val()
		};
		$.ajax({
			url : '/auth/auth_submit',
			type : 'POST',
			data : S.data,
			cache : false,
			dataType : 'json',
			success : function(json) {
				if(json.r == 'error') {
					alert(json.m);
				} else if(json.r == 'success') {
					window.location.href = window.location.href;
				}
			},
			error : function() {
				alert('system busy');
			}
		});
	});
});
</script>
<ul class="ul_menu">
<li>账号：<input name="loginname" type="text" maxlength="24" /></li>
<li>密码：<input name="password" type="password" maxlength="24" /></li>
<li><a id="btn_login" href="javascript:void(0);">登录</a></p>
</ul>
<?php endif; ?>
<?php echo $contents; ?>
</body>
</html>

<script>
$(document).ready(function() {
	$('#btn_create').click(function() {
		var S = {};
		S.data = {
			loginname : $('input[name="loginname"]').val(),
			password : $('input[name="password"]').val(),
			password_confirm : $('input[name="password_confirm"]').val(),
			realname : $('input[name="realname"]').val(),
			group : $('select[name="group"]').val()
		};
		if(S.data.password != S.data.password_confirm) {
			$('input[name="password"]').val('');
			$('input[name="password_confirm"]').val('');
			alert('两次密码输入不一致，请重新输入');
			return;
		}
		$.ajax({
			url : '/user/create_submit',
			type : 'POST',
			data : S.data,
			cache : false,
			dataType : 'json',
			success : function(json) {
				if(json.r == 'error') {
					alert(json.m);
				} else if(json.r == 'success') {
					window.location.href = '/user';
				}
			},
			error : function() {
				alert('system busy');
			}
		});
	});
});
</script>
<h1>USER CREATE</h1>
<p><input name="loginname" type="text" maxlength="24" />[账号] 3~24字符</p>
<p><input name="password" type="password" maxlength="24" />[密码] 6~24字符</p>
<p><input name="password_confirm" type="password" maxlength="24" />[确认密码] 6~24字符</p>
<p><input name="realname" type="text" maxlength="64" />[真实姓名] 2~64字符</p>
<p>
	<select name="group">
		<option value="">请选择</option>
		<?php $_group_cfg = $this->utility->get_group_cfg(); ?>
		<?php foreach($_group_cfg as $group => $group_name): ?>
		<option value="<?php echo $group; ?>"><?php echo $group_name ?></option>
		<?php endforeach; ?>
	</select>[账号分组]
</p>
<p><a id="btn_create" href="javascript:void(0);">提交</a></p>
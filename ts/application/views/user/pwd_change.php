<script>
$(document).ready(function() {
	$('#btn_change').click(function() {
		var S = {};
		S.data = {
			password : $('input[name="password"]').val(),
			password_new : $('input[name="password_new"]').val(),
			password_confirm : $('input[name="password_confirm"]').val()
		};
		if(S.data.password_new != S.data.password_confirm) {
			$('input[name="password_new"]').val('');
			$('input[name="password_confirm"]').val('');
			alert('两次密码输入不一致，请重新输入');
			return;
		}
		$.ajax({
			url : '/user/pwd_change_submit',
			type : 'POST',
			data : S.data,
			cache : false,
			dataType : 'json',
			success : function(json) {
				if(json.r == 'error') {
					alert(json.m);
				} else if(json.r == 'success') {
					alert('修改密码成功');
					window.location.href = '/';
				}
			},
			error : function() {
				alert('system busy');
			}
		});
	});
});
</script>
<h1>USER CHANGE PASSWORD</h1>
<p><input name="password" type="password" maxlength="24" />[旧密码] 3~24</p>
<p><input name="password_new" type="password" maxlength="24" />[新密码] 6~24</p>
<p><input name="password_confirm" type="password" maxlength="24" />[确认新密码] 6~24</p>
<p><a id="btn_change" href="javascript:void(0);">提交</a></p>
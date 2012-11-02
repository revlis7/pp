<!-- page specific -->
<style type="text/css">
.app-header1 {
    color: #596F8F;
    font-size: 22px;
    font-weight: 200;
    padding: 8px 15px;
    text-shadow: 0 1px 0 #fff;
}
.app-header2 {
    color: #596F8F;
    font-size: 16px;
    font-weight: 200;
    padding: 8px 15px;
    text-shadow: 0 1px 0 #fff;
}
</style>
<script type="text/javascript" src="/misc/ts_usermanage.js"></script>
<script type="text/javascript" src="/misc/ts_base_users.js"></script>
<?php /* ?>
<script>
function del(loginname) {
	var S = {};
	S.data = {
		loginname : loginname
	};
	$.ajax({
		url : '/user/delete',
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
}
</script>
<h1>USER MAIN PAGE</h1>
<ul class="ul_user">
<li>
	<span>id</span>
	<span>账号</span>
	<span>账号分组</span>
	<span>真实姓名</span>
	<span>操作</span>
</li>
<?php foreach($users as $user): ?>
<li>
	<span><?php echo $user->id; ?></span>
	<span><?php echo $user->loginname; ?></span>
	<span><?php echo $user->group; ?></span>
	<span><?php echo $user->realname; ?></span>
	<span>
		<?php if($user->loginname !== element('loginname', $this->session->userdata('user'))): ?>
		<a href="javascript:del('<?php echo $user->loginname; ?>');">删除</a>
		<?php else: ?>
		&nbsp;
		<?php endif; ?>
	</span>
</li>
<?php endforeach; ?>
</ul>
<?php */ ?>
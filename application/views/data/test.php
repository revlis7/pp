<script>
$(document).ready(function() {
	$('#btn_create').click(function() {
		var S = {};
		S.data = {
			total_share : $('input[name="total_share"]').val(),
			status : $('input[name="status"]').val()
		};
		$.ajax({
			url : '/data/create_submit',
			type : 'POST',
			data : S.data,
			cache : false,
			dataType : 'json',
			success : function(json) {
				if(json.r == 'error') {
					alert(json.m);
				} else if(json.r == 'success') {
					window.location.href = '/proj';
				}
			},
			error : function() {
				alert('system busy');
			}
		});
	});
});
</script>
<h1>DATA CREATE</h1>
<p><input name="total_share" type="text" maxlength="24" />[total_share]</p>
<p><input name="status" type="text" maxlength="24" />[status]</p>
<p><a id="btn_create" href="javascript:void(0);">提交</a></p>
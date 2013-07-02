<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title><?php echo $this->utility->page_title(); ?></title>
<link rel="stylesheet" type="text/css" href="<?php echo base_url('misc/resources/css/ext-all-gray.css'); ?>" />
<link rel="stylesheet" type="text/css" href="<?php echo base_url('misc/ux/grid/css/GridFilters.css'); ?>" />
<link rel="stylesheet" type="text/css" href="<?php echo base_url('misc/ux/grid/css/RangeMenu.css'); ?>" />
<script type="text/javascript" src="<?php echo base_url('misc/ext-all.js'); ?>"></script>
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
  .style_row_proj0 tr{background-color:#FFFFFF !important;cursor: pointer;color: #2f4b52}
  .style_row_proj1 tr{background-color:#F9EEF2 !important;cursor: pointer;color: #2f4b52}
  .x-grid-row {height:28px;vertical-align:top}
  .x-grid-cell {height:26px;vertical-align:top}
/*  .x-grid-cell-inner {height:26px;font-size:12px;padding:6px;line-height:26px}
*/
  .r_ex_td_pre {border-collapse:collapse;width:75px;padding:8px;border:1px solid #C1DAD7;background: #fff;color: #3f5b62;font-size:12px}
  .r_ex_td_main {border-collapse:collapse;width:400px;padding:8px;border:1px solid #C1DAD7;background: #fff;color: #3f5b62;font-size:12px}
  .r_ex_td_pre pre{margin:0;overflow:auto;white-space: pre-wrap; white-space: -moz-pre-wrap; white-space: -pre-wrap; white-space: -o-pre-wrap;word-wrap:break-word;}
  .r_ex_td_main pre{margin:0;overflow:auto;white-space: pre-wrap; white-space: -moz-pre-wrap; white-space: -pre-wrap; white-space: -o-pre-wrap;word-wrap:break-word;}
</style>
</head>
<body>
<?php echo $contents; ?>
</body>
</html>

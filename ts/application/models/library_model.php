<?php
class Library_model extends CI_Model {
	private $CI;

	function __construct() {
		parent::__construct();
		
		$this->CI =& get_instance();
	}
    
    function test() {
        $this->db->like('dir_path','/te','after');
        $this->db->where('is_dir',1);
        $this->db->from('library_list');
        $query = $this->db->get();
        return $query->result();
    }
    
    //上传文件的数据库处理
	function create_upload($remark, $filename, $filesize, $dir_path, $format, $store_filename, $version) {
		$update_data = array(
			'is_latest' => 0,
		);
		$this->db->where('filename',$filename);
		$this->db->where('dir_path',$dir_path);
		$this->db->where('is_latest',1);
		$this->db->from('library_list');
   		$this->db->update('library_list',$update_data);
		
		$upload = array(
			'remark'   => $remark,
			'filename'  => $filename,
			'filesize'  => $filesize,
			'format'  => $format,
			'creator'    => element('realname', $this->CI->session->userdata('user')),
			'create_ts' => date('Y-m-d H:i:s'),
			'dir_path' => $dir_path,
			'store_filename' =>  $store_filename,
			'version' => $version+1,
			'is_dir' => 0,
			'is_latest' => 1,
			'is_delete' => 0,
		);
		$query = $this->db->insert('library_list', $upload);
		if($this->db->affected_rows() !== 1) {
			return false;
		}
		return $this->db->insert_id();
	}
    
    //创建文件夹
    function create_dir($dir, $remark, $dir_path, $store_filename) {
        $data = array(
			'remark'   => $remark,
			'filename'  => $dir,
			'filesize'  => 0,
			'format'  => 'directory',
			'creator'    => element('realname', $this->CI->session->userdata('user')),
			'create_ts' => date('Y-m-d H:i:s'),
			'dir_path' => $dir_path,
			'store_filename' =>  $store_filename,
			'version' => 1,
			'is_dir' => 1,
			'dest_dir' => $dir_path.$dir.'/',
			'is_latest' => 1,
			'is_delete' => 0,
        );
        $this->db->insert('library_list',$data);
		if($this->db->affected_rows() !== 1) {
			return false;
		}
        $data = array(
			'remark'   => '',
			'filename'  => '返回上层',
			'filesize'  => 0,
			'format'  => 'directory',
			'creator'    => element('realname', $this->CI->session->userdata('user')),
			'create_ts' => date('Y-m-d H:i:s'),
			'dir_path' => $dir_path.$dir.'/',
			'store_filename' => $this->encrypt->sha1('返回上层'.date('Y-m-d H:i:s')),
			'version' => 1,
			'is_dir' => 1,
			'dest_dir' => $dir_path,
			'is_latest' => 1,
			'is_delete' => 0,
        );
        $this->db->insert('library_list',$data);
		if($this->db->affected_rows() !== 1) {
			return false;
		}
		return $this->db->insert_id();
    }
    
    //获取某一目录下的文件
	function get_upload_list($dir_path) {
		$this->db->from('library_list');
		$this->db->where('dir_path',$dir_path);
		$this->db->where('is_latest',1);
		$this->db->where('is_delete',0);
		$this->db->order_by('id', 'asc');
		$query = $this->db->get();
		return $query->result();
	}
    
    //回收站列表
   	function get_recycle_list($mode) {
		$this->db->from('library_list');
		$this->db->where('is_latest',1);
		$this->db->where('is_delete',1);
        $this->db->where('(is_dir<>1 or filename<>\'返回上层\')');
        if($mode == 'manage') {
            $this->db->where('creator',element('realname', $this->CI->session->userdata('user')));
        }
		$this->db->order_by('id', 'asc');
		$query = $this->db->get();
		return $query->result();
	}

    //按id查找文件
    function get_upload_by_id($id) {
		$this->db->from('library_list');
        $this->db->where('id',$id);
        //$this->db->order_by('id', 'asc');
		$query = $this->db->get();
		return $query->result();
	}
    //按名称和路径查找文件
	function get_upload_by_name($filename, $dir_path, $mode) {
		if($mode=='normal'){
			$this->db->where('is_delete',0);
		}
		$this->db->where('is_latest',1);
		$this->db->where('filename',$filename);
		$this->db->where('dir_path',$dir_path);
		$this->db->from('library_list');
		$query = $this->db->get();
		return $query->result();
	}

    //查看文件历史
    function get_upload_history($id, $mode) {
		$this->db->from('library_list');
    	$this->db->where('id',$id);
    	if($mode=='normal'){
    		$this->db->where('is_delete',0);
    	}
    	$this->db->where('dir_path',$dir_path);
    	$query = $this->db->get();
    	return $query->result();
    }

    //删除文件的数据库操作
    //这里没有校验is_latest，所以亦用于删除文件历史
    function delete_upload($id) {
		$data = array(
			'is_delete' => 1,
		);
		$this->db->from('library_list');
    	$this->db->where('id',$id);
    	$this->db->where('is_delete',0);
    	$this->db->update('library_list',$data);

		if($this->db->affected_rows() !== 1) {
			return false;
		}
		return true;
	}
	
    //恢复文件
    //这里没有校验is_latest，所以亦用于恢复文件历史
    function restore_upload($id) {
		$data = array(
			'is_delete' => 0,
		);
		$this->db->from('library_list');
    	$this->db->where('id',$id);
    	$this->db->where('is_delete',1);
    	$this->db->update('library_list',$data);

		if($this->db->affected_rows() !== 1) {
			return false;
		}
		return true;
	}
    //删除文件夹
    function delete_dir($dir_path) {
    	$data = array(
    		'is_delete' => 1,
    	);
        //$this->db->where('is_latest',1);
        //$this->db->like('dir_path',$dir_path, 'after');
        $this->db->where('is_latest = 1 and dir_path like \''.$dir_path.'%\'');
    	$this->db->update('library_list', $data);
        
        return true;
    }
    
    //修改文件名
    function rename_file($id, $new_filename) {
        $data = array(
            'filename' => $new_filename,
        );
        $this->db->where('id',$id);
        $this->db->update('library_list',$data);
        
        return true;

    }
    
}

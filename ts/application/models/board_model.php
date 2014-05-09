<?php
class Board_model extends CI_Model {
	private $CI;

	function __construct() {
		parent::__construct();
		
		$this->CI =& get_instance();
	}
    
	function get_all() {
		$this->db->from('board_list');
		$this->db->order_by('itemid', 'desc');
		$query = $this->db->get();
		return $query->result();
	}
    
	function get_by_id($itemid) {
		$this->db->from('board_list');
        $this->db->where('itemid',$itemid);
        //$this->db->order_by('id', 'asc');
		$query = $this->db->get();
		return $query->result();
	}
    
	function create_item($title,$content) {
        $data=array(
            'title'=>$title,
            'content'=>$content,
			'creator'   => element('realname', $this->CI->session->userdata('user')),
			'create_ts' => date('Y-m-d H:i:s'),
            'status' => 'normal'
            );
        
		$this->db->insert('board_list',$data);
        return true;
	}
    
	function update_item($itemid,$title,$content) {
        $data=array(
            'title' => $title,
            'content' => $content,
			'editor'   => element('realname', $this->CI->session->userdata('user')),
			'update_ts' => date('Y-m-d H:i:s'),
            );
        $this->db->where('itemid',$itemid);
		$this->db->update('board_list',$data);
        return true;
	}
    
	function delete_item($itemid) {
        $this->db->where('itemid',$itemid);
		$this->db->delete('board_list');
        return true;
	}
}
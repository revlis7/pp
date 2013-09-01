<?php
class Csr_channel_model extends CI_Model {

	const TABLE_NAME = 'csr_channel';

	function __construct() {
		parent::__construct();
	}

	function get_all() {
		$this->db->order_by('csr_channel_id','asc');
		return $this->db->get(self::TABLE_NAME);
	}

	function get_by_id($csr_channel_id) {
		$this->db->where('csr_channel_id', $csr_channel_id);
		return $this->db->get(self::TABLE_NAME);
	}

	// add new record
	function save($csr_channel) {
		$ts = date('Y-m-d H:i:s');
		$csr_channel['csr_channel_create_ts'] = $ts;
		$csr_channel['csr_channel_update_ts'] = $ts;
		$this->db->insert(self::TABLE_NAME, $csr_channel);
		return $this->db->insert_id();
	}

	// update record by id
	function update($csr_channel_id, $csr_channel) {
		$ts = date('Y-m-d H:i:s');
		$csr_channel['csr_channel_update_ts'] = $ts;
		$this->db->where('csr_channel_id', $csr_channel_id);
		$this->db->update(self::TABLE_NAME, $csr_channel);
	}
}
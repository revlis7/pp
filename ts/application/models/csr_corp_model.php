<?php
class Csr_corp_model extends CI_Model {

	const TABLE_NAME = 'csr_corp';

	function __construct() {
		parent::__construct();
	}

	function get_all() {
		$this->db->order_by('csr_corp_id','asc');
		return $this->db->get(self::TABLE_NAME);
	}

	function get_by_id($csr_corp_id) {
		$this->db->where('csr_corp_id', $csr_corp_id);
		return $this->db->get(self::TABLE_NAME);
	}

	// add new record
	function save($csr_corp) {
		$ts = date('Y-m-d H:i:s');
		$csr_corp['csr_corp_create_ts'] = $ts;
		$csr_corp['csr_corp_update_ts'] = $ts;
		$this->db->insert(self::TABLE_NAME, $csr_corp);
		return $this->db->insert_id();
	}

	// update record by id
	function update($csr_corp_id, $csr_corp) {
		$ts = date('Y-m-d H:i:s');
		$csr_corp['csr_corp_update_ts'] = $ts;
		$this->db->where('csr_corp_id', $csr_corp_id);
		$this->db->update(self::TABLE_NAME, $csr_corp);
	}
}
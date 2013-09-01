<?php
class Csr_person_model extends CI_Model {

	const TABLE_NAME = 'csr_person';

	function __construct() {
		parent::__construct();
	}

	function get_all() {
		$this->db->order_by('csr_person_id','asc');
		return $this->db->get(self::TABLE_NAME);
	}

	function get_by_owner($realname) {
		$this->db->where('csr_person_FSC_channel', $realname);
		$this->db->order_by('csr_person_id','asc');
		return $this->db->get(self::TABLE_NAME);
	}

	function get_by_id($csr_person_id) {
		$this->db->where('csr_person_id', $csr_person_id);
		return $this->db->get(self::TABLE_NAME);
	}

	// add new record
	function save($csr_person) {
		$ts = date('Y-m-d H:i:s');
		$csr_person['csr_person_create_ts'] = $ts;
		$csr_person['csr_person_update_ts'] = $ts;
		$this->db->insert(self::TABLE_NAME, $csr_person);
		return $this->db->insert_id();
	}

	// update record by id
	function update($csr_person_id, $csr_person) {
		$ts = date('Y-m-d H:i:s');
		$csr_person['csr_person_update_ts'] = $ts;
		$this->db->where('csr_person_id', $csr_person_id);
		$this->db->update(self::TABLE_NAME, $csr_person);
		return true;
	}
}
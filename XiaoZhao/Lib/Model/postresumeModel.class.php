<?php

class postresumeModel extends RelationModel{
	protected $_link = array(
		'singlejob' => array(
		'mapping_type' => BELONGS_TO,
		'class_name'=>'singlejob',
		'foreign_key' => 'jid',
		'as_fields'=>'name',
	),
		'company' => array(
		'mapping_type' => BELONGS_TO,
		'class_name'=>'company',
		'foreign_key' => 'cid',
		'as_fields'=>'name:cname',
	),
		'resume' => array(
		 'mapping_type' =>BELONGS_TO,
		 'class_name'   =>'resume',
		 'foreign_key'  =>'sid',
		 'as_fields'    =>'name:sname',
	),
	);
}
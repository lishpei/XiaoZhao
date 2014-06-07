<?php
class singlejobModel extends RelationModel {
    
    protected $_link = array(
        'company' =>array(
         'mapping_type' => BELONGS_TO,
         'class_name' =>'company',
         'foreign_key'=>'cid',
         'mapping_fields' => 'name',
        ),
    );
}
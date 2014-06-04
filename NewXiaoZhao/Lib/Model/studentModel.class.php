<?php
class studentModel extends Model {
    // 自动验证设置
    protected $_validate = array(
        array('username', 'require', '用户名必须！', 1),//1为必须验证
        array('username', '', '用户名已经存在', 0, 'unique', self::MODEL_INSERT),

    );
    // 自动填充设置
    protected $_auto = array(
    	array('password','md5',self::MODEL_INSERT,'function'),
    );
}
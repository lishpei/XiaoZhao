<?php

class RegisterAction extends Action{
	public function StudentRegister(){
        $Form = D("student");
		$vo = $Form->create();
        $vo['create_time'] = date('Y-m-d');

        $sid = $Form->add($vo);

        if (false !== $sid) {
            $Form = D("resume");
            $keys = array('name','sex','education','certificationType','certificationNum','location','email','phone','public','address','statement');
            $ve['sid'] = $sid;
            $ve['create_time'] = $vo['create_time'];
            foreach ($keys as $key) {
                $ve[$key] = '等待更新';
            }
            $ve['avtor'] = "Common/img/StudentAvtor/default.jpg";
            $Form->add($ve);
            $this->ajaxReturn($vo, '数据保存成功！', 1);
        } else {
            $$this->ajaxReturn($vo, '数据保存失败！', 0);
        }
        
	}
    
    public function checkStudentUsername(){
        $Form = D("student");
        $username = $_POST['username'];
        if(strlen($username) < 2 || strlen($username) > 20){
            $this->ajaxReturn(0,'用户名需要2-20字符',0);
        }else if ($Form->getByusername($username)) {
            $this->ajaxReturn(0,'用户名已经存在',0);
        }else{
            $Form = D("admin");
            if($Form->getByaname($username))
            {
                $this->ajaxReturn(0,'用户名已经存在',0);
            }else{
                $this->ajaxReturn(0,'可以使用此用户名',1);
            }
        }
    }
	public function CompanyRegister(){
        $Form = D("company");
		$vo = $Form->create();
        $vo['create_time'] = date('Y-m-d');
        $vo['avtor'] = "Common/img/CompanyAvtor/default.jpg";
        $cid = $Form->add($vo);
        if (false !== $cid) {
            $this->ajaxReturn(1, '数据保存成功！', 1);
        } else {
            $this->ajaxReturn(0, '数据保存失败！', 0);
        }
        
	}
    public function checkCompanyUsername(){
        $Form = D("company");
        $username = $_POST['username'];
        if(strlen($username) < 2 || strlen($username) > 20){
            $this->ajaxReturn(0,'用户名需要2-20字符',0);
        }else if ($Form->getByusername($username)) {
            $this->ajaxReturn(0,'用户名已经存在',0);
        }else{
            $Form = D("admin");
            if($Form->getByaname($username))
            {
                $this->ajaxReturn(0,'用户名已经存在',0);
            }else{
                $this->ajaxReturn(1,'可以使用此用户名',1);
            }
        }
    }
	public function changeS(){
		$Student = M("student");
		$condition['username'] = $_POST['username'];
		$condition['password'] = md5($_POST['password']);
		$np = md5($_POST['newpassword']);
		$vo = $Student->where($condition)->setField('password',$np);
		if($vo){
			echo session('sid');
			echo "successfully, please back to login again";
		}
		else{
			echo session('sid');
			echo 'failed, please back to login again';
		}
	}
    public function changeC(){
    	$Company = M("company");
    	$condition['username'] = $_POST['username'];
    	$condition['password'] = md5($_POST['password']);
    	$np = md5($_POST['newpassword']);
    	$vo = $Company->where($condition)->setField('password',$np);
    	if($vo){
    		echo session('cid');
    		echo "successfully, please back to login again";
    	}
    	else{
    		echo 'failed, please back to login again';
    	}
    }
}
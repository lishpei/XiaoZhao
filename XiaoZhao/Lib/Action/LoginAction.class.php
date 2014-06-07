<?php

class LoginAction extends Action {
	public function login(){
	    $Student = M("student");
      $condition['username'] = $_POST['username'];
      $condition['password'] = md5($_POST['password']);
      $vo = $Student->where($condition)->find();
      if($vo){
          $vo['role'] = 0;
          session('sid' , $vo['sid']);
          $vo['id'] = session('sid') ;
      		$this->ajaxReturn($vo, '登录成功！', 1);
      	}	
      else{
      		$Company = M('company');
          $vo = $Company->where($condition)->find();
          if($vo){
            $vo['role'] = 1;
            session('cid' , $vo['cid']);
            $vo['id'] = session('cid') ;
            $this->ajaxReturn($vo, '登录成功！', 1);
          }
          else{
              $admin = D("admin");
              $con['aname'] = $condition['username'];
              $con['password'] = $condition['password'];
              $vo = $admin->where($con)->find();
              if($vo)
              {
                $vo['role'] = 2;
                session('aid' , $vo['aid']);
                $vo['id'] = session('aid') ;
                $this->ajaxReturn($vo,'登录成功',1);
              }
              else
              {
                $this->ajaxReturn(0,'用户名或密码错误',0);
              }
          }
      }
	}

  public function logoff()
  {
    session(null);
    $this->ajaxReturn(1,'注销成功',1);
  }
}
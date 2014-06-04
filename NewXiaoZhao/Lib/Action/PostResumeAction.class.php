<?php

class PostResumeAction extends Action{
	public function changeStatus(){
		$rid['rid'] = $_POST['rid'];
		$con['status'] = $_POST['status'];
		$Form = M("postresume");
		$flag = $Form->where($rid)->save($con);
		if($flag){
			$this->ajaxReturn(1,'Yes',1);
		}
		else{
			$this->ajaxReturn(0,'No',0);
		}
	}

	public function enroll(){
		if(session('?sid'))
		{
			$Form = D("enroll");
			$con['sid'] = session('sid');
			$vo = $Form->where($con)->find();
			if($vo)
			{
				$this->ajaxReturn($vo,'已经报名',3);
			}
			else
			{
				$con['status'] = 0;
				$vo = $Form->add($con);
				if($vo)
				{
					$this->ajaxReturn($vo,'报名成功',1);
				}
				else
				{
					$this->ajaxReturn($vo,'报名失败',0);
				}
			}
		}
		else
		{
			$this->ajaxReturn(0,'这里是学生报名入口哦！',0);
		}
	}

	public function post(){
		if(session('?sid')){
			$con2['jid'] = $_POST['jid'];
			$postresume = D("postresume");
			$con2['sid'] = session('sid');
			$flag = $postresume->where($con2)->find();
			if($flag)
			{
				$this->ajaxReturn(0,'已经投递',0);
			}

			$Form = D("singlejob");
			$con['jid'] = $_POST['jid'];
			$vo = $Form->where($con)->setInc('resumenum');
			$vo = $Form->where($con)->find();
			$Form = D("company");
			$con1['cid'] = $vo['cid'];
			$vo = $Form->where($con1)->setInc('times'); 
			
			$con['cid'] = $con1['cid'];
			$con['status'] = 0;
			$con['sid'] = session('sid');
			$con['create_time'] = date('Y-m-d');

			$flag = $postresume->add($con);

			if($flag){
				$this->ajaxReturn(1,'Yes',1);
			}
			else{
				$this->ajaxReturn(0,'No',0);
			}
		}
		else{
			$this->ajaxReturn(0,'学生登录才能投递哦！',0);
		}
	}
	public function delete(){
		$con['rid'] = $_POST['rid'];
		$Form = D("postresume");
		$vo = $Form->where($con)->find();
		$flag = $Form->where($con)->delete();
		$con1['jid'] = $vo['jid'];
		$Form = D("singlejob");
		$flag = $Form->where($con1)->setDec('resumenum');
		if($flag){
			$this->success('Yes');
		}
		else{
			$this->error('No');
		}
	}
	public function getPostHistory(){
		if(session('?sid')){
			$Form = D("postresume");
			$con['sid'] = session('sid');
			$vo = $Form->where($con)->relation(true)->select();
			$this->ajaxReturn($vo,'Yes',1);
		}
		else{
			$this->ajaxReturn(0,'请先登录',0);
		}
	}
	public function getlist(){
		if(session('?cid')){
			$Form = D("postresume");
			$con['cid'] = session('cid');
			$vo = $Form->where($con)->relation(true)->select();
			$this->ajaxReturn($vo,'Yes',1);
		}
		else{
			$this->ajaxReturn(0,'请先登录',0);
		}
	}
	public function back(){
		if(session('?sid')){
			$con['sid'] = session('sid');
			$con['rid'] = $_POST['rid'];
			$Form = D("postresume");
			$vo = $Form->where($con)->find();
			if($vo['status'] == 0){
				$con1['jid'] = $vo['jid'];
				$Form->where($con)->delete();
				$Form = D("singlejob");
				$ve = $Form->where($con1)->setDec('resumenum');
				if($ve){
					$this->ajaxReturn(1,'Yes',1);
				}		
				else{
					$this->ajaxReturn(0,'No',0);
				}
			}
			else{
				$this->ajaxReturn(0,'无法撤回，对方已经阅读',0);
			}
		}
		else{
			$this->ajaxReturn(0,'请先登录',0);
		}
	}
	public function getcompanylist(){
		$Form = D("company"); 
		$vo = $Form->select();
		$this->ajaxReturn($vo,'list',1);

	}
}
<?php

class CompanyAction extends Action{
	public function change(){
		if(session('?cid')){
			$Form = D("company");
			$vo = $Form->create();
			$con['cid'] = session('cid');
			$flag = $Form->where($con)->save($vo);
			if($flag){
				$this->ajaxReturn(1,'更改成功',1);
			}
			else{
				$this->ajaxReturn(0,'更改失败',0);
			}
		}
		else{
			$this->ajaxReturn(0,'请先登录',0);
		}
	}

	public function getCompanyBasicInfo(){
		$Form = D("company");
		$con['cid'] = $_POST['cid'];
		$Info = $Form->where($con)->find();
		$this->ajaxReturn($Info,'Yes',1);
	}

	public function getCompanyLogo(){
		$Form = D("company");
		$con['cid'] = $_POST['cid'];
		$Info = $Form->where($con)->getField('avtor');
		$this->ajaxReturn($Info,'Yes',1);
	}

	public function getCompanyStatus(){
		$Form = D("company");
		$con['cid'] = $_POST['cid'];
		$Info = $Form->where($con)->getField('status');
		Log::record($Info);
		$this->ajaxReturn($Info,'Yes',1);
	}

	public function ChangeCompanyStatus(){
		$Form = D("company");
		$con['cid'] = $_POST['cid'];
		$status['status'] = $_POST['status'];
		$Info = $Form->where($con)->save($status);
		$this->ajaxReturn($Info,'Yes',1);
	}

	public function companyList(){
		$Form = D("company");
		$id = $_POST['pageindex'];
		$id = ($id - 1) * 9;
		$vo = $Form->field('cid , name , statement , avtor')->limit($id,$id + 8)->order('cid desc')->relation(true)->select();
		$this->ajaxReturn($vo , 'Yes' , 1);
	}

	public function TopCompany(){
		$Form = D("company");
		$con["status"] = 1;
		$vo = $Form->where($con)->field('cid , name , kind , size, times')->limit(5)->order("times desc")->select();
		$Form = D("singlejob");
		for($i = 0 ; $i < count($vo) ; $i++){
			$con_['cid'] = $vo[$i]['cid'];
			$vo[$i]["count"] = $Form->where($con_)->count();
		}
		$this->ajaxReturn($vo , 'Yes' , 1);
	}

	public function companyUncheckedList(){
		$Form = D("company");
		$con['status'] = 0;
		$List = $Form->where($con)->getField('cid,name');
		if($List){
			$this->ajaxReturn($List , 'Yes',1);
		}
		else{
			$this->ajaxReturn(0 , 'No',0);
		}
	}
	
	public function companyPageCount(){
		$Form = D("company");
		$vo = $Form->count();
		$this->ajaxReturn(ceil($vo/9) , 'Yes' , 1);
	}

	public function joblist(){
		$Form = M('singlejob');
		$con['cid'] = $_POST['cid'];
		$list = $Form->where($con)->order('jid desc')->select();
		if($list){
			$this->ajaxReturn($list , 'Yes',1);
		}
		else{
			$this->ajaxReturn(0 , 'No',0);
		}
	}

	public function companyName(){
		if(session('?cid')){
			$Form = D("company");
			$cid['cid'] = session('cid');
			$name = $Form->where($cid)->getField('name');
			$this->ajaxReturn($name,'请求成功',1);
		}else{
			$this->ajaxReturn(0,'请先登录',0);
		}
	}
}
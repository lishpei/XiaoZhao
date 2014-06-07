<?php

class PopularCompany extends Action{
	public function vote(){
		$id['id'] = $_GET['id'];
		$Form = D("popularcompany");
		$vo = $Form->where($id)->setInc('sum');
		if($vo){
			$this->success('Yes');
		}
		else{
			$this->error('No');
		}
	}
	public function check(){
		$id['id'] = $_GET['id'];
		$Form = D("popularcompany");
		$vo = $Form->where($id)->setInc('status');
		if($vo){
			$this->success('Yes');
		}
		else{
			$this->error('No');
		}
	}
	public function delete(){
		$id['id'] = $_GET['id'];
		$Form = D("popularcompany");
		$vo = $Form->where($id)->delete();
		if($vo){

		}
	}
	public function add(){
		$name['name'] = $_GET['name'];
		$Form = D("popularcompany");
		$vo = $Form->add($name);
		if($vo){
			$this->success('Yes');
		}
		else{
			$this->error('No');
		}
	}
	public function getclist(){
		$con['status'] = 0;
		$Form = D("popularcompany");
		$vo = $Form->where($con)->select();
		if($vo){
			$this->ajaxReturn($vo,'Yes',1);
		}
		else{
			$this->error('No list');
		}
	}
	public function gettlist(){
		$con['status'] = 1;
		$Form = D("popularcompany");
		$vo = $Form->where($con)->select();
		if($vo){
			$this->ajaxReturn($vo,'Yes',1);
		}
		else{
			$this->error('No list');
		}
	}
}
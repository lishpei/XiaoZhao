<?php

class JobAction extends Action {
	
	public function createjob(){
		if(session('?cid')){
			$Form = D("singlejob");
			$vo = $Form->create();
			$vo['create_time'] = date('Y-m-d');
			$vo['cid'] = session('cid');
			$id = $Form->add($vo);
			if(false !== $id){
				$Form = D("searchindex");
				$con['Type'] = 0;
				$con['Name'] = $vo['name'];
				$con['Id'] = $id;
				$Form->add($con);
				$this->ajaxReturn(1,'创建成功',1);
			}
			else{
				$this->ajaxReturn(0,'写入失败',0);
			}

		}
		else{
			$this->ajaxReturn(0,'请先登录',0);
		}
	}
	public function deletejob(){
		if(session('?cid')){
			$Form = D("singlejob");
			$jid['jid'] = $_POST['jid'];
			$cid = $Form->getField('jid,cid');
			if($cid[$jid['jid']] == session('cid')){
				$flag = $Form->where($jid)->delete();
				if(false !== $flag){
					$this->ajaxReturn(1,'删除成功',1);
				}
				else{
					$this->ajaxReturn(0,'删除失败',0);
				}
			}else{
				$this->ajaxReturn(0,'权限不足',0);
			}

		}
		else{
			$this->ajaxReturn(0,'请先登录',0);
		}
	}
	public function changejob(){
		if(session('?cid')){
			$Form = D("singlejob");
			$vo = $Form->create();
			$con['jid'] = $_POST['jid'];
			$flag = $Form->where($con)->save($vo);

			if($flag){
				$this->ajaxReturn(1,'Yes',1);
			}
			else{
				$this->ajaxReturn(0,'No',0);
			}
		}
		else{
			$$this->ajaxReturn(0,'请先登录',0);
		}
	}
	public function singlejob(){
		$con['jid'] = $_POST['jid'];
		$Form = D("singlejob");
		$vo = $Form->where($con)->find();
		$this->ajaxReturn($vo,'数据请求成功',1);
	}
	public function joblist(){
		if(session('?cid')){
			$Form = M('singlejob');
			$id = $_POST['pageindex'];
			$con['cid'] = session('cid');
			$id = ($id - 1) * 5;
			$list = $Form->where($con)->limit($id . ',5')->order('jid desc')->select();
			if($list){
				$this->ajaxReturn($list , 'Yes',1);
			}
			else{
				$this->ajaxReturn(0 , 'No',0);
			}
		}
		else{
			$this->ajaxReturn(0,'请先登录',0);
		}
	}
	
	public function TopJob(){
		$Form = D("singlejob");
		$vo = $Form->field('jid,cid,name,resumenum,size,money,location')->limit(5)->order('resumenum desc')->relation(true)->select();
		$this->ajaxReturn($vo , 'Yes' , 1);
	}

	public function jobCount(){
		if(session('?cid')){
			$Form = M('singlejob');
			$con['cid'] = session('cid');
			$num = $Form->where($con)->count();
			$this->ajaxReturn(ceil($num/5)  , 'Yes',1);
		}
		else{
			$this->ajaxReturn(0,'请先登录',0);
		}
	}
}
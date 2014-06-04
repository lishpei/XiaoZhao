<?php

class AdminAction extends Action{
	public function add()
	{
		if(session('aid') == 1)
		{
			$Form = D("admin");
			$vo = $Form->create();
			$flag = $Form->add($vo);
			if($flag)
			{
				$this->ajaxReturn(1,'注册成功',1);
			}
			else
			{
				$this->ajaxReturn(0,'注册失败',0);
			}
		}else{
			$this->ajaxReturn(0,'权限不够',0);
		}
	}

	public function checkAdminUsername(){
        $Form = D("admin");
        $username = $_POST['username'];
        if($Form->getByaname($username))
        {
            $this->ajaxReturn(0,'用户名已经存在',0);
        }else{
            $this->ajaxReturn(0,'可以使用此用户名',1);
        }
    }

	public function delete()
	{
		if(session('aid') == 1)
		{
			$Form = D("admin");
			$vo['aid'] = $_POST['aid']; 
			$flag = $Form->where($vo)->delete();
			if($flag)
			{
				$this->ajaxReturn(1,'删除成功',1);
			}
			else
			{
				$this->ajaxReturn(0,'删除失败',0);
			}
		}else{
			$this->ajaxReturn(0,'权限不够',0);
		}
	}
	public function getList()
	{
		if(session('aid') == 1)
		{
			$Form = D("admin");
			$vo = $Form->select();
			if($vo)
			{
				$this->ajaxReturn($vo,'获取成功',1);
			}
			else
			{
				$this->ajaxReturn(0,'获取失败',0);
			}
		}
		else
		{
			$this->ajaxReturn(0,'权限不够',0);
		}
	}
}
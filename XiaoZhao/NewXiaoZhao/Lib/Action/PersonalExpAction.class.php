<?php

class PersonalExpAction extends Action {
	
    public function add(){
		if(session('?sid')){
            $Form = D("personalexp");
            $vo = $Form->create();
            $vo['sid'] = session('sid');

            $flag = $Form->add($vo);
            if($flag)
            {
                $this->ajaxReturn(1,'Yes',1);
            }
            else
            {
                $this->ajaxReturn(0,'No',0);
            }
        }
        else{
            $this->ajaxReturn(0,'please login first',0);
        }
	}
    public function delete(){
        if(session('?sid')){
            $Form = D("personalexp");
            $con['pid'] = $_POST['pid'];
            $flag = $Form->where($con)->delete();
            if($flag){
                $this->ajaxReturn(1,'Yes',1);
            }
            else{
                $this->ajaxReturn(0,'No',0);
            }
        }
        else{
            $this->ajaxReturn(0,'please login first',0);
        }
    }
    public function change(){
        if(session('?sid')){
            $Form = D("personalexp");
            $vo = $Form->create();
            $con['pid'] = $_POST['pid'];
            $flag = $Form->where($con)->save($vo);

            if($flag){
                $this->ajaxReturn(1,'Yes',1);
            }
            else{
                $this->ajaxReturn(0,'No',0);
            }
        }
        else{
            $this->ajaxReturn(0,'please login first',0);
        }
    }
}
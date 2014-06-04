<?php

class ResumeAction extends Action {
	public function updateBasicInfo(){
		if(session('?sid')){
            $Form = D("resume");
            $vo = $Form->create();
            $sid['sid'] = session('sid');

            $flag = $Form->where($sid)->save($vo);
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
    public function getStudentAvtor(){
        $Form = D("resume");
        $sid['sid'] = $_POST['sid'];
        $vo = $Form->where($sid)->getField('avtor');
        $this->ajaxReturn($vo,'Yes',1);
    }
    public function getStudentName(){
        $Form = D("resume");
        $sid['sid'] = $_POST['sid'];
        $vo = $Form->where($sid)->getField('name');
        $this->ajaxReturn($vo,'Yes',1);
    }
    public function getStudentResume(){
        if(session('?sid')){
            $flag = $_POST['part'];
            $con['sid'] = session('sid');
            if($flag == 1){
                $Form = D("resume");
                $vo = $Form->where($con)->find();
                $this->ajaxReturn($vo,'Yes',1);
            }
            else if($flag == 2){
                $Form = D("educationexp");
                $vo = $Form->where($con)->select();
                $this->ajaxReturn($vo,'Yes',1);
            }
            else{
                $Form = D("personalexp");
                $vo = $Form->where($con)->select();
                $this->ajaxReturn($vo,'Yes',1);
            }
        }
        else{
            $this->ajaxReturn(0,'please login first',0);
        }
    }
    public function getSingleResume(){
        if(session('?cid')){
            $flag = $_POST['part'];
            $con['sid'] = $_POST['sid'];
            if($flag == 1){
                $Form = D("resume");
                $vo = $Form->where($con)->find();
                $this->ajaxReturn($vo,'Yes',1);
            }
            else if($flag == 2){
                $Form = D("educationexp");
                $vo = $Form->where($con)->select();
                $this->ajaxReturn($vo,'Yes',1);
            }
            else{
                $Form = D("personalexp");
                $vo = $Form->where($con)->select();
                $this->ajaxReturn($vo,'Yes',1);
            }
        }
        else{
            $this->ajaxReturn(0,'please login first',0);
        }
    }
    public function gp(){
        if(session('?sid')){
            $per = 0;
            $con['sid'] = session('sid');
            $Form = D("educationexp");
            $vo = $Form->where($con)->select();
            if($vo)
            {
                $per = $per + 20;
            }
            $Form = D("personalexp");
            $vo = $Form->where($con)->select();
            if($vo)
            {
                $per = $per + 20;
            }
            $Form = D("resume");
            $vo = $Form->where($con)->find();
            $pe = 0;
            $TocheckWords = array('name','sex','education','certificationType','certificationNum','location','email','phone','statement');
            foreach( $TocheckWords as $word){
                if($vo[$word] !== "等待更新" && $vo[$word] !== "<p>等待更新</p>\n"){
                    $pe = $pe  + 10; 
                }
            }
            Log::record($vo['statement']);
            if($vo['birth'] !== "0000-00-00")
            {
                $pe = $pe  + 10; 
            }
            $per = $pe*0.6 + $per;
            $this->ajaxReturn(1,$per.'%',1);
        }
    }
}
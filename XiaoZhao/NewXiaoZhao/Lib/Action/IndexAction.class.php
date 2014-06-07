<?php

class IndexAction extends Action {

  public function index() {
      $this->show();
  }

  public function count(){
  		$Form = D("company");
  		$count['company'] = $Form->count();
  		$Form = D("student");
  		$count['student'] = $Form->count();
  		$this->ajaxReturn($count,"数据成功",1);
  }

  public function TopCompany(){
      
  }
}
<?php

class PhotoAction extends Action {


    public function sload() {
        if (!empty($_FILES)) {
            //如果有文件上传 上传附件
            $this->_upload(1);
        }
    }

    public function cload(){
        if(!empty($_FILES)){
            $this->_upload(2);
        }
    }
    public function ccload(){
        if(!empty($_FILES)){
            $this->_upload(3);
        }
    }

    public function getCompanyPhoto(){
        $Form = M("cphoto");
        $cid['cid'] = $_POST['cid'];
        $List = $Form->where($cid)->select();
        $this->ajaxReturn($List , 'Yes',1);

    }

    public function ChangeCompanyPhotoStatement(){
        $Form = M("cphoto");
        $cid['cpid'] = $_POST['cpid'];
        $statement['statement'] = $_POST['statement'];
        $flag = $Form->where($cid)->save($statement);
        if($flag){
            $this->ajaxReturn(1 , 'Yes',1);
        }
        else{
            $this->ajaxReturn(0 , 'No',0);
        }

    }
    // 文件上传
    protected function _upload($vo) {
        import('ORG.Net.UploadFile');
        //导入上传类
        $upload = new UploadFile();

        $path = array('./Common/img/StudentAvtor/','./Common/img/CompanyAvtor/','./Common/img/CompanyAuth/');
        //设置上传文件大小
        $upload->maxSize            = 3292200;
        //设置上传文件类型
        $upload->allowExts          = explode(',', 'jpg,gif,png,jpeg');
        //设置附件上传目录
        $upload->savePath           = $path[$vo - 1];
        //设置需要生成缩略图，仅对图像文件有效
        $upload->thumb              = true;
        if (!$upload->upload()) {
            //捕获上传异常
            $this->ajaxReturn(0,$upload->getErrorMsg(),0);
        } else {
            //取得成功上传的文件信息
            $uploadList = $upload->getUploadFileInfo();
            if($vo == 1){
                $model  = M('resume');
                //保存当前数据对象
                $data['avtor']  = substr($uploadList[0]['savepath'],2) . $uploadList[0]['savename'];
                $sid['sid'] = session('sid');
                $list   = $model->where($sid)->save($data);
                if ($list !== false) {
                    $this->ajaxReturn(1,'上传头像成功',1);
                } else {
                    $this->ajaxReturn(0,'上传头像失败',0);
                }
            }
            else if($vo == 2){
                $model = D("company");
                //保存当前数据对象
                $data['avtor']  = substr($uploadList[0]['savepath'],2) . $uploadList[0]['savename'];
                $cid['cid'] = session('cid');
                $list   = $model->where($cid)->save($data);
                if ($list !== false) {
                    $this->ajaxReturn(1,'上传Logo成功',1);
                } else {
                    $this->ajaxReturn(0,'上传Logo失败',0);
                }
            }
            else if($vo == 3){
                $model = M('cphoto');
                //保存当前数据对象
                $data['image_path']  = substr($uploadList[0]['savepath'],2) . $uploadList[0]['savename'];
                $data['cid'] = session('cid');
                $data['statement'] = "等待更新";
                $list   = $model->add($data);
                if ($list !== false) {
                    $this->ajaxReturn(1,'上传图片成功',1);
                } else {
                    $this->ajaxReturn(0,'上传图片失败',0);
                }
            }
        }
    }
}
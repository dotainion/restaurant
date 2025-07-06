<?php
namespace src\module\login\service;

use src\infrastructure\Service;
use tools\SecurityTools;

class CreatePinCredentialService extends Service{
    protected SecurityTools $secure;

    public function __construct(){
        parent::__construct(false);
        $this->secure = new SecurityTools();
    }
    
    public function process($id, $pin){

        $serivce = $this->secure->createPinCredential($id, $pin);

        return $this->mergeOutput($serivce);
    }
}
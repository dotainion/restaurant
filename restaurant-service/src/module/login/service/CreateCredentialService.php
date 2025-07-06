<?php
namespace src\module\login\service;

use src\infrastructure\Service;
use tools\SecurityTools;

class CreateCredentialService extends Service{
    protected SecurityTools $secure;

    public function __construct(){
        parent::__construct(false);
        $this->secure = new SecurityTools();
    }
    
    public function process($id, $password){

        $serivce = $this->secure->createCredential($id, $password);

        return $this->mergeOutput($serivce);
    }
}
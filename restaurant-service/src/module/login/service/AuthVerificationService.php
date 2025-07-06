<?php
namespace src\module\login\service;

use src\infrastructure\Service;
use tools\SecurityTools;

class AuthVerificationService extends Service{
    protected SecurityTools $secure;

    public function __construct(){
        parent::__construct(false);
        $this->secure = new SecurityTools();
    }
    
    public function process($email, $phone, $password){
        $service = $this->secure->authVerification((string)$email, (string)$phone, $password);
        return $this->mergeOutput($service);
    }
}
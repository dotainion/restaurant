<?php
namespace src\module\login\service;

use src\infrastructure\Service;
use tools\security\Setup;
use tools\SecurityTools;

class UpdateCredentialByTokenService extends Service{
    protected SecurityTools $secure;

    public function __construct(){
        parent::__construct(false);
        $this->secure = new SecurityTools();
    }
    
    public function process($id, $password, $refreshToken){

        $service = $this->secure->updateCredentialByToken($id, $password, $refreshToken);
        
        return $this->mergeOutput($service);
    }
}
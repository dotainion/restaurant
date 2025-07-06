<?php
namespace src\module\login\service;

use src\infrastructure\Service;
use tools\security\Session;
use tools\SecurityTools;

class PinLoginService extends Service{
    protected SecurityTools $secure;

    public function __construct(){
        parent::__construct(false);
        $this->secure = new SecurityTools();
    }
    
    public function process($pin){
        $this->secure->pinSignIn((string)$pin);
        return $this->setOutput(Session::user());
    }
}
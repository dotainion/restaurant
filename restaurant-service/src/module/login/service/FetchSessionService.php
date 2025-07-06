<?php
namespace src\module\login\service;

use src\infrastructure\Service;
use src\module\user\objects\User;
use tools\infrastructure\exeptions\NotAuthenticatedException;
use tools\security\Session;
use tools\SecurityTools;

class FetchSessionService extends Service{
    protected SecurityTools $secure;

    public function __construct(){
        parent::__construct(false);
        $this->secure = new SecurityTools();
    }
    
    public function process($token){
        $this->secure->getSession($token);

        $user = Session::user();
        if($user instanceof User && !$user->role()){
            throw new NotAuthenticatedException('Your account does not have the necessary user privileges.');
        }

        return $this->setOutput($user);
    }
}
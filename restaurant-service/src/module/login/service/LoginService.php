<?php
namespace src\module\login\service;

use src\infrastructure\Service;
use src\module\user\objects\User;
use tools\infrastructure\exeptions\NotAuthenticatedException;
use tools\security\Session;
use tools\SecurityTools;

class LoginService extends Service{
    protected SecurityTools $secure;

    public function __construct(){
        parent::__construct(false);
        $this->secure = new SecurityTools();
    }
    
    public function process($email, $phone, $password){
        $this->secure->signIn((string)$email, (string)$phone, $password);

        $user = Session::user();
        if($user instanceof User && !$user->role()){
            throw new NotAuthenticatedException('Your account does not have the necessary user privileges.');
        }

        return $this->setOutput($user);
    }
}
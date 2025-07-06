<?php
namespace src\module\login\action;

use src\module\login\service\AuthVerificationService;
use tools\infrastructure\IAction;
use tools\infrastructure\Request;

class AuthVerificationAction extends Request implements IAction{
    protected $service;

    public function __construct(){
        parent::__REQUEST__();
        $this->service = new AuthVerificationService();
    }

    public function execute(){
        return $this->service->process(
            $this->get('email'), 
            $this->get('phone'), 
            $this->get('password')
        );
    }
}
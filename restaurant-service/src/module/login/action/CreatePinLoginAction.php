<?php
namespace src\module\login\action;

use tools\infrastructure\IAction;
use tools\infrastructure\Request;
use src\module\login\service\CreatePinCredentialService;

class CreatePinLoginAction extends Request implements IAction{
    protected $service;

    public function __construct(){
        parent::__REQUEST__();
        $this->service = new CreatePinCredentialService();
    }

    public function execute(){
        return $this->service->process(
            $this->get('id'),
            $this->get('pin')
        );
    }
}
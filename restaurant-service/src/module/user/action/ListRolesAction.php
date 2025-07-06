<?php
namespace src\module\user\action;

use src\module\user\service\ListRolesService;
use tools\infrastructure\IAction;
use tools\infrastructure\Request;

class ListRolesAction extends Request implements IAction{
    protected $service;

    public function __construct(){
        parent::__REQUEST__();
        $this->service = new ListRolesService();
    }

    public function execute(){
        return $this->service->process(
            $this->get('hide')
        );
    }
}
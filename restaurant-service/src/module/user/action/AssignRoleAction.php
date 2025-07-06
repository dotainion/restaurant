<?php
namespace src\module\user\action;

use src\module\user\service\AssignRoleService;
use tools\infrastructure\IAction;
use tools\infrastructure\Request;

class AssignRoleAction extends Request implements IAction{
    protected $service;

    public function __construct(){
        parent::__REQUEST__();
        $this->service = new AssignRoleService();
    }

    public function execute(){
        return $this->service->process(
            $this->get('roleId'),
            $this->get('userId')
        );
    }
}
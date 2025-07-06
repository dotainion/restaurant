<?php
namespace src\module\user\service;

use src\infrastructure\Service;
use src\module\user\logic\ListRoles;

class ListRolesService extends Service{
    protected ListRoles $list;

    public function __construct(){
        parent::__construct();
        $this->list = new ListRoles();
    }
    
    public function process($hide){
        $collector = $this->list->roles($hide);

        $this->setOutput($collector);
        return $this;
    }
}
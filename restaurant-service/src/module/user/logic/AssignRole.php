<?php
namespace src\module\user\logic;

use src\module\user\repository\RoleRepository;
use tools\infrastructure\Id;

class AssignRole{
    protected RoleRepository $repo;

    public function __construct(){
        $this->repo = new RoleRepository();
    }

    public function assign(Id $roleId, Id $userId):void{
        $collector = $this->repo->listRoles([
            'userId' => $userId
        ]);
        if($collector->hasItem()){
            $this->repo->reAssign($roleId, $userId);
            return;
        }
        $this->repo->assign($roleId, $userId);
    }
}
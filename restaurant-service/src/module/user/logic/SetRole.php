<?php
namespace src\module\user\logic;

use src\module\user\objects\Role;
use src\module\user\repository\RoleRepository;

class SetRole{
    protected RoleRepository $repo;

    public function __construct(){
        $this->repo = new RoleRepository();
    }

    public function set(Role $role):void{
        $collector = $this->repo->listRoles([
            'roleId' => $role->id()
        ]);
        if($collector->isEmpty()){
            $this->repo->create($role);
            return;
        }
        $this->repo->edit($role);
    }
}
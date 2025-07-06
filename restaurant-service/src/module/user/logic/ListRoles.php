<?php
namespace src\module\user\logic;

use src\module\user\repository\RoleRepository;
use tools\infrastructure\Collector;
use tools\infrastructure\Id;

class ListRoles{
    protected RoleRepository $repo;

    public function __construct(){
        $this->repo = new RoleRepository();
    }

    public function role(Id $id):Collector{
        return $this->repo->listRoles([
            'roleId' => $id
        ]);
    }

    public function byUserId(Id $userId):Collector{
        return $this->repo->listRoles([
            'userId' => $userId
        ]);
    }

    public function roles(null|bool|array $hide=false):Collector{
        return $this->repo->listRoles([
            'hide' => $hide
        ]);
    }
}
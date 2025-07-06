<?php
namespace src\module\user\factory;

use tools\infrastructure\Collector;
use tools\infrastructure\Factory;
use src\module\user\objects\Role;

class RoleFactory extends Collector{
    use Factory;

    public function __construct(){
    }

    public function mapResult($record):Role{
        $role = new Role();
        $role->setId($this->uuid($record['roleId']));
        $role->setName($record['name'] ?? '');
        $role->setRole($record['role'] ?? '');
        $role->setDescription($record['description'] ?? '');
        $role->setRead((bool)$record['r']);
        $role->setWrite((bool)$record['w']);
        $role->setEdit((bool)$record['e']);
        $role->setDelete((bool)$record['d']);
        $role->setHide((bool)$record['hide']);
        return $role;
    }
}
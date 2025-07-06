<?php
namespace src\module\user\service;

use tools\infrastructure\Assert;
use src\infrastructure\Service;
use src\module\user\factory\RoleFactory;
use src\module\user\logic\SetRole;
use tools\infrastructure\Id;

class SetRoleService extends Service{
    protected SetRole $role;
    protected RoleFactory $factory;

    public function __construct(bool $authCheck=true){
        parent::__construct($authCheck);
        $this->role = new SetRole();
        $this->factory = new RoleFactory();
    }
    
    public function process($id, $name, $role, $details, $read, $write, $edit, $delete, $hide){
        Assert::stringNotEmpty($name, 'Role must have a valid name');
        Assert::stringNotEmpty($role, 'Invalid Role');

        $roleId = new Id();
        $roleId->isValid($id) ? $roleId->set($id) : $roleId->new();

        $role = $this->factory->mapResult([
            'roleId' => $roleId->toString(),
            'name' => $name,
            'role' => $role,
            'details' => $details,
            'r' => $read,
            'w' => $write,
            'e' => $edit,
            'd' => $delete,
            'hide' => $hide,
        ]);
        
        $this->role->set($role);

        $this->setOutput($role);
        return $this;
    }
}
<?php
namespace src\module\user\service;

use tools\infrastructure\Assert;
use src\infrastructure\Service;
use src\module\user\logic\AssignRole;
use src\module\user\logic\ListRoles;
use tools\infrastructure\Id;

class AssignRoleService extends Service{
    protected AssignRole $role;
    protected ListRoles $roles;

    public function __construct(bool $authCheck=true){
        parent::__construct($authCheck);
        $this->role = new AssignRole();
        $this->roles = new ListRoles();
    }
    
    public function process($roleId, $userId){
        Assert::validUuid($roleId, 'Role not found.');
        Assert::validUuid($userId, 'User not found.');
        
        $this->role->assign(new Id($roleId), new Id($userId));
        $collector = $this->roles->role(new Id($roleId));

        $this->setOutput($collector);
        return $this;
    }
}
<?php
namespace src\module\user\repository;

use src\infrastructure\Repository;
use src\module\user\factory\RoleFactory;
use tools\infrastructure\Collector;
use src\module\user\objects\Role;
use tools\infrastructure\Id;

class RoleRepository extends Repository{
    protected RoleFactory $factory;

    public function __construct(){
        parent::__construct();
        $this->factory = new RoleFactory();
    }
    
    public function create(Role $role):void{
        $this->insert('role')        
            ->column('roleId', $this->uuid($role->id()))
            ->column('name', $role->name())
            ->column('role', $role->role())
            ->column('description', $role->description())
            ->column('r', $role->read())
            ->column('w', $role->write())
            ->column('e', $role->edit())
            ->column('d', $role->delete())
            ->column('hide', $role->hide());
        $this->execute();
    }
    
    public function edit(Role $role):void{
        $this->update('role')        
            ->column('name', $role->name())
            ->column('role', $role->role())
            ->column('description', $role->description())
            ->column('r', $role->read())
            ->column('w', $role->write())
            ->column('e', $role->edit())
            ->column('d', $role->delete())
            ->column('hide', $role->hide())
            ->where()->eq('roleId', $this->uuid($role->id()));
        $this->execute();
    }
    
    public function assign(Id $roleId, Id $userId):void{
        $this->insert('roleLink')        
            ->column('roleId', $this->uuid($roleId))
            ->column('userId', $this->uuid($userId));
        $this->execute();
    }
    
    public function reAssign(Id $roleId, Id $userId):void{
        $this->update('roleLink')        
            ->column('roleId', $this->uuid($roleId))
            ->column('userId', $this->uuid($userId))
            ->where()->eq('userId', $this->uuid($userId));
        $this->execute();
    }
    
    public function listRoles(array $where=[]):Collector{
        $this->select('role');

        if(isset($where['userId'])){
            $this->join()->inner('roleLink', 'roleId', 'role', 'roleId');
            $this->where()->eq('userId', $this->uuid($where['userId']), 'roleLink');
        }
        if(isset($where['id'])){
            $this->where()->eq('roleId', $this->uuid($where['id']));
        }
        if(isset($where['roleId'])){
            $this->where()->eq('roleId', $this->uuid($where['roleId']));
        }
        if(isset($where['name'])){
            $this->where()->eq('name', $where['name']);
        }
        if(isset($where['role'])){
            $this->where()->eq('role', $where['role']);
        }
        if(isset($where['hide'])){
            is_array($where['hide']) && $where['hide'] = array_map('intval', $where['hide']);
            $this->where()->eq('hide', $where['hide']);
        }else{
            $this->where()->eq('hide', 0);
        }
        $this->pagination()->set($this->request()->pagination()->get());
        $this->execute();
        return $this->factory->map(
            $this->results()
        );
    }
}
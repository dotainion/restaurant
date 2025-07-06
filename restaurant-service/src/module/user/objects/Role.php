<?php
namespace src\module\user\objects;

use tools\infrastructure\Assert;
use tools\infrastructure\Id;
use tools\infrastructure\IId;
use tools\infrastructure\IObjects;

class Role implements IObjects{
    protected Id $id;
    protected string $name;
    protected string $role;
    protected string $description;
    protected bool $read;
    protected bool $write;
    protected bool $edit;
    protected bool $delete;
    protected bool $hide;

    public function __construct(){
        $this->id = new Id();
    }

    public function id():IId{
        return $this->id;
    }

    public function name():string{
        return $this->name;
    }

    public function role():string{
        return $this->role;
    }

    public function description():string{
        return $this->description;
    }

    public function read():bool{
        return $this->read;
    }

    public function write():bool{
        return $this->write;
    }

    public function edit():bool{
        return $this->edit;
    }

    public function delete():bool{
        return $this->delete;
    }

    public function hide():bool{
        return $this->hide;
    }

    public function setId(string $id):void{
        $this->id->set($id);
    }

    public function setName(string $name):void{
        $this->name = $name;
    }

    public function setRole(string $role):void{
        $roles = ['admin', 'supervisor', 'staff', 'viewer', 'guest'];
        Assert::inArray($role, $roles, 'Invalid Role.');
        $this->role = $role;
    }

    public function setDescription(string $description):void{
        $this->description = $description;
    }

    public function setRead(bool $read):void{
        $this->read = $read;
    }
    
    public function setWrite(bool $write):void{
        $this->write = $write;
    }

    public function setEdit(bool $edit):void{
        $this->edit = $edit;
    }
    
    public function setDelete(bool $delete):void{
        $this->delete = $delete;
    }

    public function setHide(bool $hide):void{
        $this->hide = $hide;
    }
}
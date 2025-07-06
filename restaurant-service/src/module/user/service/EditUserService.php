<?php
namespace src\module\user\service;

use tools\infrastructure\Assert;
use src\infrastructure\Service;
use src\module\user\factory\UserFactory;
use src\module\user\logic\EditUser;
use src\module\user\logic\ListRoles;
use src\module\user\objects\User;

class EditUserService extends Service{
    protected EditUser $user;
    protected UserFactory $factory;
    protected ListRoles $role;

    public function __construct(){
        parent::__construct();
        $this->user = new EditUser();
        $this->factory = new UserFactory();
        $this->role = new ListRoles();
    }
    
    public function process($id, $firstName, $lastName, $email, $phoneNumber, $gender){
        Assert::validEmail($email, 'Invalid email');
        Assert::validUuid($id??'', 'User not found.');

        $user = $this->factory->mapResult([
            'id' => $id,
            'firstName' => $firstName,
            'lastName' => $lastName,
            'email' => $email,
            'phoneNumber' => $phoneNumber,
            'date' => null,
            'gender' => $gender,
            'hide' => false
        ]);
        
        $this->user->edit($user);

        $collector = $this->role->byUserId($user->id());
        if($collector->hasItem() && $user instanceof User){
            $user->setRole($collector->first());
        }

        $this->setOutput($user);
        return $this;
    }
}
<?php
namespace src\module\user\factory;

use src\module\user\objects\User;
use tools\infrastructure\Collector;
use tools\infrastructure\Factory;
use tools\infrastructure\IFactory;
use tools\infrastructure\IUser;

class UserFactory extends Collector implements IFactory{
    use Factory;

    protected RoleFactory $factory;
    protected AddressFactory $addrFactory;

    public function __construct(){
        $this->factory = new RoleFactory();
        $this->addrFactory = new AddressFactory();
    }

    public function mapResult($record):IUser{
        $user = new User();
        $user->setId($this->uuid($record['id']));
        $user->setFirstName($record['firstName']);
        $user->setLastName($record['lastName']);
        $user->setEmail($record['email']);
        $user->setPhoneNumber((string)$record['phoneNumber']);
        isset($record['date']) && $user->setDate($record['date']);
        $user->setForeignId($record['foreignId']);
        $user->setPicture($record['picture']??null);
        $user->setHide($record['hide'] ?? false);
        $user->setGender($record['gender']??'');
        $this->isValidUUid($record['addressId']) && $user->setAddressId($this->uuid($record['addressId']));
        if(isset($record['roleId'])){
            $user->setRole($this->factory->mapResult($record));
        }
        if(isset($record['country']) || isset($record['state']) || isset($record['address']) || isset($record['apt']) || isset($record['zip'])){
            $user->setAddress($this->addrFactory->mapResult($record));
        }
        return $user;
    }
}
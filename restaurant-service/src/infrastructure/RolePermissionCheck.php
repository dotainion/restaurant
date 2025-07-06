<?php

namespace src\infrastructure;

use InvalidArgumentException;
use src\module\user\objects\User;
use tools\infrastructure\Assert;
use tools\infrastructure\Request;
use tools\security\Session;
use tools\security\Setup;

class RolePermissionCheck{
    protected static array $obsoverIdentifier = [];
    protected Request $request;
    protected array $excludeTables = [
        'credential',
        'rolePermission'
    ];
   
    public function __construct(){
        $this->request = new Request();
    }

    public function listen(){
        self::$obsoverIdentifier[] = Setup::repoExecuteObsover('select', function($repo){
            if(in_array($repo->tableName(), $this->excludeTables)){
                return;
            }
            Assert::isBoolTrue($this->user()->role()->read(), 'Access denied: You are not authorized to modify this record.');
        });

        self::$obsoverIdentifier[] = Setup::repoSetObsover('insert', function($repo){
            if(in_array($repo->tableName(), $this->excludeTables)){
                return;
            }
            Assert::isBoolTrue($this->user()->role()->write(), 'Access denied: You are not authorized to add new records.');
        });

        self::$obsoverIdentifier[] = Setup::repoSetObsover('update', function($repo){
            if(in_array($repo->tableName(), $this->excludeTables)){
                return;
            }
            Assert::isBoolTrue($this->user()->role()->edit(), 'Permission denied: You do not have the rights to update this record.');

            if($this->request->get('hide') && !$this->user()->role()->delete()){
                if(in_array($repo->tableName(), $this->excludeTables)){
                    return;
                }
                throw new InvalidArgumentException('Permission denied: You do not have the rights to remove this record.');
            }
        });

        self::$obsoverIdentifier[] = Setup::repoSetObsover('delete', function($repo){
            Assert::isBoolTrue($this->user()->role()->edit(), 'Permission denied: You do not have the rights to remove this record.');
        });
    }

    public function user():User{
        return Session::user();
    }

    public function unsubscribe(){
        foreach(self::$obsoverIdentifier as $identifier){
            Setup::unsubscribeObsover($identifier);
        }
    }
}

<?php

namespace src\infrastructure;

use src\module\user\factory\UserFactory;
use tools\infrastructure\Service as ToolsService;
use tools\security\Session;
use tools\security\Setup;

class Service extends ToolsService{
    protected static ?string $obsoverIdentifier = null;
    protected RolePermissionCheck $permissionCheck;

    public function __construct(bool $authCheck=true){
        Setup::setRequiredFactory(new UserFactory());
        Setup::jointSecurityTableWithPermissionOff();
        
        $this->permissionCheck = new RolePermissionCheck();

        $this->unsubscribe();
        self::$obsoverIdentifier = Setup::repoAfterTableSetObsover(function($repo){
            $repo->join()->left('roleLink', 'userId', 'user', 'id')
            ->cursor()->join()->left('role', 'roleId', 'roleLink', 'roleId');
        });
        
        parent::__construct($authCheck);
        
        if(Session::hasSession()){
            $this->permissionCheck->listen();
        }
    }

    public function unsubscribe(){
        $this->permissionCheck->unsubscribe();
        if(self::$obsoverIdentifier){
            Setup::unsubscribeObsover(self::$obsoverIdentifier);
        }
    }
}

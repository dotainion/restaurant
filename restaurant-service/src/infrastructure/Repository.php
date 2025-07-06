<?php

namespace src\infrastructure;

use Exception;
use tools\infrastructure\Repository as ToolsRepository;
use tools\security\Setup;

class Repository extends ToolsRepository{
    protected static bool $preventRequirementChecks = false;
    protected static array $obsoverIdentifier = [];
    protected array $excludeTables = [
        'restaurantLink',
        'restaurant',
        'orderLink',
        'roleLink',
        'message',
        'credential',
        'address',
        'user',
        'productOrder',
        'discountOrder',
        'rolePermission'
    ];

    public function __construct(){
        parent::permissionOff();
        parent::__construct();
        $this->unsubscribe();

        if(self::$preventRequirementChecks){
            return;
        }

        self::$obsoverIdentifier[] = Setup::repoExecuteObsover('select', function($repo){
            $this->requirements($repo, function($restaurantId) use($repo){
                $repo->where()->eq('restaurantId', $this->uuid($restaurantId));
            });
        });

        self::$obsoverIdentifier[] = Setup::repoSetObsover('insert', function($repo){
            $this->requirements($repo, function($restaurantId) use($repo){
                $repo->column('restaurantId', $this->uuid($restaurantId));
            });
        });
    }

    public function __destruct(){
        $this->unsubscribe();
    }

    public function unsubscribe(){
        foreach(self::$obsoverIdentifier as $identifier){
            Setup::unsubscribeObsover($identifier);
        }
    }

    public function requirements($repo, callable $callback):void{
        if(in_array($repo->tableName(), $this->excludeTables)){
            return;
        }
        $restaurantId = $repo->request()->get('restaurantId');
        if(!$restaurantId){
            throw new Exception('Each query should contain a "restaurantId", see the parent "Repository" class. table is: "'. $repo->tableName().'"');
        }
        $callback($restaurantId);
    }

    public function paginationIsEmpty(): bool{
        $limit = $this->request()->pagination()->limit();
        $offset = $this->request()->pagination()->offset();
        return ($limit === null || $limit == 0) && ($offset === null || $offset == 0);
    }

    public static function preventRequirementChecks(bool $state): void{
        self::$preventRequirementChecks = $state;
    }
}
